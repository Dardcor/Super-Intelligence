#!/bin/sh
# Sandbox test for scripts/install.sh.
# Runs the installer twice against a temp fake HOME and checks that
# a reinstall is idempotent: same file count, no nested copies, and
# SKILL.md present at the top level of every target, for EVERY skill.
# Usage: sh scripts/test-install.sh   (or ./scripts/test-install.sh)
# Exit code: 0 = pass, non-zero = fail (with a clear message).
set -eu

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
INSTALLER="$REPO_DIR/scripts/install.sh"
TARGETS=".agents/skills .claude/skills .config/opencode/skills .gemini/antigravity/skills"

fail() {
  echo "FAIL: $1" >&2
  exit 1
}

if [ ! -f "$INSTALLER" ]; then
  fail "installer not found at $INSTALLER"
fi

SKILLS=""
for src in "$REPO_DIR"/skills/*/; do
  src="${src%/}"
  [ -f "$src/SKILL.md" ] || continue
  SKILLS="$SKILLS $(basename "$src")"
done
[ -n "$SKILLS" ] || fail "no skills found under $REPO_DIR/skills"
echo "skills under test:$SKILLS"

# Expected file count: every source file installed to each of the 4 targets.
SRC_FILES="$(find "$REPO_DIR/skills" -type f | wc -l | tr -d ' ')"
EXPECTED=$((SRC_FILES * 4))
echo "expected files after install: $EXPECTED ($SRC_FILES source files x 4 targets)"

FAKE_HOME="$(mktemp -d)"
trap 'rm -rf "$FAKE_HOME"' EXIT INT TERM

count_files() {
  find "$FAKE_HOME" -type f | wc -l | tr -d ' '
}

echo "fake HOME: $FAKE_HOME"

HOME="$FAKE_HOME" sh "$INSTALLER" > /dev/null
COUNT1="$(count_files)"
echo "after run 1: $COUNT1 files"

HOME="$FAKE_HOME" sh "$INSTALLER" > /dev/null
COUNT2="$(count_files)"
echo "after run 2: $COUNT2 files"

if [ "$COUNT1" != "$COUNT2" ]; then
  fail "file count changed after reinstall (run 1: $COUNT1, run 2: $COUNT2) — reinstall is not idempotent"
fi
if [ "$COUNT2" != "$EXPECTED" ]; then
  fail "file count $COUNT2 != expected $EXPECTED — some skill was not installed to every target"
fi

for target in $TARGETS; do
  for skill in $SKILLS; do
    dest="$FAKE_HOME/$target/$skill"
    # No nested copy: a broken reinstall copies the skill folder inside itself.
    if [ -d "$dest/$skill" ]; then
      fail "nested copy found: $dest/$skill exists after reinstall"
    fi
    # SKILL.md must exist at the top level of the target.
    if [ ! -f "$dest/SKILL.md" ]; then
      fail "SKILL.md missing at top level of $dest"
    fi
  done
  echo "OK $target (all skills present, no nested copies)"
done

echo "PASS: install is idempotent ($COUNT2 files, 4 targets, no nested copies)"

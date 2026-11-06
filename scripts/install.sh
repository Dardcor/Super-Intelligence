#!/bin/sh
# Install all Super-Intelligence skills to every agent tool found on this machine.
# Usage: ./scripts/install.sh
# The skills live in skills/ — this script only copies them.
set -eu
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SKILLS_DIR="$REPO_DIR/skills"

install_to() {
  src="$1"
  dest="$2"
  mkdir -p "$(dirname "$dest")"
  # Remove the old copy first: without this, a re-install nests the
  # skill inside itself (cp -R copies $src *into* $dest when it exists).
  rm -rf "$dest"
  cp -R "$src" "$dest"
  echo "installed -> $dest"
}

install_all_to() {
  base="$1"
  for src in "$SKILLS_DIR"/*/; do
    src="${src%/}"
    [ -f "$src/SKILL.md" ] || continue
    name="$(basename "$src")"
    install_to "$src" "$base/$name"
  done
}

# Shared Agent Skills hub — read by Codex, OpenCode, Cursor, Copilot, and others.
install_all_to "$HOME/.agents/skills"
# Claude Code
install_all_to "$HOME/.claude/skills"
# OpenCode
install_all_to "$HOME/.config/opencode/skills"
# Antigravity (global, IDE path)
install_all_to "$HOME/.gemini/antigravity/skills"

echo "Done. Start a new session in your agent tool to load the skills."

#!/bin/sh
# Install Super-Intelligence skill to every agent tool found on this machine.
# Usage: ./scripts/install.sh
# The skill itself lives in skills/super-intelligence/ — this script only copies it.
set -eu
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$REPO_DIR/skills/super-intelligence"

if [ ! -f "$SRC/SKILL.md" ]; then
  echo "SKILL.md not found at $SRC" >&2
  exit 1
fi

install_to() {
  dest="$1"
  mkdir -p "$(dirname "$dest")"
  cp -R "$SRC" "$dest"
  echo "installed -> $dest"
}

# Shared Agent Skills hub — read by Codex, OpenCode, Cursor, Copilot, and others.
install_to "$HOME/.agents/skills/super-intelligence"
# Claude Code
install_to "$HOME/.claude/skills/super-intelligence"
# OpenCode
install_to "$HOME/.config/opencode/skills/super-intelligence"
# Antigravity (global, IDE path)
install_to "$HOME/.gemini/antigravity/skills/super-intelligence"

echo "Done. Start a new session in your agent tool to load the skill."

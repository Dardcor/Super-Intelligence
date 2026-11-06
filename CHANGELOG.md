# Changelog

## 0.1.0 — 2026-11-06

- Framework decided: Agent Skills (agentskills.io), the open
  standard read natively by Claude Code, Codex, OpenCode,
  Antigravity, Cursor, and Gemini CLI.
- First skill: `super-intelligence` — Clarify → Plan → Do →
  Verify → Humanize → Deliver, with a Delivery Gate.
- References: `humanize.md`, `plan-verify.md`, `install.md`,
  `compatibility.md`.
- Example: `examples/vague-request.md`.
- Thin plugin adapters (no duplicated skill): `.claude-plugin/`
  (`plugin.json`, `marketplace.json`), `.codex-plugin/plugin.json`,
  `.agents/plugins/marketplace.json`, `.cursor-plugin/plugin.json`.
- Install scripts: `scripts/install.sh` (macOS/Linux),
  `scripts/install.ps1` (Windows).
- Validator: `scripts/check-skill.py`.

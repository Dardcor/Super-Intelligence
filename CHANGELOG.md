# Changelog

## 0.1.0 — 2026-11-06

First release.

- Framework: Agent Skills (agentskills.io), the open standard
  read natively by Claude Code, Codex, OpenCode, Antigravity,
  Cursor, and Gemini CLI. One format, every tool — only the
  install path differs.
- Install fix (2026-11-06, same release): `npx skills add`
  needs `-y --copy -g` (bare command hangs on its interactive
  prompt; default symlinks fail on Windows; the CLI needs Git
  installed). Installers now also write to Antigravity's app
  global path `~/.gemini/config/skills/` — the CLI's
  `~/.agents/skills/` target is not read by Antigravity.
- Meta-skill: `super-intelligence` — Clarify → Plan → Do →
  Verify → Humanize → Deliver, with a Delivery Gate.
- Narrow sub-skills (one job each, the meta-skill delegates to
  them): `research`, `plan-project`, `code-review`,
  `understand-code`, `debug`, `build-ui`, `write-human`. Each
  has an example and a "when NOT to use" section.
- References: `humanize.md` (with before/after examples for
  chat, documents, code comments, UI copy, and READMEs, plus a
  checkable anti-slop list), `plan-verify.md`, `install.md`,
  `compatibility.md` (with an honest per-tool test status).
- Thin plugin adapters (no duplicated skill):
  `.claude-plugin/` (`plugin.json`, `marketplace.json`),
  `.codex-plugin/plugin.json`, `.agents/plugins/marketplace.json`,
  `.cursor-plugin/plugin.json`.
- Install scripts for all OS: `scripts/install.sh`
  (macOS/Linux) and `scripts/install.ps1` (Windows, also
  PowerShell 7 on macOS/Linux). Both install **all** skills to
  every tool found, remove the old copy first, and are safe to
  run again to update.
- Validation: `scripts/check-skill.py` (SKILL.md spec + all
  plugin/marketplace JSON) and `scripts/test-install.sh`
  (sandbox: install twice, no nested copies), plus a draft
  GitHub Actions workflow (`.github/workflows/check.yml`).
- Line endings forced to LF (`.gitattributes`) so shell scripts
  never break after a Windows checkout.

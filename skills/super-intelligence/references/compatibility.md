# Compatibility — where this skill runs

Framework: **Agent Skills** — the open standard at agentskills.io,
now under the Agentic AI Foundation (Linux Foundation).

One skill folder, one format. Every tool below reads the same
`SKILL.md`. Do not fork the skill per tool. If a tool needs a
different install path, that is an install adapter, not a new skill.

## How Agent Skills works

- A skill is a folder named after the skill, with `SKILL.md` inside.
- Frontmatter: `name` (1-64 chars, lowercase + hyphens, must match
  the folder name) and `description` (max 1024 chars, what it does
  AND when to use it) are required. Optional: `license`,
  `compatibility`, `metadata`, `allowed-tools` (experimental).
- Progressive disclosure: at session start the agent reads only
  `name` + `description` (~100 tokens). It reads the full body
  only when a task matches, and `references/` files only when the
  body points to them. Keep `SKILL.md` under 500 lines.
- Optional folders: `scripts/` (code the agent can run),
  `references/` (docs read on demand), `assets/` (templates/data).

## Per-tool support

| Tool | Skill discovery | Plugin / marketplace | Install |
|---|---|---|---|
| Claude Code | `~/.claude/skills/<name>/SKILL.md`, or `.claude/skills/<name>/SKILL.md` in a project | `.claude-plugin/plugin.json` + `.claude-plugin/marketplace.json` in this repo | `claude plugin marketplace add Dardcor/Super-Intelligence`, then `claude plugin install super-intelligence@super-intelligence` |
| Codex | `.agents/skills/` in the project (walked to repo root), `~/.agents/skills/`, `/etc/codex/skills` | `.codex-plugin/plugin.json`, marketplace via `.agents/plugins/marketplace.json` | `codex plugin marketplace add Dardcor/Super-Intelligence`, then install the plugin; or copy the skill folder to `~/.agents/skills/` |
| OpenCode | `.opencode/skills/`, `~/.config/opencode/skills/`, plus `.agents/skills/`, `~/.agents/skills/`, `~/.claude/skills/` | No plugin manifest needed — folder discovery | `npx skills add Dardcor/Super-Intelligence`, or copy to `~/.config/opencode/skills/` |
| Antigravity | `.agents/skills/<name>/SKILL.md` in the workspace; global `~/.gemini/antigravity/skills/` or `~/.gemini/config/skills/` | No formal plugin manifest — directory auto-discovery; CLI plugin via `agy plugin install <repo>` | `npx skills add Dardcor/Super-Intelligence -a antigravity`, or `agy plugin install https://github.com/Dardcor/Super-Intelligence.git`, or copy to `.agents/skills/` |
| Cursor / Gemini CLI / Copilot | `.agents/skills/` (shared hub) | Varies by tool | `npx skills add Dardcor/Super-Intelligence` — the skills CLI detects installed tools and installs to each |

## Test status — read this before trusting the table

The discovery paths and install commands above come from the
tools' own docs. What has **actually been tested**:

- Local validator (`python3 scripts/check-skill.py`): passes for
  all 8 skills and all 5 plugin/marketplace JSON files.
- Sandbox install test (`sh scripts/test-install.sh`): install
  twice into a fake HOME, 80 files both runs, no nested copies.
- Loading in a real agent tool (Claude Code / Codex / OpenCode /
  Antigravity on a real machine): **not tested yet**. Until that
  happens, treat every row above as "documented, untested".

## Universal install (recommended)

```bash
npx skills add Dardcor/Super-Intelligence
```

The `skills` CLI detects which agent tools are installed and
copies the skill to each one's skills folder. Restart / start a
new session after install — skills load at session start.

## What is NOT the framework

- **Not MCP.** MCP is for live tool servers. This skill needs no
  server, no API key, and no running process.
- **Not AGENTS.md / CLAUDE.md only.** Those are per-project
  instructions. They do not distribute as a reusable skill.
- **Not a Claude-only plugin.** A Claude-only plugin would lock
  out Codex, OpenCode, and Antigravity. The plugin manifests in
  this repo are thin adapters that point at the same `skills/`
  folder — they are not separate copies of the skill.
- **Not a code framework** (LangChain, etc.). Those are for
  building agents in code. This repo is for teaching any agent
  how to work, in plain Markdown the agent can read.

## Rules for adding a new tool

1. Do not duplicate `SKILL.md`. Add only a thin install adapter.
2. Document the tool's real discovery path, verified from its
   docs — do not guess a path.
3. If a tool does not support Agent Skills yet, say so in the
   README and give the manual fallback: paste `SKILL.md` as a
   project instruction file.

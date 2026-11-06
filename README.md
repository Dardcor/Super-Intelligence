# Super-Intelligence

A meta-skill for AI coding agents. It turns a vague, multi-step
request into a finished, checked, human-sounding result:

**Clarify → Plan → Do → Verify → Humanize → Deliver**

## Framework — why this shape?

**Framework: Agent Skills** — the open standard at
[agentskills.io](https://agentskills.io), now under the Agentic AI
Foundation (Linux Foundation).

I chose it because it is the only format all four target tools
read natively, with the same `SKILL.md`:

| Tool | Where it reads skills |
|---|---|
| Claude Code | `~/.claude/skills/`, `.claude/skills/` |
| Codex | `.agents/skills/`, `~/.agents/skills/` |
| OpenCode | `.opencode/skills/`, `~/.config/opencode/skills/`, plus `.agents/skills/` |
| Antigravity | `.agents/skills/`, `~/.gemini/antigravity/skills/`, `~/.gemini/config/skills/` |

The full per-tool table, with install commands, is in
[`skills/super-intelligence/references/compatibility.md`](skills/super-intelligence/references/compatibility.md).

What Agent Skills is, in one paragraph: a skill is a folder named
after the skill, with a `SKILL.md` inside. Frontmatter needs only
`name` (1–64 chars, lowercase + hyphens, must match the folder)
and `description` (max 1024 chars, what it does AND when to use
it). Optional: `license`, `compatibility`, `metadata`,
`allowed-tools`. The agent reads only `name` + `description` at
startup (~100 tokens), the full body only when a task matches,
and `references/` files only when the body points to them. Keep
`SKILL.md` under 500 lines. Optional folders: `scripts/`,
`references/`, `assets/`.

What it is **not**:
- **Not MCP** — no server, no API key, no running process.
- **Not AGENTS.md / CLAUDE.md only** — those are per-project
  instructions, not a distributable skill.
- **Not a Claude-only plugin** — that would lock out Codex,
  OpenCode, and Antigravity.
- **Not a code framework** — this repo teaches any agent how to
  work, in plain Markdown.

## Structure — one source of truth

```
Super-Intelligence/
├── README.md
├── LICENSE
├── CHANGELOG.md
├── skills/                              # <-- canonical source. Never duplicate SKILL.md.
│   └── super-intelligence/
│       ├── SKILL.md                     # the skill. Load this.
│       ├── references/
│       │   ├── humanize.md              # write like a real person
│       │   ├── plan-verify.md           # plan + verify checklist
│       │   ├── install.md               # install per tool
│       │   └── compatibility.md         # per-tool support table
│       └── examples/
│           └── vague-request.md         # one worked example
├── .claude-plugin/                      # thin adapter for Claude Code
│   ├── plugin.json
│   └── marketplace.json
├── .codex-plugin/                       # thin adapter for Codex
│   └── plugin.json
├── .agents/plugins/
│   └── marketplace.json                 # Codex marketplace registration
├── .cursor-plugin/
│   └── plugin.json                      # thin adapter for Cursor
└── scripts/
    ├── install.sh                       # copy skill to every tool found (macOS/Linux)
    ├── install.ps1                      # same, for Windows
    └── check-skill.py                   # validate SKILL.md against the spec
```

Rules:
1. `skills/` is the only copy of the skill. Plugin manifests
   point at `./skills/` — they never duplicate it.
2. Antigravity has no plugin manifest. It discovers `SKILL.md`
   folders by directory, so there is no Antigravity manifest
   to add — the install is a copy to `.agents/skills/`.
3. Add a new narrow skill as a new folder under `skills/`,
   never by stuffing everything into `super-intelligence`.

## Install

```bash
npx skills add Dardcor/Super-Intelligence
```

The `skills` CLI detects installed tools and installs to each.
Or run the script in this repo:

```bash
./scripts/install.sh        # macOS / Linux
powershell -ExecutionPolicy Bypass -File scripts/install.ps1   # Windows
```

Per-tool commands (Claude Code, Codex, OpenCode, Antigravity)
are in [`skills/super-intelligence/references/install.md`](skills/super-intelligence/references/install.md).
Start a new session after install — skills load at session start.

## When to use it

Use it for open-ended, multi-step work — a vague project, a mix
of research + planning + building + writing.

Do **not** use it as a replacement for a narrow skill. If a task
is already covered by a specific skill (Firebase, UI audit,
codebase analysis), use that skill first, then run only the
Humanize + Delivery Gate from Super-Intelligence at the end.

## What it will never do

- Pretend to be a real human
- Invent facts, prices, dates, or citations
- Present an unverified guess as a verified result

## Validate

```bash
python3 scripts/check-skill.py
```

## Status

v0.1.0 — first working version. One meta-skill, four references,
one example, install scripts for macOS/Linux and Windows, and
thin plugin adapters for Claude Code, Codex, and Cursor.

## License

MIT — see LICENSE.

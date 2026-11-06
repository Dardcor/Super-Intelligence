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
├── PLAN.md                              # development plan (local)
├── skills/                              # <-- canonical source. Never duplicate SKILL.md.
│   ├── super-intelligence/              # meta-skill (v0.1.0)
│   │   ├── SKILL.md                     # the skill. Load this.
│   │   ├── references/
│   │   │   ├── humanize.md              # write like a real person
│   │   │   ├── plan-verify.md           # plan + verify checklist
│   │   │   ├── install.md               # install per tool
│   │   │   └── compatibility.md         # per-tool support table
│   │   └── examples/
│   │       └── vague-request.md         # one worked example
│   ├── research/                        # research one topic properly
│   ├── plan-project/                    # vague idea → concrete plan
│   ├── code-review/                     # review code changes
│   ├── understand-code/                 # map a codebase (read-only)
│   ├── debug/                           # error → cause → minimal fix
│   ├── build-ui/                        # UI with an anti-slop filter
│   └── write-human/                     # write like a real human
├── .claude-plugin/                      # thin adapter for Claude Code
│   ├── plugin.json
│   └── marketplace.json
├── .codex-plugin/                       # thin adapter for Codex
│   └── plugin.json
├── .agents/plugins/
│   └── marketplace.json                 # Codex marketplace registration
├── .cursor-plugin/
│   └── plugin.json                      # thin adapter for Cursor
├── .github/workflows/
│   └── check.yml                        # draft CI: validator + install test
└── scripts/
    ├── install.sh                       # copy all skills to every tool found (macOS/Linux)
    ├── install.ps1                      # same, for Windows
    ├── check-skill.py                   # validate SKILL.md + plugin JSON against the spec
    └── test-install.sh                  # sandbox test: install twice, no nested copies
```

Rules:
1. `skills/` is the only copy of the skill. Plugin manifests
   point at `./skills/` — they never duplicate it.
2. Antigravity has no plugin manifest. It discovers `SKILL.md`
   folders by directory, so there is no Antigravity manifest
   to add — the install is a copy to `.agents/skills/`.
3. Add a new narrow skill as a new folder under `skills/`,
   never by stuffing everything into `super-intelligence`.

## Skills

**Meta-skill (v0.1.0):** `super-intelligence` — the orchestrator.
Clarify → Plan → Do → Verify → Humanize → Deliver.

**Narrow sub-skills (v0.1.0).**
Each does one job, and the meta-skill delegates to them:

| Skill | One job |
|---|---|
| `research` | Research one topic from verifiable sources → summary + sources + what is still unverified |
| `plan-project` | Turn a vague idea into a concrete plan: goal, done criteria, 3–7 steps, out-of-scope, risks |
| `code-review` | Review code changes: numbered findings by priority, fixes suggested only |
| `understand-code` | Map a codebase a human can read (read-only, never modifies code) |
| `debug` | From an error or bug report: reproduce, find the cause, propose the minimal fix |
| `build-ui` | Build a UI with an anti-slop filter: every element must pass a purpose test |
| `write-human` | Write documents, READMEs, and copy like a real human: specific, honest, no hype |

These skills pass the local validator (`check-skill.py`) and the
sandbox install test (`test-install.sh`). Loading them in a real
agent tool on a real machine is still the next test — see
`compatibility.md` for the honest test status.

## Install

```bash
npx skills add Dardcor/Super-Intelligence --all --copy
```

The `skills` CLI detects installed tools and installs to each.
The flags matter: `-y` is implied by `--all` (the bare command
asks interactive questions and hangs inside an agent), and
`--copy` avoids symlinks, which fail on Windows without
Developer Mode. The CLI needs **Git** installed — without it
the download fails. No Git? Download `Source code (zip)` from
the [v0.1.0 release](https://github.com/Dardcor/Super-Intelligence/releases/tag/v0.1.0),
extract it, and run the script in this repo:

```bash
sh scripts/install.sh        # macOS / Linux
```

```powershell
powershell -ExecutionPolicy Bypass -File scripts/install.ps1   # Windows
```

Both scripts install **all** skills in this repo to every agent
tool found on the machine, and are safe to run again to update.
Requirements: `sh` + standard Unix tools (macOS/Linux), or
PowerShell 5.1+ / PowerShell 7 (Windows; also works on macOS/Linux).
Validating the repo needs Python 3 (`python3 scripts/check-skill.py`,
or `python` on Windows).

> **Antigravity:** `npx skills add -a antigravity` installs to
> `~/.agents/skills/`, which Antigravity does **not** read
> globally. Use the install script above (it also covers
> `~/.gemini/antigravity/skills/` and `~/.gemini/config/skills/`)
> or copy the skills into your workspace `.agents/skills/`.

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
python3 scripts/check-skill.py   # SKILL.md spec + plugin JSON
sh scripts/test-install.sh       # sandbox: install twice, no nested copies
```

## Status

v0.1.0 — first release. One meta-skill (`super-intelligence`)
plus 7 narrow sub-skills (`research`, `plan-project`,
`code-review`, `understand-code`, `debug`, `build-ui`,
`write-human`), a deepened Humanize reference with before/after
examples, install scripts for macOS/Linux and Windows, a
validator, a sandbox install test, and a draft CI workflow.

Honest status: everything here passes the local validator and
the install test. Loading the skills in a real agent tool on a
real machine is the next test — see `compatibility.md`.

## License

MIT — see LICENSE.

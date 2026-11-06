# Install — Super-Intelligence in different agent tools

Framework: Agent Skills (agentskills.io). One skill folder,
reused everywhere. Only the install path differs per tool.
Full compatibility table: see `compatibility.md`.

## Option 1 — Agent Skills CLI (recommended)

```bash
npx skills add Dardcor/Super-Intelligence
```

The CLI detects installed tools and installs to each one.
Start a new session after install — skills load at session start.

## Option 2 — Claude Code

```bash
claude plugin marketplace add Dardcor/Super-Intelligence
claude plugin install super-intelligence@super-intelligence
```

Manual fallback: copy `skills/super-intelligence/` to
`~/.claude/skills/super-intelligence/` (all projects) or
`.claude/skills/super-intelligence/` (one project).

## Option 3 — Codex

```bash
codex plugin marketplace add Dardcor/Super-Intelligence
```

Manual fallback: copy `skills/super-intelligence/` to
`~/.agents/skills/super-intelligence/` (all projects) or
`.agents/skills/super-intelligence/` (one project).

## Option 4 — OpenCode

```bash
npx skills add Dardcor/Super-Intelligence
```

Manual fallback: copy to `~/.config/opencode/skills/super-intelligence/`
(global) or `.opencode/skills/super-intelligence/` (one project).
OpenCode also reads `.agents/skills/` and `~/.agents/skills/`.

## Option 5 — Antigravity

```bash
npx skills add Dardcor/Super-Intelligence -a antigravity
# or, for the CLI:
agy plugin install https://github.com/Dardcor/Super-Intelligence.git
```

Manual fallback: copy to `.agents/skills/super-intelligence/`
(workspace) or `~/.gemini/antigravity/skills/super-intelligence/`
(global). Antigravity has no plugin manifest — it discovers
`SKILL.md` folders by directory, so do not look for a manifest file.

## Option 6 — Install scripts in this repo (all skills, all OS)

```bash
sh scripts/install.sh        # macOS / Linux (works even if the file lost its executable bit)
```

```powershell
powershell -ExecutionPolicy Bypass -File scripts/install.ps1   # Windows
```

Both scripts copy **every** skill folder under `skills/` to each
tool's skills folder (`.agents/skills`, `.claude/skills`,
`.config/opencode/skills`, `.gemini/antigravity/skills`). They
remove the old copy first, so running them again to update is safe.
`install.ps1` also runs under PowerShell 7 on macOS/Linux.

## Option 7 — Manual (works everywhere)

1. Clone the repo:
   ```bash
   git clone https://github.com/Dardcor/Super-Intelligence.git
   ```
2. Copy every folder under `skills/` into your agent's skills
   folder — for example, on macOS/Linux:
   ```bash
   cp -R skills/* ~/.agents/skills/
   ```
   or on Windows (PowerShell):
   ```powershell
   Copy-Item -Recurse skills/* "$env:USERPROFILE\.agents\skills\"
   ```
3. Start a new session and ask for something open-ended — the
   agent should load `super-intelligence` when the task fits its
   description.

## Notes

- Skills load at session start. If you install mid-session, start
  a new session to use the new version.
- Do not rename the skill folder or `SKILL.md`. The `name` in
  frontmatter must match the folder name exactly.
- If a tool does not support Agent Skills yet, the `SKILL.md`
  file is still readable as a plain instruction file — paste it
  into that tool as a system / project instruction.

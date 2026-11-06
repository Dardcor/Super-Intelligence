# Install — Super-Intelligence in different agent tools

Framework: Agent Skills (agentskills.io). One skill folder,
reused everywhere. Only the install path differs per tool.
Full compatibility table: see `compatibility.md`.

## Option 1 — Agent Skills CLI (recommended)

```bash
npx skills add Dardcor/Super-Intelligence -g -a codex --copy -y
npx skills add Dardcor/Super-Intelligence -g -a antigravity --copy -y
```

Or install to every detected tool at once:

```bash
npx skills add Dardcor/Super-Intelligence --all --copy
```

The flags matter — do not run the bare command:

- `-y` — the bare command asks interactive questions (which
  agent? confirm?) and hangs inside an agent with no terminal.
- `--copy` — the default installs symlinks, which fail on
  Windows without Developer Mode or admin rights.
- `-g` — install globally (all projects), not just the current
  folder.
- `-a codex` / `-a antigravity` — install only for that tool.

Requirements: **Node.js AND Git**. The CLI clones the repo
with `git` — without Git it fails with
`Failed to clone repository ... spawn git ENOENT`. Check with
`git --version`; if Git is missing, install it from
https://git-scm.com/downloads, or use Option 6 (release ZIP,
no Git needed). Start a new session after install — skills
load at session start.

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
npx skills add Dardcor/Super-Intelligence -g -a antigravity --copy -y
# or, for the CLI:
agy plugin install https://github.com/Dardcor/Super-Intelligence.git
```

**Warning — read this before trusting the `npx` install:**
the CLI installs Antigravity skills to `~/.agents/skills/`,
but Antigravity does **not** load global skills from there.
Its global paths depend on the client:

- Antigravity app: `~/.gemini/config/skills/<name>/`
- Antigravity for IDEs: `~/.gemini/antigravity/skills/<name>/`
- Antigravity CLI: `~/.gemini/antigravity-cli/skills/<name>/`

The install scripts (Option 6) copy to **both** global
paths, so they work for the app and the IDE. The most
reliable route is the **workspace** folder, which Antigravity
always reads: copy every folder under `skills/` into
`<workspace>/.agents/skills/`.

Manual fallback (global, IDE): copy to
`~/.gemini/antigravity/skills/super-intelligence/`. Manual
fallback (global, app): copy to
`~/.gemini/config/skills/super-intelligence/`. Antigravity
has no plugin manifest — it discovers `SKILL.md` folders by
directory, so do not look for a manifest file.

## Option 6 — Install scripts in this repo (all skills, all OS)

```bash
sh scripts/install.sh        # macOS / Linux (works even if the file lost its executable bit)
```

```powershell
powershell -ExecutionPolicy Bypass -File scripts/install.ps1   # Windows
```

Both scripts copy **every** skill folder under `skills/` to each
tool's skills folder (`.agents/skills`, `.claude/skills`,
`.config/opencode/skills`, `.gemini/antigravity/skills`,
`.gemini/config/skills`). They remove the old copy first, so
running them again to update is safe. `install.ps1` also runs
under PowerShell 7 on macOS/Linux.

**No Git on the machine?** Use the release ZIP instead of
cloning: download `Source code (zip)` from the v0.1.0 release
page (https://github.com/Dardcor/Super-Intelligence/releases/tag/v0.1.0),
extract it, then run `scripts/install.ps1` (Windows) or
`sh scripts/install.sh` (macOS/Linux) from the extracted
folder. No Git, no `npx`, no download step inside the agent.

## Option 7 — Manual (works everywhere)

1. Clone the repo (needs Git):
   ```bash
   git clone https://github.com/Dardcor/Super-Intelligence.git
   ```
   Without Git: download `Source code (zip)` from the v0.1.0
   release page and extract it instead.
2. Copy every folder under `skills/` into your agent's skills
   folder — for example, on macOS/Linux:
   ```bash
   cp -R skills/* ~/.agents/skills/
   ```
   or on Windows (PowerShell):
   ```powershell
   Copy-Item -Recurse skills/* "$env:USERPROFILE\.agents\skills\"
   ```
   For Antigravity, also copy to `~/.gemini/antigravity/skills/`
   (IDE) and `~/.gemini/config/skills/` (app), or into the
   workspace `.agents/skills/` — see Option 5.
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

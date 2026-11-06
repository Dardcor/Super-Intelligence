# Example: research a topic

## Input

User: "Is the Agent Skills format really supported by OpenCode,
or is that just a claim in our README?"

## Good output (short version)

**Answer:** Yes — OpenCode documents Agent Skills support, and it
reads skills from `.opencode/skills/`, `~/.config/opencode/skills/`,
and `.agents/skills/`.

**What I found**

- OpenCode's docs list Agent Skills as supported, with the
  discovery paths above. Source: OpenCode docs, checked
  2026-11-06.
- The same format is used by Claude Code and Codex, so one
  `SKILL.md` works in all three without forking it. Source:
  agentskills.io, checked 2026-11-06.

**What is still unverified**

- Whether this exact repo installs cleanly in OpenCode on
  Windows — not yet tested on the user's laptop. That is a
  Fase 1 test, not a docs claim.

**Sources**

- OpenCode docs (skill discovery paths)
- agentskills.io (Agent Skills spec)

## Bad output (do not do this)

A long confident paragraph claiming "OpenCode fully supports
everything, 100% compatible, revolutionary!" with no sources,
no dates, and no mention of what was not tested.

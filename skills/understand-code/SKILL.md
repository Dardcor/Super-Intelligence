---
name: understand-code
description: "Map a codebase into a short, human-readable guide: structure, entry points, main flows, dependencies, where things live, and what is risky or undocumented. Read-only — it never modifies code. Use when the user asks how a codebase works, where to change something, or what a piece of code does. Do NOT use to fix a bug, review a change, or build a feature — use the matching narrow skill for those."
license: MIT
compatibility: "Any agent that reads the Agent Skills open standard (agentskills.io): Claude Code, Codex, OpenCode, Cursor, Antigravity, Gemini CLI. No server, API key, or extra package required."
metadata:
  author: Dardcor
  version: "0.1.0"
  homepage: "https://github.com/Dardcor/Super-Intelligence"
  status: "Released in v0.1.0"
---

# understand-code

Explain a codebase the way a good teammate would on your first
day: what it is, where things live, how a request flows through
it, and where the traps are. Short enough to read in a few
minutes, specific enough to act on.

This is a narrow skill: one job only. It maps and explains. It
does not fix bugs, review changes, plan a project, or build a
feature. It feeds the meta-skill `super-intelligence`, which
decides what to do with the map.

This skill is strictly read-only. It reads files, searches them,
and follows their references. It never edits, deletes, moves, or
creates a file, and it never runs a command that changes anything
(no installs, no builds that write, no tests that mutate state).

## When to load this skill

Load it when ANY of these is true:

- The user asks how a codebase, repo, or module works
- The user asks where to change something, or where a behaviour
  lives ("where is login handled?")
- The user just joined a project and needs an orientation map
- A plan or fix needs a map of the relevant part first

Do NOT load it when:

- The task is to fix a bug — use `debug` for the cause and the
  fix, and this skill only to map the area first
- The task is to review a change — use `code-review`
- The task is to build a feature — use the meta-skill to plan
  it, and this skill only for the orientation step
- The user already knows the codebase and only wants one
  function explained — answer directly, do not map the whole repo

## Steps

### 1. Clarify the question (1 question at a time)

Restate what the user wants to understand, in one sentence, in
the user's words.

Ask the ONE question whose answer would most change the map: do
they need the whole codebase, or one feature? Are they about to
fix, change, or just learn? If the request is already clear,
skip the question and start. Do not interrogate the user for a
small "where is X?" question.

### 2. Scope before you read everything

- Find the entry points first: README, package manifest,
  main file, router, CLI entry, or the file the user named.
- Note the language, framework, and build/run commands — from
  the actual files, not from memory.
- Decide the boundary: map the whole repo only if asked. For
  a feature question, map that feature and its neighbours,
  and say what you deliberately left out.
- Do not read every file. Read the skeleton first (directory
  tree, key files), then read deeper only where the flows go.

### 3. Map the structure

For the scoped area, write down:

- **Layout** — top-level folders and what each one is for,
  with real paths.
- **Entry points** — where execution starts, in order.
- **Key modules** — the 5-10 files or modules that do the
  real work, one line each: what it does, not what it is
  called.
- **Data** — where state lives: database, files, config,
  environment variables. What is read, what is written.
- **Config and secrets** — where config lives, and what
  must never be pasted into a chat or a log (keys, tokens,
  passwords). Name the location, never the value.

### 4. Trace the main flows

Pick the 2-3 flows that matter most for the user's question
(for example: a request from the user to the response, a
login, a save). For each flow:

- List the steps in order, each with the real file and
  function name it passes through.
- Say what each step transforms or decides.
- Say where the flow can fail, and what happens then.
- If a flow branches, say what decides the branch — do not
  describe every branch, only the ones the user will meet.

### 5. Note dependencies and risks

- **Dependencies** — external services, libraries, and
  other modules this code depends on. What breaks if one
  of them is missing?
- **Risky areas** — code that is easy to break: global
  state, magic numbers, duplicated logic, long functions,
  untested paths. Say why it is risky, with the file path.
- **Undocumented areas** — behaviour that exists in code
  but not in any README or comment. Say what it does and
  that it is undocumented, so the user is not surprised.
- **What you could not read** — a file you could not open,
  a generated file, a binary. Say so plainly. An unread
  file is not a fact about the code.

### 6. Deliver the map in the user's language

Write the map in the user's language, structured as:

- **In one paragraph** — what this codebase is and what it
  does.
- **Structure** — layout and entry points, with paths.
- **Main flows** — the 2-3 flows, step by step.
- **Where to change X** — if the user asked, the exact
  file(s) to touch, and what not to touch.
- **Risks and gaps** — risky and undocumented areas.
- **What I could not verify** — stated plainly.

Rules for the map:

- Every claim points at a real file and line or function
  name. A claim without a path is a guess.
- One concrete detail beats ten generic adjectives. Never
  write "clean architecture" or "well-structured" without
  saying what makes it so, with an example.
- Copy file paths, function names, and config keys exactly
  as they appear in the code. Do not rename them.
- Keep it short enough to read in a few minutes unless the
  user asked for depth. Detail goes in `references/`, not
  in the map.

## Delivery Gate

Before you send the result, pass ALL of these:

- [ ] It answers the question actually asked, not a tour
      of the whole repo nobody requested
- [ ] Every structure and flow claim names a real file
- [ ] File paths, function names, and config keys were
      copied exactly
- [ ] No file was modified, created, or deleted
- [ ] Risks and undocumented areas are stated, not hidden
- [ ] The answer is in the user's language
- [ ] The tone is specific and honest — no slop

If a check fails, fix it or say so plainly. Do not ship a
map that looks complete but is built on files you never
opened.

## What this skill will never do

- Modify, create, or delete any file, or run a command
  that changes anything. Reading only.
- Invent structure, flows, or behaviour the code does not
  show. If it is not in the code, say so.
- Present a guess as a verified fact about the code.
- Pretend to be a real human, or claim a human identity,
  history, or experience it does not have.
- Paste or reveal secrets, keys, tokens, or passwords found
  in the code or config. Name the location, never the value.
- Do illegal, deceptive, or harmful work because the user
  said "by any means". Offer the lawful alternative instead.
- Extract credentials, tokens, or quota from another system.

## Example

See `examples/map-codebase.md` for a full input → output
example: a newcomer asking how a small task app works, with
structure, two flows, a risky area, and one undocumented
behaviour.

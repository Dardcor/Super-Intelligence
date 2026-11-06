---
name: debug
description: "Debug from an error message or bug report: reproduce it, find the cause, propose the smallest fix, and say how to prevent it happening again. Use when something crashes, fails, or behaves wrongly and the user wants the cause and the fix. Do NOT use to explain a codebase, review a change, or build a feature — use the matching narrow skill for those, and this skill only for the bug itself."
license: MIT
compatibility: "Any agent that reads the Agent Skills open standard (agentskills.io): Claude Code, Codex, OpenCode, Cursor, Antigravity, Gemini CLI. No server, API key, or extra package required."
metadata:
  author: Dardcor
  version: "0.1.0"
  homepage: "https://github.com/Dardcor/Super-Intelligence"
  status: "Released in v0.1.0"
---

# debug

Find out why something broke, prove it, and propose the
smallest fix that makes it right. No guessing, no rewriting
half the codebase "while you are there".

This is a narrow skill: one job only. It takes one bug — one
error, one wrong behaviour — from report to cause to a minimal
fix. It does not explain a whole codebase, review a change,
or build a feature. It feeds the meta-skill
`super-intelligence`, which decides what to do with the fix.

This skill proposes the fix. It does not silently rewrite
large parts of the codebase. The fix is shown to the user
first; it is applied only after the user agrees, and only
the minimal change is applied.

## When to load this skill

Load it when ANY of these is true:

- The user pastes an error message, a stack trace, or a
  crash report
- Something behaves wrongly and the user wants the cause
- A test fails and the user wants to know why
- The user says "it worked yesterday" and now it does not

Do NOT load it when:

- The task is to explain how the code works — use
  `understand-code`
- The task is to review a change — use `code-review`
- The task is to build a feature — use the meta-skill to
  plan it
- There is no actual failure yet, only a worry that one
  might happen — say what would prevent it, do not debug
  a bug that does not exist

## Steps

### 1. Clarify the bug (1 question at a time)

Restate the bug in one sentence, in the user's words: what
should happen, what actually happens, and when.

Ask the ONE question whose answer would most change the
debugging: the exact error message, the steps to reproduce,
the environment (OS, version, command run), or what changed
since it last worked. If the report is already complete,
skip the question and start. Do not interrogate the user
for a crash with a full stack trace already pasted.

Collect before you theorise:

- The exact error text — copied, not paraphrased. A
  paraphrased error hides the real clue.
- The steps to reproduce, in order.
- The environment: what was run, where, with what input.
- What changed recently: a new dependency, a new file,
  a config change, a deployment.

### 2. Reproduce it

- Reproduce the bug with the smallest possible input and
  the fewest steps. A bug you can reproduce on demand is
  a bug you can fix and verify.
- If you cannot reproduce it, say so plainly and say what
  you tried. Do not move on to a fix for a bug you never
  saw. A fix for an unreproduced bug is a guess.
- Write down the reproduction steps so the user can run
  them too. If the user can reproduce it and you cannot,
  the difference between your setups is itself a clue.

### 3. Narrow the cause, one variable at a time

- Form one hypothesis at a time, and test it. Change one
  thing, observe, then decide. Changing five things at
  once proves nothing.
- Follow the evidence in order: read the error at the exact
  line it points to, then follow the data backwards to
  where it went wrong. The crash site is often not the
  cause site.
- Check the usual suspects in order: wrong input, missing
  or wrong value (null / undefined / empty), wrong order
  of operations, a recent change, an environment difference.
- When two explanations fit, test the one that is cheapest
  to check first, and say which one you ruled out and how.
- Stop when you can state the cause in one sentence and
  point at the exact file and line. If you cannot, say
  what is still unknown instead of naming a cause you
  cannot prove.

### 4. Propose the minimal fix

Show the fix before applying anything:

- **Cause** — one sentence, with the file and line.
- **Fix** — the smallest change that fixes this bug and
  nothing else. Name the exact file, function, and lines.
  Show the change, not a description of it.
- **Why it works** — one or two sentences linking the fix
  to the cause.
- **What it does NOT change** — the behaviour, files, and
  features the fix deliberately leaves alone.
- **What it does not fix** — nearby problems you noticed
  but are out of scope. List them, do not fix them
  silently.

Rules for the fix:

- Smallest change wins. A one-line guard beats a rewrite.
- Do not refactor, rename, or "improve" unrelated code
  while fixing the bug.
- Do not add a feature to fix a bug.
- If the minimal fix is ugly but correct, say so, and say
  what a cleaner fix would cost. Let the user choose.

Apply the fix only after the user agrees, and apply only
what was agreed. If the user asked only for the cause,
stop at the cause.

### 5. Prevent it happening again

- **Test** — what test, check, or reproduction step would
  catch this bug if it came back? Name the test, not just
  "add tests".
- **Guard** — what validation, default, or check would
  stop the bad input or state from reaching this code?
- **Logging** — what one log line or message would have
  made this bug obvious in half the time?
- If prevention needs a bigger change than the fix, say
  so and propose it separately. Do not bundle it silently
  into the fix.

### 6. Deliver the result in the user's language

Write the result in the user's language, structured as:

- **Bug in one sentence** — what broke.
- **Reproduction** — the steps, so the user can see it too.
- **Cause** — one sentence, file and line.
- **Proposed fix** — the minimal change, shown, with what
  it does not change.
- **Prevention** — test, guard, or log that would catch it
  next time.
- **What is still unverified** — stated plainly.

Rules for the result:

- Copy the error message, file paths, function names, and
  values exactly as they appeared. Do not paraphrase an
  error.
- One concrete detail beats ten generic adjectives.
- Say "I don't know" where you don't know. A cause you
  cannot prove is not a cause.
- Keep it short enough to read in one minute unless the
  user asked for depth.

## Delivery Gate

Before you send the result, pass ALL of these:

- [ ] The bug is reproduced, or the failure to reproduce
      it is stated with what was tried
- [ ] The cause is one sentence pointing at a real file
      and line
- [ ] The proposed fix is minimal — no silent rewrite,
      no unrelated changes
- [ ] The fix is shown to the user, not applied without
      agreement
- [ ] Prevention is named concretely (a test, a guard,
      or a log line)
- [ ] The error, paths, and values were copied exactly
- [ ] The answer is in the user's language
- [ ] The tone is specific and honest — no slop

If a check fails, fix it or say so plainly. Do not ship a
confident-sounding cause for a bug you never reproduced.

## What this skill will never do

- Silently rewrite large parts of a codebase, refactor, or
  "improve" unrelated code while fixing one bug.
- Apply a fix without showing it and getting agreement
  first.
- Invent a cause, an error, or a test result it did not
  observe.
- Present a guess as a proven cause.
- Pretend to be a real human, or claim a human identity,
  history, or experience it does not have.
- Do illegal, deceptive, or harmful work because the user
  said "by any means". Offer the lawful alternative instead.
- Extract credentials, tokens, or quota from another system.

## Example

See `examples/fix-crash.md` for a full input → output
example: a crash on first login, reproduced, traced to one
line, with a minimal fix and a prevention test.

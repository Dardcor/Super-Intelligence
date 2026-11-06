---
name: code-review
description: "Review code changes and return numbered findings with priority and the exact location of each issue. Use when the user asks for a code review or shows a diff, a pull request, or a file to check. Do NOT rewrite whole files or apply fixes the user has not approved — suggest the fix, wait for approval, and never review code you have not actually read."
license: MIT
compatibility: "Any agent that reads the Agent Skills open standard (agentskills.io): Claude Code, Codex, OpenCode, Cursor, Antigravity, Gemini CLI. No server, API key, or extra package required."
metadata:
  author: Dardcor
  version: "0.1.0"
  homepage: "https://github.com/Dardcor/Super-Intelligence"
  status: "Released in v0.1.0"
---

# code-review

Review code that actually exists, find what is wrong or risky,
and say exactly where it is — file, line, and why it matters.
A good review finds real problems and skips style nitpicks.
It never rewrites the author's work unasked.

This is a narrow skill: one job only. It does not write new
features, plan a project, research a topic, or fix the code.
It feeds the meta-skill `super-intelligence`, which decides
what to do with the findings.

## When to load this skill

Load it when ANY of these is true:

- The user asks "review this code", "check this change", or
  "is this code okay?"
- The user shows a diff, a pull request, a commit, or a file
  and wants problems found before it is merged or shipped
- A build step needs existing code checked before new code is
  added on top of it

Do NOT load it when:

- The task is to write new code from scratch — use the
  meta-skill for the build, and this skill only to review the
  result
- The task is to fix a bug — use the debugging step for that,
  and this skill only to review the fix afterwards
- The task is to plan a project — use `plan-project` for that
- There is no code to read yet — say so plainly, do not review
  an idea as if it were code

## Steps

### 1. Clarify what to review (1 question at a time)

Restate what is being reviewed in one sentence: which files,
which change, and what it is supposed to do.

Ask the ONE question whose answer would most change the review:
what is this code supposed to do, and what counts as "good
enough" here — correctness only, or also speed, security, and
readability? If the scope is already clear, skip the question
and start. Do not interrogate the user for a small review.

If the code was not provided, ask for it. Never review code
you have not actually read.

### 2. Read the code before judging it

- Read every file in the change, not just the file names.
  A review of a diff you did not read is not a review.
- Read the surrounding code the change touches: the function
  that calls it, the data it receives, the error paths.
- Note what the code is supposed to do, in your own words,
  before listing what is wrong. If you cannot say what it is
  supposed to do, say so — that is itself a finding.
- Do not assume a library, framework, or pattern the code
  does not use. Check the actual imports and calls.

### 3. Find problems, in priority order

Check in this order, and stop listing a category once you
have its real findings — a review with 30 nitpicks hides the
one bug that matters:

1. **Correctness** — does it do what it claims to do? Wrong
   logic, off-by-one errors, wrong condition, data lost or
   duplicated, edge cases that break it (empty input, zero,
   missing file, no network).
2. **Security** — secrets in code, user input used without
   checking, SQL or shell injection, unsafe file paths,
   credentials or tokens logged or committed.
3. **Failure handling** — errors swallowed silently, no check
   for a failed call, a crash when a dependency is missing,
   no fallback when the happy path fails.
4. **Readability and maintenance** — misleading names, a
   function doing three jobs, duplicated logic, dead code,
   a comment that contradicts the code.
5. **Style** — only if the project has a written style rule
   the code breaks. Personal taste is not a finding.

For each finding, give:

- **Number** — F1, F2, F3, in priority order.
- **Priority** — `blocker` (must fix before merge), `should fix`
  (fix soon, can merge with a note), or `nit` (optional).
- **Location** — file and line, copied exactly.
- **What is wrong** — one or two sentences, with the actual
  code or value, not a vague complaint.
- **Suggested fix** — the smallest change that fixes it, or
  the question to ask the author if the right fix is unclear.

Do not invent problems. If the code is fine, say it is fine
and name the one or two things you checked hardest — a review
that always finds something is not trusted.

### 4. Suggest fixes — do not apply them

- List the suggested fixes in the review. Do NOT edit the
  files, do NOT rewrite whole files, do NOT commit anything.
- Wait for the user to approve a fix before applying it.
  Approval can be per finding ("fix F1 and F3") or for the
  whole list — either way, nothing is changed before the user
  says so.
- If a fix is risky or changes behaviour, say so in the
  suggestion, and offer the safer alternative.
- Keep the smallest fix that solves the finding. A fix that
  rewrites the file is a different change, not a fix.

### 5. Summarize in the user's language

Write the review in the user's language, at the user's level
of detail. Structure it as:

- **Verdict in 1-2 sentences** — approve, approve with fixes,
  or do not merge yet, and why.
- **Findings** — numbered, in priority order, each with
  location, problem, and suggested fix.
- **What is good** — 1-3 things the code does well, named
  concretely. A review that only lists faults is not honest.
- **What was not checked** — anything you could not verify
  (for example, "not run, only read" or "the database call
  was not tested"), stated plainly.

Rules for the review:

- One concrete detail beats ten generic adjectives.
- Copy file names, line numbers, variable names, and values
  exactly as they appear in the code. Do not paraphrase code.
- No hype, no emoji bullets, no fake statistics, no invented
  praise, no "revolutionary / 10,000%".
- Say "I don't know" where you don't know. A finding you are
  unsure about is marked unsure, not stated as certain.
- Keep it short enough to read in three minutes unless the
  change is large. Detail goes in `references/`, not in the
  review.

## Delivery Gate

Before you send the result, pass ALL of these:

- [ ] Every file in the change was actually read
- [ ] Every finding has a number, a priority, and an exact location
- [ ] Findings are in priority order, blockers first
- [ ] No fix was applied without the user's approval
- [ ] The verdict (approve / approve with fixes / do not merge)
      is stated in one sentence
- [ ] What was good is named, not skipped
- [ ] What was not checked is stated plainly
- [ ] The review is in the user's language

If a check fails, fix it or say so plainly. Do not ship a
review that looks thorough but was written without reading
the code.

## What this skill will never do

- Invent facts, prices, dates, citations, or "studies".
- Review code it has not actually read.
- Rewrite whole files, apply fixes, or commit changes the
  user has not approved.
- Pretend to be a real human, or claim a human identity,
  history, or experience it does not have.
- Do illegal, deceptive, or harmful work because the user
  said "by any means". Offer the lawful alternative instead.
- Extract credentials, tokens, or quota from another system.
- Approve code with a known security problem in it.

## Example

See `examples/review-a-diff.md` for a full input → output
example: a small diff reviewed with numbered findings in
priority order, a verdict, and fixes suggested but not applied.

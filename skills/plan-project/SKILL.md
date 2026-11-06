---
name: plan-project
description: "Turn a vague idea into a concrete plan with a goal, 3-7 steps, done criteria, out-of-scope, and risks. Use when the user has an idea or a goal and needs a plan before building anything. Do NOT use to do the work itself, to research a topic, or to review code — use the meta-skill or the matching narrow skill for those, then use this skill only for the planning step."
license: MIT
compatibility: "Any agent that reads the Agent Skills open standard (agentskills.io): Claude Code, Codex, OpenCode, Cursor, Antigravity, Gemini CLI. No server, API key, or extra package required."
metadata:
  author: Dardcor
  version: "0.1.0"
  homepage: "https://github.com/Dardcor/Super-Intelligence"
  status: "Released in v0.1.0"
---

# plan-project

Turn a vague idea into a plan someone can actually follow: what
"done" looks like, what happens first, what is deliberately left
out, and what could go wrong. A plan is not the work itself. It
is the map the work follows.

This is a narrow skill: one job only. It does not research a
topic, write a document, review code, or build anything. It feeds
the meta-skill `super-intelligence`, which decides what to do
with the plan.

## When to load this skill

Load it when ANY of these is true:

- The user has an idea, a wish, or a goal and asks "how do I do
  this?" or "make a plan"
- A task is too big or too vague to start directly, and needs to
  be broken into steps first
- The user asks what to do next, in what order, or what "done"
  means for a project

Do NOT load it when:

- The task is to do the work, not to plan it — use the matching
  skill for the work itself
- The task is to research a topic — use `research` for that step,
  then plan from its findings
- The task is to review code — use `code-review` for that step
- The user only wants a quick answer or a small fix — do not
  build a full plan around a 5-minute job

## Steps

### 1. Clarify the goal (1 question at a time)

Restate the goal in one sentence, in the user's words: what
will exist when this is done, and for whom?

Ask the ONE question whose answer would most change the plan:
what is the real outcome, what is the deadline or budget, and
what is already decided? If the goal is already clear, skip the
question and start. Do not interrogate the user for a small plan.

If the goal is still vague after one question, write down the
best reading of it and mark the assumption as **assumption** —
do not silently guess.

### 2. Write the goal and the done criteria

Write, in plain language:

- **Goal** — one sentence. The outcome, not the activity.
  ("A working login page" is a goal. "Work on login" is not.)
- **Done criteria** — 3-5 checks that are true when the work is
  finished. Each one must be checkable by looking, not by
  feeling: "the page loads without error" is checkable,
  "the page looks good" is not.
- **Out of scope** — 2-4 things this plan deliberately does NOT
  include. Saying no here is what keeps the plan small enough
  to finish.

If the user cannot describe "done", stop and ask them — a plan
without done criteria is a wish list.

### 3. Break it into 3-7 steps

- Each step is one clear action with one clear result.
  ("Add the login form" is a step. "Do the frontend" is not.)
- Order the steps by dependency: what must exist before the
  next step can start.
- Give each step a rough size: small (under an hour), medium
  (a day), or large (more than a day). If a step is large,
  split it or say so plainly.
- Keep the total to 3-7 steps. Fewer than 3 means the plan is
  really one task. More than 7 means the plan is really two
  projects — split it.
- For each step, note which skill or tool does it, if one
  exists (`research`, `code-review`, the meta-skill). If none
  exists, say so — do not invent a skill name.

### 4. Name the risks and the first step

- **Risks** — 2-3 things most likely to go wrong, and what to
  do if each happens. Skip generic risks ("it might take long")
  and name concrete ones ("the API key may not be approved yet,
  so start with the free provider").
- **First step** — the single smallest action the user can take
  right now, in under 30 minutes. A plan that ends without a
  first step will not be started.
- **What to check after step 1** — one check that tells you
  whether the plan still holds, or needs to change.

### 5. Present the plan in the user's language

Write the plan in the user's language, at the user's level of
detail. Structure it as:

- **Goal** — one sentence.
- **Done when** — the checkable criteria.
- **Steps** — numbered, 3-7, each with its result and size.
- **Out of scope** — what is not included.
- **Risks** — what could go wrong, and the fallback.
- **First step** — the smallest action to take now.
- **Assumptions** — anything you guessed, marked as guessed.

Rules for the plan:

- One concrete detail beats ten generic adjectives.
- Copy names, numbers, dates, and constraints exactly as the
  user wrote them. Do not paraphrase a deadline.
- No hype, no emoji bullets, no fake statistics, no invented
  praise, no "revolutionary / 10,000%".
- Say "I don't know" where you don't know. A plan built on a
  guess must say it is built on a guess.
- Keep it short enough to read in two minutes unless the user
  asked for depth. Detail goes in `references/`, not in the plan.

## Delivery Gate

Before you send the result, pass ALL of these:

- [ ] The goal is one sentence, and it names an outcome
- [ ] There are 3-7 steps, each with one clear result
- [ ] Done criteria are checkable by looking, not by feeling
- [ ] Out of scope is written down, not left vague
- [ ] Risks name concrete problems with fallbacks
- [ ] The first step takes under 30 minutes
- [ ] Assumptions are labelled as assumptions
- [ ] The plan is in the user's language

If a check fails, fix it or say so plainly. Do not ship a plan
that looks complete but has no way to tell when it is done.

## What this skill will never do

- Invent facts, prices, dates, citations, or "studies".
- Present a guess as a verified result.
- Pretend to be a real human, or claim a human identity,
  history, or experience it does not have.
- Do illegal, deceptive, or harmful work because the user
  said "by any means". Offer the lawful alternative instead.
- Extract credentials, tokens, or quota from another system.
- Start the work itself and call it a plan — planning and
  doing are different jobs.

## Example

See `examples/plan-a-small-app.md` for a full input → output
example: a vague app idea turned into a goal, done criteria,
5 steps, out of scope, risks, and a first step.

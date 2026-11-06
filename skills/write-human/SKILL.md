---
name: write-human
description: "Write long-form text like a real human: documents, READMEs, copy, and explanations that are specific, honest, and free of hype. Use when the user asks to write, rewrite, or shorten a document, README, message, or explanation. Do NOT use for researching facts, planning a project, or writing code — use the matching narrow skill for those, then use this skill only for the writing itself."
license: MIT
compatibility: "Any agent that reads the Agent Skills open standard (agentskills.io): Claude Code, Codex, OpenCode, Cursor, Antigravity, Gemini CLI. No server, API key, or extra package required."
metadata:
  author: Dardcor
  version: "0.1.0"
  homepage: "https://github.com/Dardcor/Super-Intelligence"
  status: "Released in v0.1.0"
---

# write-human

Write text that sounds like one specific person wrote it for
one specific reader — not like a template written for everyone
at once. Specific, honest, and short enough to read. If a
sentence can be removed without losing anything, remove it.

This is a narrow skill: one job only. It writes and rewrites
long-form text — documents, READMEs, copy, explanations. It
does not research facts, plan a project, or write code. It
feeds the meta-skill `super-intelligence`, which decides what
needs writing and what happens with the text after.

## When to load this skill

Load it when ANY of these is true:

- The user asks to write, rewrite, shorten, or explain
  something in words: a document, README, message, guide,
  announcement, or piece of copy
- The user says existing text "sounds like AI" and wants it
  to sound like a person wrote it
- A plan, research result, or build needs to be turned into
  text a real person will read

Do NOT load it when:

- The task is to find facts, prices, or sources — use the
  `research` skill first, then this skill only to write
  up what was found
- The task is to plan a project — use the matching skill
  for the plan, and this skill only for writing it up
- The task is to write code or build a UI — use the
  matching skill; this skill writes words, not code
- The user only wants a one-line answer or a short chat
  reply — just answer plainly, do not load a whole skill

## Steps

### 1. Clarify the reader and the point (1 question at a time)

Restate, in the user's words: who reads this, what should
they understand or do after reading it, and how long should
it be. Ask the ONE question whose answer would most change
the text — usually "who is this for, and what do they need
to do next?" If the request is already clear, skip the
question and start. Do not interrogate the user for a short
rewrite.

### 2. Gather the facts first — do not invent them

- Use only facts already in the conversation, in files the
  user gave you, or in research that was actually done.
  A fact without a source is a draft, not a finding.
- Copy names, numbers, dates, prices, file paths, commands,
  and quotes exactly as the source wrote them. Do not
  paraphrase a number. Do not round a price to make it
  look nicer.
- If a fact is needed and not available, do one of these:
  ask the user, run the `research` skill, or mark it
  clearly as unverified — never fill the gap with a
  confident-sounding guess.
- If the user gave you a claim you cannot verify, do not
  repeat it as fact. Write "the user says" or leave it
  out, and say so.

### 3. Draft in the user's language, in this order

Write in the language the user is using. If they switch
language, switch with them. Structure the draft as:

- **The point first** — the direct answer or the one
  thing the reader must know, in 2-3 sentences.
- **The details** — only what the reader needs to act
  on, in the order they need it.
- **What is not known yet** — stated plainly, if anything
  is unverified or undecided.

Rules for the draft:

- One concrete detail beats ten generic adjectives.
  "Installed 9router 0.5.109, tested /v1/models, it
  answered" beats "successfully leveraged cutting-edge
  AI infrastructure".
- Vary the rhythm. Mix short sentences with longer ones.
- Use the user's own terms and names, exactly as they
  wrote them.
- Admit limits plainly: "I could not verify this price"
  is human. Inventing a price is not.
- Cut a sentence if removing it loses nothing. Let one
  honest detail carry the paragraph.

### 4. Run the humanize check

Read the draft out loud. If it sounds like a template, a
press release, or a motivational poster, rewrite it.

Remove all of these:

- Openers like "Great question!" / "I'd be happy to help!"
- Emoji bullets, ALL-CAPS hype, and words like
  "revolutionary / game-changing / next-level / ultimate"
  unless the user wrote those words
- Invented statistics, testimonials, or "studies show"
- Generic praise ("amazing", "incredible", "perfect") with
  nothing concrete behind it
- Generic empathy that adds no information ("I understand
  how frustrating this must be...")
- Confident language that smooths over a failure. Say what
  failed, in plain words.

Keep all of these:

- Specific numbers, names, and dates the reader can check
- Short sentences that say one thing
- "I don't know" where you don't know
- The user's language and tone, not a corporate voice

### 5. Verify before delivering

- Re-read every number, date, name, and quote against its
  source. One wrong digit is worse than a missing sentence.
- Check the length: if the user asked for short, cut it
  in half and check it still answers the question.
- Check the audience: would this reader understand every
  word? If a term needs explaining, explain it in one
  clause or drop it.

## Before / after

Before (slop — a README intro for a small skill repo):

> "🚀 Welcome to the ultimate Super-Intelligence experience!
> Our revolutionary AI skill will transform your workflow by
> 10,000%! Unlock next-level productivity with cutting-edge
> technology loved by millions around the world!"

Why it fails: every claim is invented (no users, no measured
improvement), it says nothing about what the skill does, and
it reads like a template for any product.

After (human — same repo, same intro):

> "This is v0.1. It does one thing: it turns a vague request
> into a short plan, checks each step, then rewrites the
> answer so it sounds like a person wrote it. It does not do
> everything yet. Install it with `npx skills add
> Dardcor/Super-Intelligence`."

Why it passes: it says what the thing is, what it does, what
it does not do, and how to install it — in four sentences,
with nothing invented.

## Delivery Gate

Before you deliver the text, pass ALL of these:

- [ ] It answers what was actually asked, not a nearby topic
- [ ] Every number, date, name, and quote was copied exactly
      from its source
- [ ] Unverified items are labelled unverified, not hidden
- [ ] No hype, no emoji bullets, no invented statistics,
      praise, or testimonials
- [ ] It reads out loud like one person wrote it for one
      reader — no template voice
- [ ] It is in the user's language, and short enough to
      read in the time the user has
- [ ] Nothing in it claims a human identity, history, or
      experience the writer does not have

If a check fails, fix it or say so plainly. Do not ship a
confident-sounding text with invented facts inside.

## What this skill will never do

- Invent facts, prices, dates, citations, testimonials,
  or "studies".
- Present a guess as a verified result.
- Pretend to be a real human, or claim a human identity,
  history, feelings, or experience it does not have.
- Write deceptive copy: hidden costs, fake urgency,
  fake social proof, or a claim the product cannot back up.
- Do illegal, deceptive, or harmful work because the user
  said "by any means". Offer the lawful alternative instead.
- Extract credentials, tokens, or quota from another system.

## Example

See `examples/readme-rewrite.md` for a full input → output
example: a slop README intro rewritten as human text, with
each change explained.

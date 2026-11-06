---
name: build-ui
description: "Build a user interface that passes a purpose test: every visual element must serve a specific user task, with plain copy, no decorative clutter, and no fake data or statistics. Use when the user asks to build, redesign, or fix a UI, page, form, or dashboard. Do NOT use for backend logic, planning, or writing long-form text — use the matching narrow skill for those, then use this skill only for the interface itself."
license: MIT
compatibility: "Any agent that reads the Agent Skills open standard (agentskills.io): Claude Code, Codex, OpenCode, Cursor, Antigravity, Gemini CLI. No server, API key, or extra package required."
metadata:
  author: Dardcor
  version: "0.1.0"
  homepage: "https://github.com/Dardcor/Super-Intelligence"
  status: "Released in v0.1.0"
---

# build-ui

Build an interface a real person can use without thinking about
the interface. Every element on the screen must earn its place:
if it does not help the user do their task, it does not ship.

This is a narrow skill: one job only. It builds the interface —
layout, copy, states, and flow. It does not decide the product
strategy, write the backend, or write long-form documents. It
feeds the meta-skill `super-intelligence`, which decides what
the UI is for and what happens after the user acts.

## When to load this skill

Load it when ANY of these is true:

- The user asks to build, redesign, or fix a UI, page, form,
  dashboard, or screen
- The user asks whether a screen is clear, usable, or too
  cluttered
- A feature is done and needs an interface for a real person
  to use it

Do NOT load it when:

- The task is backend logic, a database, an API, or a script
  with no screen — use the matching skill for that work
- The task is to plan a project or write a document — use the
  matching skill, and this skill only for the interface step
- The user only wants an opinion about a design trend, not a
  screen built or fixed

## Steps

### 1. Clarify the task (1 question at a time)

Restate, in the user's words: who uses this screen, what one
task they are trying to finish, and on what device. Ask the ONE
question whose answer would most change the design — usually
"what does the user do first when they open this?" If the
request is already clear, skip the question and start. Do not
interrogate the user for a small fix.

### 2. Map the user's tasks, not the features

List the 1-3 tasks the screen must support, in the user's
words, in the order they do them. Example: "check today's
sales, then export the report." Every section of the screen
must map to one of these tasks. A section with no task is
clutter, not a feature.

### 3. Apply the purpose test to every element

For every heading, button, card, badge, chart, image, and
animation, ask:

- What user task does this serve? Name it in one sentence.
- What happens if I remove it? If nothing breaks, remove it.
- Is it the primary action, or is it competing with it? A
  screen has one primary action. Everything else is smaller,
  quieter, or gone.
- Does it show real information, or does it fill space?
  Decorative gradients, stock photos, and generic icons that
  explain nothing are space-fillers. Remove them.

### 4. Write the copy like a person, not a billboard

- Buttons say what happens: "Save report", not "Submit" or
  "Let's go!".
- Headings say what is on the screen: "Today's sales", not
  "Unlock your business superpowers".
- Empty states say what is true and what to do next: "No
  sales yet today. Sales appear here after your first order."
- Errors say what went wrong and how to fix it: "We could
  not save. Check your connection and try again." Never a
  bare "Error!" and never a fake-friendly joke that hides
  the problem.
- No hype words unless the user wrote them. No emoji bullets.
- Copy names, numbers, dates, and prices exactly as the
  source gives them. Do not round a price to make it look
  nicer.

### 5. Use real data only — design the states, not just the happy path

- Never invent numbers, names, testimonials, or statistics
  to make a screen look full. A chart with fake data is a
  lie the user will ship.
- If there is no real data yet, show the empty state. If
  data is loading, show a loading state. If it failed, show
  the error state and a retry.
- Sample data, if the user explicitly asks for a demo, must
  be labelled as sample: "Sample data — not real sales."
- Dates, currencies, and units follow the user's locale
  unless the user says otherwise. Do not guess a timezone.

### 6. Keep the layout calm and usable

- One idea per screen. If the screen needs three ideas,
  it is three screens, or one screen with a clear order.
- Put the most important thing first and largest. Put
  secondary things later and smaller.
- Make the primary action obvious and reachable. Make
  destructive actions hard to hit by accident and easy
  to undo.
- Text must be readable: enough contrast, large enough to
  read, and not grey-on-grey for anything important.
- The screen must work with a keyboard and a screen reader:
  real buttons (not divs that look like buttons), labels
  on every input, and alt text that says what an image
  actually shows.

## Before / after

Before (slop UI — a landing page for a small note-taking tool):

> Hero: "🚀 Unlock the ultimate productivity revolution!
> Transform your workflow by 10,000% with AI-powered
> next-level notes!" Three gradient cards: "Blazing fast",
> "Super secure", "Loved by millions". A chart showing
> "98.7% happier users". Five buttons, all purple, all
> saying "Get started".

Why it fails the purpose test: nothing tells the user what
the tool does, what happens when they click, or whether any
number is real. Every element is decoration competing for
attention.

After (purposeful UI — same tool, same screen):

> Heading: "Notes that open where you left off."
> One line under it: "Write a note, close the tab, come
> back tomorrow — it is still here."
> One primary button: "Write your first note".
> One quiet link under it: "See how it works (1 minute)".
> No chart, no statistics, no testimonials — the product
> has no users yet, so there is nothing honest to show.

Why it passes: one task (start writing), one action, copy
that says what happens, and nothing invented.

## Delivery Gate

Before you deliver the UI, pass ALL of these:

- [ ] Every element passes the purpose test — each one
      serves a named user task, or it was removed
- [ ] There is one primary action, and it is obvious
- [ ] All copy is plain and specific — no hype, no emoji
      bullets, no generic praise
- [ ] No fake data, statistics, testimonials, or charts
- [ ] Empty, loading, and error states are designed, not
      left as an afterthought
- [ ] Labels are on every input; buttons are real buttons;
      text contrast is readable
- [ ] The UI is in the user's language, with names, numbers,
      and prices copied exactly

If a check fails, fix it or say so plainly. Do not ship a
pretty screen that lies to its user.

## What this skill will never do

- Invent data, statistics, testimonials, or "studies" to
  fill a screen.
- Add decorative clutter, hype copy, or fake social proof
  to make a product look bigger than it is.
- Pretend to be a real human, or claim a human identity,
  history, or experience it does not have.
- Build a deceptive interface: hidden costs, fake urgency
  ("only 1 left!"), or a button that does something
  different from what its label says.
- Do illegal, deceptive, or harmful work because the user
  said "by any means". Offer the lawful alternative instead.
- Extract credentials, tokens, or quota from another system.

## Example

See `examples/landing-page.md` for a full input → output
example: a slop landing page rebuilt as a purposeful one,
with each change tied to the purpose test.

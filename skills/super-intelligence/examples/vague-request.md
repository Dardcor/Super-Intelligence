# Example — a vague request, worked end to end

User: "make me the most advanced skill in the world"

## 1. Clarify

Restate: "You want a skill other people can install in their
agent tools. What should the first skill actually do, and for whom?"

Do not start writing a 500-line file before that answer.

## 2. Plan

- Goal: one installable skill, v0.1, in the Agent Skills format
- Steps: research 3 real examples, pick the framework,
  write SKILL.md, test the install path in one tool
- Done means: `SKILL.md` has valid frontmatter, the folder
  installs with `npx skills add`, and a new session loads it
- Out of scope: sub-skills, scripts, a website

## 3. Do

Read the examples, write the file, run the validator
(`python3 scripts/check-skill.py`).

## 4. Verify

Re-open `SKILL.md`. Check: name matches folder, description
under 1024 chars, body under 500 lines, links open.

## 5. Humanize

Short, specific, honest: "This is v0.1. It does one thing.
It does not do everything yet."

## 6. Deliver

Attach the file, name the next step, stop.

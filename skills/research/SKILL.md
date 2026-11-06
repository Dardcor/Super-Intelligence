---
name: research
description: "Research one topic from verifiable sources and return a short summary with sources and what is still unverified. Use when the user asks to research, compare, explain, or check a topic, product, person, or claim. Do NOT use for writing, planning, or building something — use the meta-skill or the matching narrow skill for those, then use this skill only for the research step."
license: MIT
compatibility: "Any agent that reads the Agent Skills open standard (agentskills.io): Claude Code, Codex, OpenCode, Cursor, Antigravity, Gemini CLI. No server, API key, or extra package required."
metadata:
  author: Dardcor
  version: "0.1.0"
  homepage: "https://github.com/Dardcor/Super-Intelligence"
  status: "Released in v0.1.0"
---

# research

Research one topic properly, then say plainly what is known, what
is not known, and where each fact came from. No invented facts,
no fake statistics, no confident-sounding guesses.

This is a narrow skill: one job only. It does not plan a project,
write a document, review code, or build anything. It feeds the
meta-skill `super-intelligence`, which decides what to do with
the findings.

## When to load this skill

Load it when ANY of these is true:

- The user asks to research, look into, compare, or explain a topic
- The user asks whether a claim, price, date, or fact is true
- A plan or build step needs a fact checked before it can proceed

Do NOT load it when:

- The task is to write, plan, review code, or build — use the
  matching skill for that work, and this skill only for its
  research step
- The answer is already in the conversation or in a file the user
  gave you — read that first, do not re-research it
- The user only wants an opinion or a creative idea, not facts

## Steps

### 1. Clarify the question (1 question at a time)

Restate the research question in one sentence, in the user's words.

Ask the ONE question whose answer would most change the research:
what exactly must be answered, for whom, by when, and what counts
as a good enough source? If the request is already clear, skip
the question and start. Do not interrogate the user for a small
fact-check.

### 2. Gather sources

- Use the agent's real search / fetch tools. Do not answer from
  memory when a check is possible.
- Prefer primary sources: the official docs, the repo, the
  announcement, the price page, the original paper.
- Take 2-3 independent sources for any important claim. One
  blog post repeating another blog post is one source, not two.
- Keep the exact URL, file path, or record ID for every source.
  A fact without a source is a draft, not a finding.
- Note the date each source was written or checked. A price,
  version, or status from last year is not today's fact.

### 3. Verify, do not just collect

For every important claim:

- Re-open the source and read the exact line that supports it.
- If two sources disagree, say so and say which one is more
  likely right and why — do not silently pick the newer one.
- If a source cannot be opened, say what failed. A failed check
  does not prove the claim is false.
- If you cannot verify something, mark it clearly as
  **unverified** instead of presenting it as fact.

### 4. Summarize in the user's language

Write the summary in the user's language, at the user's level
of detail. Structure it as:

- **Answer in 2-3 sentences** — the direct answer first.
- **What I found** — the key facts, each with its source.
- **What is still unverified / unknown** — stated plainly.
- **Sources** — the list, with dates checked.

Rules for the summary:

- One concrete detail beats ten generic adjectives.
- Copy names, numbers, dates, and quotes exactly as the source
  wrote them. Do not paraphrase a number.
- No hype, no emoji bullets, no fake statistics, no invented
  praise, no "revolutionary / 10,000%".
- Say "I don't know" where you don't know. Confidence must
  match the evidence.
- Keep it short enough to read in one minute unless the user
  asked for depth. Detail goes in `references/`, not in the
  summary.

## Delivery Gate

Before you send the result, pass ALL of these:

- [ ] It answers the question actually asked, not a nearby topic
- [ ] Every important claim has a source that opens
- [ ] Every number, date, and name was copied exactly
- [ ] Unverified items are labelled unverified, not hidden
- [ ] The answer is in the user's language
- [ ] The tone is specific and honest — no slop

If a check fails, fix it or say so plainly. Do not ship a
researched-looking answer with unverified facts inside.

## What this skill will never do

- Invent facts, prices, dates, citations, or "studies".
- Present a guess as a verified result.
- Pretend to be a real human, or claim a human identity,
  history, or experience it does not have.
- Do illegal, deceptive, or harmful work because the user
  said "by any means". Offer the lawful alternative instead.
- Extract credentials, tokens, or quota from another system.

## Example

See `examples/research-topic.md` for a full input → output
example: a short topic research with sources, a disagreement
between two sources, and one item left unverified.

# Example: rewrite a slop README intro

## Input

User: "Rewrite the intro of my README. The repo is
Super-Intelligence, a skill for agent tools. It is v0.1.0.
It turns a vague request into a short plan, checks each
step, and rewrites the answer so it sounds human. It works
in Claude Code, Codex, OpenCode, and Antigravity. It does
not do everything yet."

## Bad output (do not do this)

"🚀 Welcome to the ultimate Super-Intelligence experience!
Our revolutionary AI skill will transform your workflow by
10,000%! Unlock next-level productivity with cutting-edge
technology loved by millions around the world!"

Why it is bad: "10,000%" and "loved by millions" are
invented — the repo has no users yet and nothing was
measured. It does not say what the skill does or how to
install it.

## Good output

"This is v0.1. It does one thing: it turns a vague request
into a short plan, checks each step, then rewrites the
answer so it sounds like a person wrote it. It does not do
everything yet.

It works in Claude Code, Codex, OpenCode, and Antigravity.
Install it with `npx skills add Dardcor/Super-Intelligence`."

**Why each change was made:**

- "v0.1" and "does one thing" replace "ultimate /
  revolutionary" — the version and the scope are facts
  the user gave, not praise.
- The plan → check → rewrite loop is described in one
  sentence, in plain words.
- "It does not do everything yet" is kept on purpose:
  an honest limit is more believable than a hype claim.
- The four tools are named exactly as the user listed
  them, and the install command is copied exactly.
- No statistics, no testimonials, no emoji. Nothing
  in the text was invented.

# Example: debug a crash on first login

## Input

User: "The app crashes when I log in for the first time.
Error: `TypeError: Cannot read properties of undefined
(reading 'name')` at `app.js:42`. It works fine on the
second login."

## Good output (short version)

**Bug in one sentence:** First login crashes because the
user's profile has not loaded yet when the welcome message
reads its name.

**Reproduction**

1. Clear the app's stored data.
2. Log in with any account.
3. Crash on the welcome screen, every time. Second login
   works, because the profile is already stored.

**Cause:** `app.js:42` reads `profile.name`, but on first
login `profile` is still `undefined` — the welcome screen
renders before the profile finishes loading.

**Proposed fix (minimal):** in `app.js`, guard line 42 so
the welcome message waits for the profile:

```js
if (!profile) return; // profile still loading
```

That is the whole fix. It does not change the login flow,
the profile loading, or anything else.

**What it does not fix:** the welcome screen shows nothing
while the profile loads. A loading message would be a
separate, small improvement — not part of this fix.

**Prevention:** a test that logs in with empty stored data
and checks the welcome screen renders without crashing.

**What is still unverified**

- Whether the same crash happens on a slow connection —
  not tested, so I will not claim it.

## Bad output (do not do this)

"Just rewrite the login flow with a modern state manager
and add error handling everywhere" — a big rewrite, no
proven cause, no reproduction, and no minimal fix.

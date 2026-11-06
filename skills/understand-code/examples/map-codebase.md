# Example: map a codebase for a newcomer

## Input

User: "I just joined this project. It's a small task app. Explain
how it works, and where I would change how tasks are saved."

## Good output (short version)

**In one paragraph:** A small task app: a web page where you add,
check off, and delete tasks. Tasks are stored in the browser's
local storage, so there is no server and no account.

**Structure**

- `index.html` — the page and the task form.
- `app.js` — all the logic: add, toggle, delete, render.
- `style.css` — layout only, no logic.
- Entry point: opening `index.html` loads `app.js`.

**Main flows**

1. Add a task: form submit in `index.html` → `addTask()` in
   `app.js` → task saved to local storage → `render()` redraws
   the list.
2. Check off a task: click checkbox → `toggleTask(id)` in
   `app.js` → task's `done` flag flips in local storage →
   `render()` redraws the list.

**Where to change how tasks are saved:** `saveTasks()` in
`app.js` — it is the only function that writes to local
storage. Do not touch `render()` for this; it only reads.

**Risks and gaps**

- Risky: `render()` rebuilds the whole list on every change,
  so it will get slow with hundreds of tasks.
- Undocumented: tasks are never synced or backed up — clearing
  browser data deletes everything, and no README says so.

**What I could not verify**

- Whether the app works in older browsers — the code uses
  features I did not test, so I will not claim it.

## Bad output (do not do this)

A long paragraph saying "this is a modern, clean, well-structured
app built with best practices" with no file paths, no flows,
and no mention of the local-storage risk.

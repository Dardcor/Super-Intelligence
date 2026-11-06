# Example: plan a small app

## Input

> "saya mau bikin aplikasi kecil untuk mencatat pengeluaran harian, tapi bingung mulai dari mana"

## Output

### Goal

A small app the user can open on their phone, add one expense in under 10 seconds, and see total spending for the week.

### Done when

- [ ] The user can add an expense (amount, category, note) and see it in a list
- [ ] The weekly total is shown on the main screen
- [ ] Data is still there after the app is closed and reopened
- [ ] Adding one expense takes under 10 seconds, timed by hand

### Steps

1. **Decide the shape (small).** One screen, one list, one form. No login, no sync. Result: a one-paragraph description of the three screens that exist.
2. **Pick the simplest stack (small).** Use whatever the user already knows; if nothing is known, use a single HTML file with local storage. Result: the choice written down, with one reason.
3. **Build the add-expense form (medium).** Amount, category, note, save button. Result: a working form that stores one expense.
4. **Build the list and weekly total (medium).** Show expenses newest first, with the week's total at the top. Result: the main screen shows real data.
5. **Test the 10-second rule (small).** Add 5 expenses by hand and time each one. Fix anything that slows it down. Result: all 5 added in under 10 seconds each.

### Out of scope

- No login or user accounts
- No sync between devices
- No charts, budgets, or reports — weekly total only
- No App Store / Play Store release

### Risks

- **The user picks a stack they do not know.** Fallback: use the single HTML file option from step 2, no new tool to learn.
- **Data is lost because storage was not tested.** Fallback: test step 4 by closing and reopening the app before adding more features.
- **Scope grows ("tambah grafik dong").** Fallback: write the idea in a "later" list and finish the 5 steps first.

### First step

Write one paragraph: what the app shows on its single main screen, in the user's own words. Takes about 10 minutes.

### Assumptions

- **Assumption:** the user wants this for personal use only, not for a team — not confirmed, asked in the plan.
- **Assumption:** the user's phone is the main device — not confirmed.

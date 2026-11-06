# Example: review a small diff

## Input

> "tolong review perubahan ini sebelum saya merge"

```diff
--- a/app.py
+++ b/app.py
@@ -10,6 +10,9 @@
 def get_user(user_id):
-    user = db.query("SELECT * FROM users WHERE id = ?", [user_id])
-    return user
+    query = "SELECT * FROM users WHERE id = " + user_id
+    user = db.query(query)
+    return user
+
+def save_note(user_id, note):
+    with open(f"/tmp/notes/{user_id}.txt", "w") as f:
+        f.write(note)
```

## Output

### Verdict

Do not merge yet — F1 is a blocker. The other findings are small, but F1 lets any caller run arbitrary SQL.

### Findings

**F1 — blocker — `app.py`, line 13**
User input is concatenated straight into the SQL string. A `user_id` of `1 OR 1=1` returns every user, and a crafted value can change or delete data.
Suggested fix: go back to the parameterized query from the old code — `db.query("SELECT * FROM users WHERE id = ?", [user_id])`. No other change needed.

**F2 — should fix — `app.py`, line 17**
`save_note` writes to a path built from `user_id` without checking it. A `user_id` of `../../etc/passwd` writes outside `/tmp/notes/`.
Suggested fix: reject any `user_id` that is not letters and digits, or build the path with a fixed prefix and a validated name. I have not applied this — waiting for your approval.

**F3 — nit — `app.py`, line 17**
The file is opened without an encoding. On Windows this can write with the wrong encoding for non-ASCII notes.
Suggested fix: add `encoding="utf-8"` to the `open()` call.

### What is good

- The new `save_note` function is small and does one job.
- The diff is small and easy to read — two functions, no unrelated changes.

### What was not checked

- The code was read only, not run — I did not test the queries against a real database.
- I did not check whether other files in the project build SQL the same way.

### Fixes applied

None. All three fixes above are suggestions only, waiting for the user's approval.

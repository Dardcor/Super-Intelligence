#!/usr/bin/env python3
"""Validate skills/*/SKILL.md against the Agent Skills spec (agentskills.io).

Checks: frontmatter exists, name matches folder, name is 1-64 chars
[a-z0-9-], description is 1-1024 chars, body is under 500 lines.
Also validates every plugin/marketplace JSON file is valid JSON.
Usage: python3 scripts/check-skill.py
"""
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
errors = []

for skill_md in sorted((ROOT / "skills").glob("*/SKILL.md")):
    name_dir = skill_md.parent.name
    text = skill_md.read_text(encoding="utf-8")
    m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    if not m:
        errors.append(f"{skill_md}: missing YAML frontmatter")
        continue
    front = m.group(1)
    name = re.search(r"^name:\s*(.+)$", front, re.M)
    desc = re.search(r"^description:\s*(.+)$", front, re.M | re.S)
    if not name:
        errors.append(f"{skill_md}: missing name")
        continue
    name = name.group(1).strip().strip('"\'')
    if name != name_dir:
        errors.append(f"{skill_md}: name '{name}' != folder '{name_dir}'")
    if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", name) or len(name) > 64:
        errors.append(f"{skill_md}: name '{name}' breaks spec (1-64 chars, [a-z0-9-])")
    if not desc:
        errors.append(f"{skill_md}: missing description")
    else:
        d = desc.group(1).strip().strip('"\'')
        # YAML folded description may span lines; approximate length check
        if len(d) == 0 or len(d) > 1024:
            errors.append(f"{skill_md}: description length {len(d)} (must be 1-1024)")
    body_lines = text[m.end():].count("\n") + 1
    if body_lines > 500:
        errors.append(f"{skill_md}: body is {body_lines} lines (spec warns over 500)")
    print(f"OK {skill_md.relative_to(ROOT)} name={name} body_lines={body_lines}")

for json_path in sorted(ROOT.rglob("*.json")):
    if ".git" in json_path.parts:
        continue
    try:
        json.loads(json_path.read_text(encoding="utf-8"))
    except Exception as exc:
        errors.append(f"{json_path.relative_to(ROOT)}: invalid JSON ({exc})")
    else:
        print(f"OK {json_path.relative_to(ROOT)} (valid JSON)")

if errors:
    print("\nFAIL:")
    for e in errors:
        print(f" - {e}")
    sys.exit(1)
print("\nAll skills valid.")

#!/usr/bin/env node
// super-intelligence — installer for the Super-Intelligence agent skill.
// Usage: npx super-intelligence [--agent <name>] [--project] [--list] [--dry-run]
// No network, no Git, no symlinks: the skills ship inside this package
// and are copied (never linked) to every agent tool's skills folder.
// Node.js >= 18, standard library only. Works on Windows, macOS, Linux.
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");

const VERSION = "0.1.0";
const PKG_DIR = path.join(__dirname, "..");
const SKILLS_DIR = path.join(PKG_DIR, "skills");

// Every global target, grouped by tool. Antigravity has two global
// paths (app and IDE) because it does NOT read ~/.agents/skills/;
// both are written so the skill loads in either client.
const TARGETS = [
  { agent: "codex", label: "Codex / OpenCode / Cursor / Copilot / Gemini CLI (shared hub)", dir: [".agents", "skills"] },
  { agent: "claude", label: "Claude Code", dir: [".claude", "skills"] },
  { agent: "opencode", label: "OpenCode", dir: [".config", "opencode", "skills"] },
  { agent: "antigravity", label: "Antigravity (IDE)", dir: [".gemini", "antigravity", "skills"] },
  { agent: "antigravity", label: "Antigravity (app)", dir: [".gemini", "config", "skills"] },
];

const AGENT_TARGETS = {
  codex: ["codex"],
  opencode: ["codex", "opencode"],
  claude: ["claude"],
  antigravity: ["antigravity"],
  all: ["codex", "claude", "opencode", "antigravity"],
};

function printHelp() {
  console.log(`super-intelligence ${VERSION} — install the Super-Intelligence agent skill

Usage:
  npx super-intelligence                    Install all skills to every agent tool
  npx super-intelligence --agent codex      Install only for Codex (shared ~/.agents/skills)
  npx super-intelligence --agent antigravity
                                            Install only for Antigravity (both .gemini paths)
  npx super-intelligence --agent claude    Install only for Claude Code
  npx super-intelligence --agent opencode  Install only for OpenCode
  npx super-intelligence --project         Install into ./.agents/skills (this project only)
  npx super-intelligence --list            List the skills bundled in this package
  npx super-intelligence --dry-run         Show what would be installed, change nothing
  npx super-intelligence --version         Print the version
  npx super-intelligence --help            Show this help

After install, start a NEW session in your agent tool — skills load at
session start. No Git, no download step, no symlinks: everything is
copied from this package. Re-running is safe; old copies are removed first.`);
}

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

function listSkills() {
  if (!fs.existsSync(SKILLS_DIR)) fail(`skills folder not found at ${SKILLS_DIR}`);
  const names = fs
    .readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory() && fs.existsSync(path.join(SKILLS_DIR, e.name, "SKILL.md")))
    .map((e) => e.name)
    .sort();
  return names.map((name) => {
    const text = fs.readFileSync(path.join(SKILLS_DIR, name, "SKILL.md"), "utf8");
    const desc = (text.match(/^description:\s*["']?(.*?)["']?\s*$/m) || [])[1] || "";
    return { name, desc: desc.trim() };
  });
}

function copyDir(src, dest) {
  // Remove the old copy first: without this, a re-install nests the
  // skill folder inside itself.
  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
}

function main() {
  const args = process.argv.slice(2);
  const opts = { agent: "all", project: false, list: false, dryRun: false };

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--help" || a === "-h") { printHelp(); return; }
    if (a === "--version" || a === "-v") { console.log(VERSION); return; }
    if (a === "--list") { opts.list = true; continue; }
    if (a === "--project") { opts.project = true; continue; }
    if (a === "--dry-run") { opts.dryRun = true; continue; }
    if (a === "--agent") {
      const v = args[++i];
      if (!v || !AGENT_TARGETS[v]) fail(`unknown agent "${v}" (use: codex, opencode, claude, antigravity, all)`);
      opts.agent = v;
      continue;
    }
    if (a.startsWith("--agent=")) {
      const v = a.slice("--agent=".length);
      if (!AGENT_TARGETS[v]) fail(`unknown agent "${v}" (use: codex, opencode, claude, antigravity, all)`);
      opts.agent = v;
      continue;
    }
    fail(`unknown option "${a}" (try --help)`);
  }

  const skills = listSkills();
  if (skills.length === 0) fail("no skills found in this package");

  if (opts.list) {
    for (const s of skills) console.log(`${s.name} — ${s.desc}`);
    return;
  }

  const home = os.homedir();
  if (!home) fail("could not determine the home directory");

  let targets;
  if (opts.project) {
    targets = [{ agent: "project", label: "This project (.agents/skills)", dir: path.join(process.cwd(), ".agents", "skills") }];
  } else {
    const wanted = AGENT_TARGETS[opts.agent];
    targets = TARGETS.filter((t) => wanted.includes(t.agent)).map((t) => ({
      agent: t.agent,
      label: t.label,
      dir: path.join(home, ...t.dir),
    }));
  }

  let installed = 0;
  for (const t of targets) {
    for (const s of skills) {
      const src = path.join(SKILLS_DIR, s.name);
      const dest = path.join(t.dir, s.name);
      if (opts.dryRun) {
        console.log(`would install ${s.name} -> ${dest}`);
      } else {
        copyDir(src, dest);
        if (!fs.existsSync(path.join(dest, "SKILL.md"))) fail(`install failed: SKILL.md missing at ${dest}`);
        console.log(`installed ${s.name} -> ${dest}`);
      }
      installed++;
    }
    if (!opts.dryRun) console.log(`OK ${t.label} (${skills.length} skills)`);
  }

  console.log(
    opts.dryRun
      ? `Dry run: ${installed} skill copies would be installed to ${targets.length} location(s). Nothing was changed.`
      : `Done: ${installed} skill copies in ${targets.length} location(s). Start a NEW session in your agent tool — skills load at session start.`
  );
  if (!opts.project && !opts.dryRun) {
    console.log("Verify: the folders above should each list the 8 skills (super-intelligence, research, plan-project, code-review, understand-code, debug, build-ui, write-human).");
  }
}

main();

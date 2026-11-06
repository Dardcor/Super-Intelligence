// Test for the npm package (package.json + bin/super-intelligence.js).
// Cross-platform (Node stdlib only) so it also runs on Windows:
//   node scripts/check-npm-package.js
// Checks: pack contents, install twice into a fake HOME (idempotent,
// 5 targets, no nested copies), --list, --dry-run, --agent, --project.
// Exit code: 0 = pass, non-zero = fail.
"use strict";

const { execFileSync, spawnSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const REPO_DIR = path.join(__dirname, "..");
const BIN = path.join(REPO_DIR, "bin", "super-intelligence.js");
const PKG = JSON.parse(fs.readFileSync(path.join(REPO_DIR, "package.json"), "utf8"));

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

function countFiles(dir) {
  let n = 0;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    n += e.isDirectory() ? countFiles(p) : 1;
  }
  return n;
}

function skillNames() {
  return fs
    .readdirSync(path.join(REPO_DIR, "skills"), { withFileTypes: true })
    .filter((e) => e.isDirectory() && fs.existsSync(path.join(REPO_DIR, "skills", e.name, "SKILL.md")))
    .map((e) => e.name)
    .sort();
}

function runBin(args, env) {
  const r = spawnSync(process.execPath, [BIN, ...args], { encoding: "utf8", env: { ...process.env, ...env } });
  if (r.status !== 0) fail(`bin ${args.join(" ")} exited ${r.status}: ${(r.stderr || r.stdout || "").trim()}`);
  return r.stdout;
}

// 1. package.json sanity
if (PKG.name !== "super-intelligence") fail(`package name is ${PKG.name}, expected super-intelligence`);
if (!PKG.bin || PKG.bin["super-intelligence"] !== "./bin/super-intelligence.js") fail("bin entry missing or wrong");
if (PKG.version !== "0.1.0") fail(`package version is ${PKG.version}, expected 0.1.0`);
console.log(`package ${PKG.name}@${PKG.version} OK`);

// 2. pack contents: skills + bin must ship, repo internals must not
// (npm pack --dry-run prints the file list to stderr, so read both streams)
const packRun = spawnSync("npm", ["pack", "--dry-run"], { cwd: REPO_DIR, encoding: "utf8" });
if (packRun.status !== 0) fail(`npm pack --dry-run failed: ${(packRun.stderr || "").trim()}`);
const pack = (packRun.stdout || "") + (packRun.stderr || "");
const has = (s) => pack.includes(s);
if (!has("skills/super-intelligence/SKILL.md")) fail("pack is missing skills/");
if (!has("bin/super-intelligence.js")) fail("pack is missing bin/");
if (has(".github/workflows/check.yml")) fail("pack must not include the CI workflow");
if (has("PLAN.md")) fail("pack must not include PLAN.md");
if (has("scripts/install.sh")) fail("pack must not include install scripts (they are not part of the npm package)");
console.log("pack contents OK (skills + bin ship, repo internals excluded)");

// 3. install twice into a fake HOME: idempotent, 5 targets, no nesting
const SKILLS = skillNames();
if (SKILLS.length !== 8) fail(`expected 8 skills, found ${SKILLS.length}: ${SKILLS.join(", ")}`);
const SRC_FILES = countFiles(path.join(REPO_DIR, "skills"));
const EXPECTED = SRC_FILES * 5;
const TARGETS = [
  ".agents/skills",
  ".claude/skills",
  path.join(".config", "opencode", "skills"),
  path.join(".gemini", "antigravity", "skills"),
  path.join(".gemini", "config", "skills"),
];

const fakeHome = fs.mkdtempSync(path.join(os.tmpdir(), "si-test-"));
try {
  const env = { HOME: fakeHome, USERPROFILE: fakeHome };
  runBin([], env);
  const c1 = countFiles(fakeHome);
  runBin([], env);
  const c2 = countFiles(fakeHome);
  if (c1 !== c2) fail(`file count changed after reinstall (run 1: ${c1}, run 2: ${c2})`);
  if (c2 !== EXPECTED) fail(`file count ${c2} != expected ${EXPECTED} (${SRC_FILES} source files x 5 targets)`);
  for (const t of TARGETS) {
    for (const s of SKILLS) {
      const dest = path.join(fakeHome, t, s);
      if (fs.existsSync(path.join(dest, s))) fail(`nested copy found: ${path.join(dest, s)}`);
      if (!fs.existsSync(path.join(dest, "SKILL.md"))) fail(`SKILL.md missing at ${dest}`);
    }
    console.log(`OK ${t} (all skills present, no nested copies)`);
  }
  console.log(`PASS install is idempotent (${c2} files, 5 targets)`);

  // 4. --list prints all skills
  const list = runBin(["--list"], env);
  for (const s of SKILLS) if (!list.includes(s)) fail(`--list is missing ${s}`);
  console.log("OK --list");

  // 5. --dry-run changes nothing
  const before = countFiles(fakeHome);
  runBin(["--dry-run"], env);
  if (countFiles(fakeHome) !== before) fail("--dry-run changed files");
  console.log("OK --dry-run");

  // 6. --agent codex writes only the shared hub
  const fakeHome2 = fs.mkdtempSync(path.join(os.tmpdir(), "si-test-agent-"));
  try {
    runBin(["--agent", "codex"], { HOME: fakeHome2, USERPROFILE: fakeHome2 });
    if (!fs.existsSync(path.join(fakeHome2, ".agents", "skills", "super-intelligence", "SKILL.md"))) {
      fail("--agent codex did not install to .agents/skills");
    }
    if (fs.existsSync(path.join(fakeHome2, ".claude"))) fail("--agent codex also wrote to .claude/skills");
    console.log("OK --agent codex");
  } finally {
    fs.rmSync(fakeHome2, { recursive: true, force: true });
  }

  // 7. --project installs into the working directory
  const proj = fs.mkdtempSync(path.join(os.tmpdir(), "si-test-proj-"));
  try {
    const r = spawnSync(process.execPath, [BIN, "--project"], {
      cwd: proj,
      encoding: "utf8",
      env: { ...process.env, HOME: fakeHome, USERPROFILE: fakeHome },
    });
    if (r.status !== 0) fail(`--project exited ${r.status}: ${(r.stderr || "").trim()}`);
    if (!fs.existsSync(path.join(proj, ".agents", "skills", "super-intelligence", "SKILL.md"))) {
      fail("--project did not install to ./.agents/skills");
    }
    console.log("OK --project");
  } finally {
    fs.rmSync(proj, { recursive: true, force: true });
  }
} finally {
  fs.rmSync(fakeHome, { recursive: true, force: true });
}

console.log("PASS: npm package checks passed");

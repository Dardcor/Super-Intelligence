# Install Super-Intelligence skill to every agent tool found on this machine (Windows).
# Usage: powershell -ExecutionPolicy Bypass -File scripts/install.ps1
# The skill itself lives in skills/super-intelligence/ — this script only copies it.
$ErrorActionPreference = "Stop"
$RepoDir = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Src = Join-Path $RepoDir "skills\super-intelligence"
if (-not (Test-Path (Join-Path $Src "SKILL.md"))) {
  throw "SKILL.md not found at $Src"
}
function Install-To($Dest) {
  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $Dest) | Out-Null
  if (Test-Path $Dest) { Remove-Item -Recurse -Force $Dest }
  Copy-Item -Recurse $Src $Dest
  Write-Host "installed -> $Dest"
}
# Shared Agent Skills hub — read by Codex, OpenCode, Cursor, Copilot, and others.
Install-To (Join-Path $env:USERPROFILE ".agents\skills\super-intelligence")
# Claude Code
Install-To (Join-Path $env:USERPROFILE ".claude\skills\super-intelligence")
# OpenCode
Install-To (Join-Path $env:USERPROFILE ".config\opencode\skills\super-intelligence")
# Antigravity (global)
Install-To (Join-Path $env:USERPROFILE ".gemini\antigravity\skills\super-intelligence")
Write-Host "Done. Start a new session in your agent tool to load the skill."

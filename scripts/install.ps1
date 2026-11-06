# Install all Super-Intelligence skills to every agent tool found on this machine (Windows).
# Usage: powershell -ExecutionPolicy Bypass -File scripts/install.ps1
# The skills live in skills/ — this script only copies them.
$ErrorActionPreference = "Stop"
$RepoDir = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$SkillsDir = Join-Path $RepoDir "skills"
# Home directory on every OS: Windows uses USERPROFILE, macOS/Linux use HOME.
# (PowerShell 7 also runs on macOS/Linux, where USERPROFILE is empty.)
$HomeDir = if ($env:USERPROFILE) { $env:USERPROFILE } elseif ($env:HOME) { $env:HOME } else { $HOME }
if (-not $HomeDir) { throw "Could not determine the home directory (no USERPROFILE or HOME)." }
if (-not (Test-Path $SkillsDir)) {
  throw "skills folder not found at $SkillsDir"
}
function Install-To($Src, $Dest) {
  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $Dest) | Out-Null
  if (Test-Path $Dest) { Remove-Item -Recurse -Force $Dest }
  Copy-Item -Recurse $Src $Dest
  Write-Host "installed -> $Dest"
}
function Install-AllTo($Base) {
  foreach ($Dir in Get-ChildItem -Directory $SkillsDir) {
    if (-not (Test-Path (Join-Path $Dir.FullName "SKILL.md"))) { continue }
    Install-To $Dir.FullName (Join-Path $Base $Dir.Name)
  }
}
# Shared Agent Skills hub — read by Codex, OpenCode, Cursor, Copilot, and others.
Install-AllTo (Join-Path $HomeDir ".agents\skills")
# Claude Code
Install-AllTo (Join-Path $HomeDir ".claude\skills")
# OpenCode
Install-AllTo (Join-Path $HomeDir ".config\opencode\skills")
# Antigravity (global, IDE path)
Install-AllTo (Join-Path $HomeDir ".gemini\antigravity\skills")
# Antigravity (global, app path — the IDE path alone is not read
# by the Antigravity app; see references/compatibility.md)
Install-AllTo (Join-Path $HomeDir ".gemini\config\skills")
Write-Host "Done. Start a new session in your agent tool to load the skills."

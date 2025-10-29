# PowerShell script to push code to GitHub
# Run this AFTER reopening your terminal

Write-Host "=== Pushing Team Leave Calendar to GitHub ===" -ForegroundColor Cyan

# Check if git is available
try {
    git --version | Out-Null
    Write-Host "✓ Git is available" -ForegroundColor Green
} catch {
    Write-Host "✗ Git is not available. Please restart your terminal and try again." -ForegroundColor Red
    exit 1
}

# Initialize git if needed
if (Test-Path .git) {
    Write-Host "Git repository already initialized" -ForegroundColor Yellow
} else {
    git init
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
}

# Add all files
git add .
Write-Host "✓ Files added to staging" -ForegroundColor Green

# Check if we have uncommitted changes
$status = git status --porcelain
if ($status) {
    git commit -m "Initial commit: Team Leave Calendar with CSV export feature"
    Write-Host "✓ Changes committed" -ForegroundColor Green
} else {
    Write-Host "No changes to commit" -ForegroundColor Yellow
}

# Add remote if not exists
$remotes = git remote
if ($remotes -notcontains "origin") {
    git remote add origin https://github.com/rasindu-at-tally/Tally.mvp.team-leave-calendar.git
    Write-Host "✓ Remote added" -ForegroundColor Green
} else {
    Write-Host "Remote already exists" -ForegroundColor Yellow
}

# Push to GitHub
Write-Host "`nPushing to GitHub..." -ForegroundColor Cyan
git branch -M main
git push -u origin main

Write-Host "`n=== Done! ===" -ForegroundColor Green
Write-Host "Your code has been pushed to:" -ForegroundColor Cyan
Write-Host "https://github.com/rasindu-at-tally/Tally.mvp.team-leave-calendar" -ForegroundColor Cyan


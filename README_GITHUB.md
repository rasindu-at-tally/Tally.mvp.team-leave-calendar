# Quick Start Guide - Push to GitHub

## What Was Installed
- ✅ Git (Git for Windows 2.51.1)
- ✅ React project files created
- ✅ Python Flask server for CSV export

## To Push to GitHub:

### Option 1: Use the Automated Script (Recommended)
1. **Close this PowerShell window**
2. **Open a NEW PowerShell terminal**
3. Navigate to the project:
   ```powershell
   cd C:\Users\RashiBudhiraja\team-leave-calendar
   ```
4. Run the script:
   ```powershell
   .\push-to-github.ps1
   ```

### Option 2: Manual Commands
After opening a NEW terminal, run:

```powershell
cd C:\Users\RashiBudhiraja\team-leave-calendar
git init
git add .
git commit -m "Initial commit: Team Leave Calendar with CSV export"
git remote add origin https://github.com/rasindu-at-tally/Tally.mvp.team-leave-calendar.git
git branch -M main
git push -u origin main
```

## Important Notes
- **Restart required**: You MUST close and reopen your terminal for Git to work
- **Authentication**: GitHub may ask for credentials the first time
- The push will include:
  - HTML/JS application
  - React application (ready for npm install)
  - Python Flask server for CSV export
  - All configuration files


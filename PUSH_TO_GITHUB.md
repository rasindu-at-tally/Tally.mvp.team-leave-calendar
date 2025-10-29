# Instructions to Push Code to GitHub

## Step 1: Close and Reopen Your Terminal/PowerShell
The Git installation requires a terminal restart to be available in PATH.

## Step 2: Navigate to Project Directory
```bash
cd C:\Users\RashiBudhiraja\team-leave-calendar
```

## Step 3: Initialize Git and Push to GitHub
Run these commands in your terminal:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Team Leave Calendar with CSV export feature"

# Add remote repository
git remote add origin https://github.com/rasindu-at-tally/Tally.mvp.team-leave-calendar.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Alternative: Use GitHub Desktop (Easier)
If you prefer a GUI:
1. Download GitHub Desktop from https://desktop.github.com/
2. Open the project folder
3. Click "Publish repository" button
4. Select the repository: `rasindu-at-tally/Tally.mvp.team-leave-calendar`
5. Click "Publish"

## What to Include
Make sure these files are committed:
- ✅ All source files (.html, .js, .css, .py, .json)
- ✅ React files in `src/` folder
- ✅ Configuration files (package.json, requirements.txt, .gitignore)
- ❌ Don't commit: node_modules/, __pycache__/, build/


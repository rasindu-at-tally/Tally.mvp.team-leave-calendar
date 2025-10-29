# Team Leave Calendar - Python GUI Application

## Quick Start

### Installation
```bash
pip install openpyxl
```

### Run Application
```bash
python leave_calendar.py
```

## Features

- **Calendar View**: Visual monthly calendar with public holiday highlights
- **List View**: Sortable table with all leave entries
- **Employee Filter**: Filter by specific employee
- **Add/Edit/Delete**: Full CRUD operations for leave management
- **Christmas Availability**: Track availability during Christmas shutdown
- **Public Holidays**: Highlights for NZ, AU, VN, and India
- **Working Days**: Duration excludes weekends and public holidays
- **Excel Export**: Export to .xlsx format

## Date Format
Enter dates as YYYY-MM-DD (e.g., 2024-12-25)

## Data Storage
All data saved to `team_leaves.json` in the same directory.

## Keyboard Shortcuts
- Calendar View: Click "Calendar View" button
- List View: Click "List View" button  
- Navigate: Use Previous/Next buttons (2024-2028 only)

## Notes
- Python 3.7+ required
- tkinter usually comes pre-installed with Python
- openpyxl needed for Excel export
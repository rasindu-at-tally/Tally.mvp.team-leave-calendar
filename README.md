# Team Leave Calendar

A web-based application for tracking team members' planned and tentative annual leaves from 2024 to December 2028.

## Features

- Add, edit, and delete leave entries
- Quick right-click cancel: Right-click on any leave entry to cancel it
- Track leave types: Planned or Tentative
- **Public Holiday Highlights**: Automatic highlighting of public holidays for 4 countries
  - New Zealand (light blue), Australia (light green), Vietnam (light yellow), India (light pink)
- Calendar View: Month-by-month grid view showing all team members
- List View: Sortable table with filtering capabilities
- **CSV Export**: Export data with Python Flask backend
  - Format: Resource column + dates as columns (DD-Mon format)
  - Indicators: P for planned, T for tentative
- Data Persistence: All data is stored in browser localStorage
- **React Conversion**: Full React application available in `src/` folder

## Getting Started

### HTML/JavaScript Version (Quick Start)
1. Open `index.html` in any modern web browser
2. No server or installation required - works offline!

### React Version
1. Install Node.js (if not already installed)
2. Run `npm install`
3. Run `npm start`
4. Open http://localhost:3000

### CSV Export Setup
1. Install Python dependencies: `pip install -r requirements.txt`
2. Start Flask server: `python leave_calendar_app.py`
3. Click "Export to Excel" button in the app

## How to Use

### Adding a Leave Entry

1. Fill in the form at the top:
   - Enter team member name
   - Select leave type (Planned or Tentative)
   - Choose start and end dates
   - (Optional) Add reason or notes
   - Check if available during Christmas shutdown
2. Click "Add Leave"

### Viewing Leaves

**Calendar View:**
- Navigate months using "Previous" and "Next" buttons
- Calendar shows all team members with colored indicators for planned (blue) and tentative (yellow) leaves
- **Public holidays highlighted**: 
  - Light blue border = New Zealand holidays
  - Light green border = Australia holidays
  - Light yellow border = Vietnam holidays
  - Light pink border = India holidays
- **Left-click** on any leave entry to edit it
- **Right-click** on any leave entry to cancel/delete it
- Today's date is highlighted in yellow

**List View:**
- Filter by name, type, or date range
- View duration and details for each leave entry
- Edit or delete entries using action buttons
- **Right-click** on any row to quickly cancel/delete a leave entry

### Exporting to CSV

Click the "Export to Excel" button to download a CSV file:
- **Format**: Resource (team member names) in column A, dates (DD-Mon format) in subsequent columns
- **Indicators**: P for planned leave, T for tentative leave
- **Requirements**: Python Flask server must be running on http://localhost:5000

## Technical Details

- Pure HTML/CSS/JavaScript - no framework dependencies (for HTML version)
- React 18.2.0 (for React version in `src/` folder)
- Python Flask server for CSV export functionality
- Responsive design works on desktop and mobile devices
- Data stored in browser localStorage
- Date range: 2024 through December 2028

## Browser Compatibility

Works best in modern browsers (Chrome, Firefox, Edge, Safari).

## Notes

- Data is stored locally in your browser
- Clearing browser data will remove all leave entries
- Consider backing up data by exporting to CSV regularly

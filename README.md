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
- Excel Export: Export data in two formats:
  - Leave List (tabular format with all entry details)
  - Calendar Grid (dates as columns, names as rows)
- Data Persistence: All data is stored in browser localStorage

## Getting Started

1. Open `index.html` in any modern web browser
2. No server or installation required - works offline!

## How to Use

### Adding a Leave Entry

1. Fill in the form at the top:
   - Enter team member name
   - Select leave type (Planned or Tentative)
   - Choose start and end dates
   - (Optional) Add reason or notes
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

### Editing or Deleting

- **Left-click** on a leave entry in calendar view to edit
- **Right-click** on a leave entry in either view to cancel/delete it
- Or use Edit/Delete buttons in list view
- Confirm deletion when prompted

### Exporting to Excel

Click the "Export to Excel" button to download a file with two sheets:
- **Leave List**: Complete list of all entries with details
- **Calendar Grid**: Grid format showing leave dates for each team member

## Technical Details

- Pure HTML/CSS/JavaScript - no framework dependencies
- Uses SheetJS library (via CDN) for Excel export functionality
- Responsive design works on desktop and mobile devices
- Data stored in browser localStorage
- Date range: 2024 through December 2028

## Browser Compatibility

Works best in modern browsers (Chrome, Firefox, Edge, Safari).

## Notes

- Data is stored locally in your browser
- Clearing browser data will remove all leave entries
- Consider backing up data by exporting to Excel regularly

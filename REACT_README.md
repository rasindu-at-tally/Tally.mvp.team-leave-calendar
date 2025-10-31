# React Application - Quick Start Guide

## ✅ Your React Frontend is Ready!

The complete React application has been converted from the HTML/JavaScript version and is located in the `src/` folder.

## 🚀 Running the React App

### Prerequisites
- Node.js (v14 or higher) - [Download here](https://nodejs.org/)

### Installation & Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   - The app will automatically open at http://localhost:3000
   - Or manually navigate to that URL

## 📁 Project Structure

```
src/
├── App.jsx              # Main application component
├── App.css              # Styles (copied from styles.css)
├── index.js             # React entry point
├── components/
│   ├── LeaveForm.jsx    # Form to add new leave entries
│   ├── CalendarView.jsx # Calendar month view
│   ├── ListView.jsx     # List/table view with filters
│   ├── Controls.jsx     # View switcher and filters
│   ├── EditModal.jsx    # Modal to edit leave entries
│   └── ExportButton.jsx # CSV export functionality
└── utils/
    ├── constants.js      # Public holidays data
    └── helpers.js        # Utility functions
```

## ✨ Features (All Converted to React)

✅ **Add/Edit/Delete Leave Entries** - Fully functional  
✅ **Calendar View** - Month navigation with holiday highlighting  
✅ **List View** - Sortable table with filters  
✅ **Employee Filtering** - Filter by team member  
✅ **CSV Export** - With Python Flask backend integration  
✅ **Public Holidays** - 4 countries (NZ, AU, VN, IN)  
✅ **Responsive Design** - Works on all devices  
✅ **LocalStorage** - Data persistence  
✅ **Right-click Delete** - Quick cancel feature  

## 🔧 Development Commands

```bash
# Start development server (with hot reload)
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (not recommended)
npm run eject
```

## 🌐 Running with Flask Backend

For CSV export to work:

1. **Start Flask server** (in a separate terminal):
   ```bash
   python leave_calendar_app.py
   ```

2. **Start React app**:
   ```bash
   npm start
   ```

3. Both will run simultaneously:
   - React: http://localhost:3000
   - Flask: http://localhost:5000

## 🎨 Styling

All styles from the original HTML version are preserved in `src/App.css`. The UI looks and functions exactly the same!

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder that can be deployed to any static hosting service.

## 🔄 Differences from HTML Version

- **Component-based**: Code is organized into reusable React components
- **State Management**: Uses React hooks (useState, useEffect)
- **Better Performance**: React's virtual DOM for efficient updates
- **Hot Reload**: Changes reflect immediately during development
- **Same Functionality**: All features work exactly the same!

## 🐛 Troubleshooting

**Port 3000 already in use?**
```bash
# Use a different port
PORT=3001 npm start
```

**Module not found errors?**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📝 Notes

- Data still uses localStorage (same as HTML version)
- Can share data between HTML and React versions (same localStorage key)
- All original functionality preserved
- Same design and user experience


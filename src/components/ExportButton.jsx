import React, { useState } from 'react';

const ExportButton = ({ leaves }) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToCSV = async () => {
    if (!leaves || leaves.length === 0) {
      alert('No leave entries to export!');
      return;
    }

    setIsExporting(true);
    
    try {
      // Ensure we have the correct data structure
      const leavesData = leaves.map(leave => ({
        name: leave.name || '',
        startDate: leave.startDate || '',
        endDate: leave.endDate || '',
        leaveType: leave.leaveType || 'planned'
      }));

      const response = await fetch('http://localhost:5000/export-csv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leaves: leavesData })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error:', errorText);
        throw new Error(`Export failed: ${response.status} ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Team_Leaves_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      alert(`Successfully exported ${leaves.length} leave entries!`);
      
    } catch (error) {
      console.error('Export error:', error);
      if (error.message && error.message.includes('fetch')) {
        alert('Cannot connect to export server. Please make sure the Python Flask server is running:\n\npython leave_calendar_app.py\n\nThe server should be running on http://localhost:5000');
      } else {
        alert(`Error exporting to CSV: ${error.message}\n\nPlease make sure the Python server is running (python leave_calendar_app.py)`);
      }
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button 
      className="btn btn-success" 
      onClick={exportToCSV}
      disabled={isExporting}
    >
      {isExporting && <span className="spinner"></span>}
      {isExporting ? 'Exporting...' : 'Export to Excel'}
    </button>
  );
};

export default ExportButton;


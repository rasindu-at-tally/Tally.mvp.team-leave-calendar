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
      const response = await fetch('http://localhost:5000/export-csv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leaves })
      });

      if (!response.ok) {
        throw new Error('Export failed');
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
      alert('Error exporting to CSV. Please make sure the Python server is running (python leave_calendar_app.py)');
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


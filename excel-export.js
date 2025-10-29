function isWithinChristmasShutdown(startDate, endDate) {
    const shutdownStart = '2025-12-22';
    const shutdownEnd = '2026-01-09';
    return startDate <= shutdownEnd && endDate >= shutdownStart;
}

function getChristmasAvailabilityDisplay(leave) {
    if (!isWithinChristmasShutdown(leave.startDate, leave.endDate)) {
        return 'N/A';
    }
    return leave.christmasAvailable ? 'Yes' : 'No';
}

function calculateWorkingDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    let workingDays = 0;
    const currentDate = new Date(start);
    
    while (currentDate <= end) {
        const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 6 = Saturday
        const dateStr = currentDate.toISOString().split('T')[0];
        
        // Check if it's not a weekend
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        
        // Check if it's not a public holiday (from all countries)
        const isHoliday = window.publicHolidays && (
            window.publicHolidays.NZ?.[dateStr] ||
            window.publicHolidays.AU?.[dateStr] ||
            window.publicHolidays.VN?.[dateStr] ||
            window.publicHolidays.IN?.[dateStr]
        );
        
        // Count only working days
        if (!isWeekend && !isHoliday) {
            workingDays++;
        }
        
        // Move to next day
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return workingDays;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('exportBtn').addEventListener('click', exportToCSV);
});

async function exportToCSV() {
    if (!leaveApp.leaves || leaveApp.leaves.length === 0) {
        alert('No leave entries to export!');
        return;
    }

    const exportBtn = document.getElementById('exportBtn');
    const originalText = exportBtn.innerHTML;
    
    // Show spinner
    exportBtn.disabled = true;
    exportBtn.innerHTML = '<span class="spinner"></span> Exporting...';
    
    try {
        // Send leave data to Python backend
        const response = await fetch('http://localhost:5000/export-csv', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ leaves: leaveApp.leaves })
        });

        if (!response.ok) {
            throw new Error('Export failed');
        }

        // Get the CSV blob
        const blob = await response.blob();
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Team_Leaves_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        // Success message
        alert(`Successfully exported ${leaveApp.leaves.length} leave entries!`);
        
    } catch (error) {
        console.error('Export error:', error);
        alert('Error exporting to CSV. Please make sure the Python server is running (python leave_calendar_app.py)');
    } finally {
        // Restore button
        exportBtn.disabled = false;
        exportBtn.innerHTML = originalText;
    }
}

function formatExcelDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US');
}

function createCalendarGrid() {
    if (!leaveApp.leaves || leaveApp.leaves.length === 0) {
        return [];
    }

    const members = [...new Set(leaveApp.leaves.map(leave => leave.name))].sort();
    
    // Generate all dates from today until March 2026
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endDate = new Date(2026, 2, 31); // March 31, 2026 (month is 0-indexed)
    
    const allDates = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday or Saturday
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;
            allDates.push(dateStr);
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Format dates for display (DD-Mon format like "29-Oct")
    const formatDateDisplay = (dateStr) => {
        const date = new Date(dateStr + 'T00:00:00');
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const day = String(date.getDate()).padStart(2, '0');
        const month = months[date.getMonth()];
        return `${day}-${month}`;
    };
    
    // Create header row: "Resource" in A1, then date headers
    const header = ['Resource', ...allDates.map(date => formatDateDisplay(date))];
    const grid = [header];

    // Add data rows for each member
    members.forEach(member => {
        const row = [member];
        
        // For each date, check if this member has leave
        allDates.forEach(date => {
            // Get all leaves for this member
            const memberLeaves = leaveApp.leaves.filter(l => l.name === member);
            
            // Convert date string to Date object for proper comparison
            const currentDate = new Date(date + 'T00:00:00');
            
            // Find if there's a leave that covers this date
            const leave = memberLeaves.find(l => {
                const leaveStart = new Date(l.startDate + 'T00:00:00');
                const leaveEnd = new Date(l.endDate + 'T00:00:00');
                return currentDate >= leaveStart && currentDate <= leaveEnd;
            });
            
            if (leave) {
                // Use 'P' for planned, 'T' for tentative
                const indicator = leave.leaveType === 'planned' ? 'P' : 'T';
                row.push(indicator);
            } else {
                row.push('');
            }
        });
        grid.push(row);
    });

    return grid;
}

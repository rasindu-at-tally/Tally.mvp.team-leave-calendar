// Public holidays data for 2024-2028
const publicHolidays = {
    'NZ': {
        // New Zealand Public Holidays (fixed dates)
        '2024-01-01': 'New Year',
        '2024-01-02': 'Day after New Year',
        '2024-02-06': 'Waitangi Day',
        '2024-04-25': 'ANZAC Day',
        '2024-06-03': "Queen's Birthday",
        '2024-10-28': 'Labour Day',
        '2024-12-25': 'Christmas',
        '2024-12-26': 'Boxing Day',
        '2025-01-01': 'New Year',
        '2025-01-02': 'Day after New Year',
        '2025-02-06': 'Waitangi Day',
        '2025-04-25': 'ANZAC Day',
        '2025-06-02': "Queen's Birthday",
        '2025-10-27': 'Labour Day',
        '2025-12-25': 'Christmas',
        '2025-12-26': 'Boxing Day',
        '2026-01-01': 'New Year',
        '2026-01-02': 'Day after New Year',
        '2026-02-06': 'Waitangi Day',
        '2026-04-25': 'ANZAC Day',
        '2026-06-01': "Queen's Birthday",
        '2026-10-26': 'Labour Day',
        '2026-12-25': 'Christmas',
        '2026-12-26': 'Boxing Day',
        '2027-01-01': 'New Year',
        '2027-01-02': 'Day after New Year',
        '2027-02-06': 'Waitangi Day',
        '2027-04-25': 'ANZAC Day',
        '2027-06-07': "Queen's Birthday",
        '2027-10-25': 'Labour Day',
        '2027-12-25': 'Christmas',
        '2027-12-26': 'Boxing Day',
        '2028-01-01': 'New Year',
        '2028-01-02': 'Day after New Year',
        '2028-02-06': 'Waitangi Day',
        '2028-04-25': 'ANZAC Day',
        '2028-06-05': "Queen's Birthday",
        '2028-10-23': 'Labour Day',
        '2028-12-25': 'Christmas',
        '2028-12-26': 'Boxing Day'
    },
    'AU': {
        // Australia Public Holidays
        '2024-01-01': 'New Year',
        '2024-01-26': 'Australia Day',
        '2024-03-29': 'Good Friday',
        '2024-04-01': 'Easter Monday',
        '2024-04-25': 'ANZAC Day',
        '2024-06-10': "Queen's Birthday",
        '2024-10-07': 'Labour Day',
        '2024-12-25': 'Christmas',
        '2024-12-26': 'Boxing Day',
        '2025-01-01': 'New Year',
        '2025-01-26': 'Australia Day',
        '2025-04-18': 'Good Friday',
        '2025-04-21': 'Easter Monday',
        '2025-04-25': 'ANZAC Day',
        '2025-06-09': "Queen's Birthday",
        '2025-10-06': 'Labour Day',
        '2025-12-25': 'Christmas',
        '2025-12-26': 'Boxing Day',
        '2026-01-01': 'New Year',
        '2026-01-26': 'Australia Day',
        '2026-04-03': 'Good Friday',
        '2026-04-06': 'Easter Monday',
        '2026-04-25': 'ANZAC Day',
        '2026-06-08': "Queen's Birthday",
        '2026-10-05': 'Labour Day',
        '2026-12-25': 'Christmas',
        '2026-12-26': 'Boxing Day',
        '2027-01-01': 'New Year',
        '2027-01-26': 'Australia Day',
        '2027-03-26': 'Good Friday',
        '2027-03-29': 'Easter Monday',
        '2027-04-25': 'ANZAC Day',
        '2027-06-14': "Queen's Birthday",
        '2027-10-04': 'Labour Day',
        '2027-12-25': 'Christmas',
        '2027-12-26': 'Boxing Day',
        '2028-01-01': 'New Year',
        '2028-01-26': 'Australia Day',
        '2028-04-14': 'Good Friday',
        '2028-04-17': 'Easter Monday',
        '2028-04-25': 'ANZAC Day',
        '2028-06-12': "Queen's Birthday",
        '2028-10-02': 'Labour Day',
        '2028-12-25': 'Christmas',
        '2028-12-26': 'Boxing Day'
    },
    'VN': {
        // Vietnam Public Holidays
        '2024-01-01': 'New Year',
        '2024-02-10': 'Tet Holiday',
        '2024-02-11': 'Tet Holiday',
        '2024-02-12': 'Tet Holiday',
        '2024-02-13': 'Tet Holiday',
        '2024-02-14': 'Tet Holiday',
        '2024-04-30': 'Liberation Day',
        '2024-05-01': 'Labour Day',
        '2024-09-02': 'National Day',
        '2024-09-03': 'National Day',
        '2024-12-31': 'New Year Eve',
        '2025-01-01': 'New Year',
        '2025-01-29': 'Tet Holiday',
        '2025-01-30': 'Tet Holiday',
        '2025-01-31': 'Tet Holiday',
        '2025-02-01': 'Tet Holiday',
        '2025-02-02': 'Tet Holiday',
        '2025-04-30': 'Liberation Day',
        '2025-05-01': 'Labour Day',
        '2025-09-02': 'National Day',
        '2025-09-03': 'National Day',
        '2025-12-31': 'New Year Eve',
        '2026-01-01': 'New Year',
        '2026-02-17': 'Tet Holiday',
        '2026-02-18': 'Tet Holiday',
        '2026-02-19': 'Tet Holiday',
        '2026-02-20': 'Tet Holiday',
        '2026-02-21': 'Tet Holiday',
        '2026-04-30': 'Liberation Day',
        '2026-05-01': 'Labour Day',
        '2026-09-02': 'National Day',
        '2026-09-03': 'National Day',
        '2026-12-31': 'New Year Eve',
        '2027-01-01': 'New Year',
        '2027-02-06': 'Tet Holiday',
        '2027-02-07': 'Tet Holiday',
        '2027-02-08': 'Tet Holiday',
        '2027-02-09': 'Tet Holiday',
        '2027-02-10': 'Tet Holiday',
        '2027-04-30': 'Liberation Day',
        '2027-05-01': 'Labour Day',
        '2027-09-02': 'National Day',
        '2027-09-03': 'National Day',
        '2027-12-31': 'New Year Eve',
        '2028-01-01': 'New Year',
        '2028-01-27': 'Tet Holiday',
        '2028-01-28': 'Tet Holiday',
        '2028-01-29': 'Tet Holiday',
        '2028-01-30': 'Tet Holiday',
        '2028-01-31': 'Tet Holiday',
        '2028-04-30': 'Liberation Day',
        '2028-05-01': 'Labour Day',
        '2028-09-02': 'National Day',
        '2028-09-03': 'National Day',
        '2028-12-31': 'New Year Eve'
    },
    'IN': {
        // India Public Holidays (major ones)
        '2024-01-26': 'Republic Day',
        '2024-08-15': 'Independence Day',
        '2024-10-02': 'Gandhi Jayanti',
        '2024-11-14': "Children's Day",
        '2024-12-25': 'Christmas',
        '2025-01-26': 'Republic Day',
        '2025-08-15': 'Independence Day',
        '2025-10-02': 'Gandhi Jayanti',
        '2025-11-14': "Children's Day",
        '2025-12-25': 'Christmas',
        '2026-01-26': 'Republic Day',
        '2026-08-15': 'Independence Day',
        '2026-10-02': 'Gandhi Jayanti',
        '2026-11-14': "Children's Day",
        '2026-12-25': 'Christmas',
        '2027-01-26': 'Republic Day',
        '2027-08-15': 'Independence Day',
        '2027-10-02': 'Gandhi Jayanti',
        '2027-11-14': "Children's Day",
        '2027-12-25': 'Christmas',
        '2028-01-26': 'Republic Day',
        '2028-08-15': 'Independence Day',
        '2028-10-02': 'Gandhi Jayanti',
        '2028-11-14': "Children's Day",
        '2028-12-25': 'Christmas'
    }
};

function getHoliday(dateStr) {
    for (const country in publicHolidays) {
        if (publicHolidays[country][dateStr]) {
            return { country, name: publicHolidays[country][dateStr] };
        }
    }
    return null;
}

function renderCalendarView() {
    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = '';

    const month = leaveApp.currentMonth;
    const year = leaveApp.currentYear;
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-day-header';
        header.textContent = day;
        calendarGrid.appendChild(header);
    });

    for (let i = 0; i < firstDay; i++) {
        calendarGrid.appendChild(document.createElement('div'));
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement('div');
        cell.className = 'calendar-cell';
        
        const currentDate = new Date(year, month, day);
        const isToday = currentDate.toDateString() === today.toDateString();
        
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const holiday = getHoliday(dateStr);
        
        if (isToday) {
            cell.classList.add('today');
        }
        
        // Add holiday highlighting
        if (holiday) {
            cell.classList.add(`holiday-${holiday.country}`);
            if (!cell.title) cell.title = holiday.name;
        }

        const dateDiv = document.createElement('div');
        dateDiv.className = 'calendar-date';
        dateDiv.textContent = day;
        cell.appendChild(dateDiv);

        const leavesForDay = getLeavesForDate(dateStr);

        leavesForDay.forEach(leave => {
            const leaveItem = document.createElement('div');
            leaveItem.className = `leave-item ${leave.leaveType}`;
            leaveItem.textContent = leave.name;
            leaveItem.title = `${leave.name} - ${leave.leaveType}${leave.reason ? ': ' + leave.reason : ''} (Left-click to edit, Right-click to cancel)`;
            
            // Left click to edit
            leaveItem.addEventListener('click', (e) => {
                e.stopPropagation();
                leaveApp.editLeave(leave.id);
            });
            
            // Right click to cancel/delete
            leaveItem.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (confirm(`Cancel leave for ${leave.name}?`)) {
                    leaveApp.deleteLeave(leave.id);
                }
            });
            
            cell.appendChild(leaveItem);
        });

        calendarGrid.appendChild(cell);
    }
}

function getLeavesForDate(dateStr) {
    return leaveApp.leaves.filter(leave => {
        return dateStr >= leave.startDate && dateStr <= leave.endDate;
    });
}

window.renderCalendarView = renderCalendarView;
window.getLeavesForDate = getLeavesForDate;
window.publicHolidays = publicHolidays;

window.addEventListener('DOMContentLoaded', () => {
    if (window.leaveApp) {
        leaveApp.renderCalendarView = renderCalendarView;
    }
});

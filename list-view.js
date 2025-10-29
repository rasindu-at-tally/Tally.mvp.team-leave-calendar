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

function renderListView() {
    const table = document.getElementById('listTable');
    table.innerHTML = '';

    const filterName = document.getElementById('filterName').value.toLowerCase();
    const filterType = document.getElementById('filterType').value;
    const filterStartDate = document.getElementById('filterStartDate').value;
    const filterEndDate = document.getElementById('filterEndDate').value;

    let filteredLeaves = leaveApp.leaves.filter(leave => {
        if (filterName && !leave.name.toLowerCase().includes(filterName)) {
            return false;
        }
        if (filterType && leave.leaveType !== filterType) {
            return false;
        }
        if (filterStartDate && leave.endDate < filterStartDate) {
            return false;
        }
        if (filterEndDate && leave.startDate > filterEndDate) {
            return false;
        }
        return true;
    });

    if (filteredLeaves.length === 0) {
        table.innerHTML = '<div class="empty-state"><p>No leave entries found</p></div>';
        return;
    }

    filteredLeaves.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

    const tableElement = document.createElement('table');
    
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Name', 'Type', 'Start Date', 'End Date', 'Duration (Working Days)', 'Available during Christmas', 'Reason', 'Actions'];
    
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    tableElement.appendChild(thead);

    const tbody = document.createElement('tbody');
    
    filteredLeaves.forEach(leave => {
        const row = document.createElement('tr');
        row.style.cursor = 'context-menu';
        
        // Right-click to cancel/delete on the entire row
        row.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            if (confirm(`Cancel leave for ${leave.name}?`)) {
                leaveApp.deleteLeave(leave.id);
            }
        });
        
        const nameCell = document.createElement('td');
        nameCell.textContent = leave.name;
        row.appendChild(nameCell);
        
        const typeCell = document.createElement('td');
        const badge = document.createElement('span');
        badge.className = `type-badge type-${leave.leaveType}`;
        badge.textContent = leave.leaveType.charAt(0).toUpperCase() + leave.leaveType.slice(1);
        typeCell.appendChild(badge);
        row.appendChild(typeCell);
        
        const startCell = document.createElement('td');
        startCell.textContent = formatDate(leave.startDate);
        row.appendChild(startCell);
        
        const endCell = document.createElement('td');
        endCell.textContent = formatDate(leave.endDate);
        row.appendChild(endCell);
        
        const durationCell = document.createElement('td');
        durationCell.textContent = calculateDuration(leave.startDate, leave.endDate);
        row.appendChild(durationCell);
        
        const christmasCell = document.createElement('td');
        const christmasValue = getChristmasAvailabilityDisplay(leave);
        christmasCell.textContent = christmasValue;
        christmasCell.style.fontWeight = '600';
        
        if (christmasValue === 'N/A') {
            christmasCell.style.color = '#6c757d'; // Gray for N/A
        } else if (christmasValue === 'Yes') {
            christmasCell.style.color = '#28a745'; // Green for Yes
        } else {
            christmasCell.style.color = '#dc3545'; // Red for No
        }
        
        row.appendChild(christmasCell);
        
        const reasonCell = document.createElement('td');
        reasonCell.textContent = leave.reason || '-';
        row.appendChild(reasonCell);
        
        const actionsCell = document.createElement('td');
        const actionDiv = document.createElement('div');
        actionDiv.className = 'action-buttons';
        
        const editBtn = document.createElement('button');
        editBtn.className = 'action-btn edit';
        editBtn.textContent = 'Edit';
        editBtn.onclick = (e) => {
            e.stopPropagation();
            leaveApp.editLeave(leave.id);
        };
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'action-btn delete';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            leaveApp.deleteLeave(leave.id);
        };
        
        actionDiv.appendChild(editBtn);
        actionDiv.appendChild(deleteBtn);
        actionsCell.appendChild(actionDiv);
        row.appendChild(actionsCell);
        
        tbody.appendChild(row);
    });
    
    tableElement.appendChild(tbody);
    table.appendChild(tableElement);
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function calculateDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Count only working days (exclude weekends and public holidays)
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
    
    return workingDays + (workingDays === 1 ? ' working day' : ' working days');
}

window.renderListView = renderListView;
window.formatDate = formatDate;
window.calculateDuration = calculateDuration;

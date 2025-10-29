class LeaveApp {
    constructor() {
        this.leaves = this.loadLeaves();
        this.currentView = 'calendar';
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.editingId = null;
        this.isProcessing = false;
        this.selectedEmployee = '';
        
        this.init();
    }

    init() {
        const maxDate = '2028-12-31';
        document.getElementById('startDate').max = maxDate;
        document.getElementById('endDate').max = maxDate;
        document.getElementById('filterStartDate').max = maxDate;
        document.getElementById('filterEndDate').max = maxDate;

        document.getElementById('leaveForm').addEventListener('submit', (e) => this.handleAddLeave(e));
        document.getElementById('clearForm').addEventListener('click', () => this.clearForm());

        // Auto-populate end date when start date is entered
        document.getElementById('startDate').addEventListener('change', (e) => {
            const endDateField = document.getElementById('endDate');
            if (!endDateField.value && e.target.value) {
                endDateField.value = e.target.value;
            }
        });

        document.getElementById('calendarViewBtn').addEventListener('click', () => this.switchView('calendar'));
        document.getElementById('listViewBtn').addEventListener('click', () => this.switchView('list'));

        // Employee filter
        document.getElementById('employeeFilter').addEventListener('change', (e) => {
            this.selectedEmployee = e.target.value;
            this.updateViews();
        });
        this.populateEmployeeFilter();

        document.getElementById('prevMonth').addEventListener('click', () => this.changeMonth(-1));
        document.getElementById('nextMonth').addEventListener('click', () => this.changeMonth(1));

        document.getElementById('filterName').addEventListener('input', () => {
            if (typeof window.renderListView === 'function') window.renderListView();
        });
        document.getElementById('filterType').addEventListener('change', () => {
            if (typeof window.renderListView === 'function') window.renderListView();
        });
        document.getElementById('filterStartDate').addEventListener('change', () => {
            if (typeof window.renderListView === 'function') window.renderListView();
        });
        document.getElementById('filterEndDate').addEventListener('change', () => {
            if (typeof window.renderListView === 'function') window.renderListView();
        });
        document.getElementById('resetFilters').addEventListener('click', () => this.resetFilters());

        document.querySelector('.close').addEventListener('click', () => {
            this.isProcessing = false;
            const updateButton = document.querySelector('#editForm button[type="submit"]');
            if (updateButton) {
                updateButton.disabled = false;
                updateButton.textContent = 'Update Leave';
            }
            this.closeModal();
        });
        document.getElementById('cancelEdit').addEventListener('click', () => {
            this.isProcessing = false;
            const updateButton = document.querySelector('#editForm button[type="submit"]');
            if (updateButton) {
                updateButton.disabled = false;
                updateButton.textContent = 'Update Leave';
            }
            this.closeModal();
        });
        document.getElementById('editForm').addEventListener('submit', (e) => this.handleUpdateLeave(e));

        // Auto-populate end date when edit start date is entered
        document.getElementById('editStartDate').addEventListener('change', (e) => {
            const endDateField = document.getElementById('editEndDate');
            if (!endDateField.value && e.target.value) {
                endDateField.value = e.target.value;
            }
        });

        document.getElementById('editModal').addEventListener('click', (e) => {
            if (e.target.id === 'editModal') {
                this.isProcessing = false;
                const updateButton = document.querySelector('#editForm button[type="submit"]');
                if (updateButton) {
                    updateButton.disabled = false;
                    updateButton.textContent = 'Update Leave';
                }
                this.closeModal();
            }
        });

        this.updateCalendarDisplay();
        // Views will be rendered after DOM is fully loaded
    }

    loadLeaves() {
        const stored = localStorage.getItem('teamLeaves');
        return stored ? JSON.parse(stored) : [];
    }

    saveLeaves() {
        localStorage.setItem('teamLeaves', JSON.stringify(this.leaves));
    }

    handleAddLeave(e) {
        e.preventDefault();
        
        // Prevent multiple submissions
        if (this.isProcessing) {
            return;
        }
        
        this.isProcessing = true;
        const submitButton = e.target.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Adding...';
        }
        
        const name = document.getElementById('name').value.trim();
        const leaveType = document.getElementById('leaveType').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const reason = document.getElementById('reason').value.trim();
        const christmasAvailable = document.getElementById('christmasAvailable').checked;

        if (startDate > endDate) {
            alert('End date must be after start date!');
            this.isProcessing = false;
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Add Leave';
            }
            return;
        }

        const leave = {
            id: Date.now(),
            name,
            leaveType,
            startDate,
            endDate,
            reason,
            christmasAvailable
        };

        this.leaves.push(leave);
        this.saveLeaves();
        this.clearForm();

        // Populate employee filter with new data
        this.populateEmployeeFilter();

        // Update views
        this.updateViews();
        
        // Re-enable button and reset processing flag
        this.isProcessing = false;
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Add Leave';
        }
    }

    handleUpdateLeave(e) {
        e.preventDefault();

        // Prevent multiple submissions
        if (this.isProcessing) {
            return;
        }
        
        this.isProcessing = true;
        const submitButton = e.target.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Updating...';
        }

        const id = parseInt(document.getElementById('editId').value);
        const name = document.getElementById('editName').value.trim();
        const leaveType = document.getElementById('editLeaveType').value;
        const startDate = document.getElementById('editStartDate').value;
        const endDate = document.getElementById('editEndDate').value;
        const reason = document.getElementById('editReason').value.trim();

        if (startDate > endDate) {
            alert('End date must be after start date!');
            this.isProcessing = false;
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Update Leave';
            }
            return;
        }

        const index = this.leaves.findIndex(l => l.id === id);
        if (index !== -1) {
            // Preserve christmasAvailable if it exists
            const existingLeave = this.leaves[index];
            const christmasAvailable = existingLeave.christmasAvailable || false;
            
            this.leaves[index] = { id, name, leaveType, startDate, endDate, reason, christmasAvailable };
            this.saveLeaves();
            
            // Update views
            this.updateViews();
        }
        
        // Always close modal and reset state
        this.isProcessing = false;
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Update Leave';
        }
        
        this.closeModal();
    }

    deleteLeave(id) {
        if (confirm('Are you sure you want to delete this leave entry?')) {
            this.leaves = this.leaves.filter(l => l.id !== id);
            this.saveLeaves();

            // Populate employee filter with updated data
            this.populateEmployeeFilter();

            // Update views
            this.updateViews();
        }
    }

    editLeave(id) {
        const leave = this.leaves.find(l => l.id === id);
        if (!leave) return;

        document.getElementById('editId').value = leave.id;
        document.getElementById('editName').value = leave.name;
        document.getElementById('editLeaveType').value = leave.leaveType;
        document.getElementById('editStartDate').value = leave.startDate;
        document.getElementById('editEndDate').value = leave.endDate;
        document.getElementById('editReason').value = leave.reason || '';

        document.getElementById('editModal').classList.add('active');
    }

    closeModal() {
        document.getElementById('editModal').classList.remove('active');
    }

    switchView(view) {
        this.currentView = view;
        
        document.getElementById('calendarView').classList.toggle('active', view === 'calendar');
        document.getElementById('listView').classList.toggle('active', view === 'list');
        document.getElementById('calendarViewBtn').classList.toggle('active', view === 'calendar');
        document.getElementById('listViewBtn').classList.toggle('active', view === 'list');
    }

    changeMonth(delta) {
        this.currentMonth += delta;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        } else if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        
        if (this.currentYear > 2028) {
            this.currentMonth = 11;
            this.currentYear = 2028;
        }
        
        if (this.currentYear < 2024) {
            this.currentMonth = 0;
            this.currentYear = 2024;
        }
        
        this.updateCalendarDisplay();
        if (typeof window.renderCalendarView === 'function') window.renderCalendarView();
    }

    updateCalendarDisplay() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        document.getElementById('currentMonthDisplay').textContent = `${months[this.currentMonth]} ${this.currentYear}`;
        
        const nextBtn = document.getElementById('nextMonth');
        nextBtn.disabled = this.currentYear === 2028 && this.currentMonth === 11;
        
        const prevBtn = document.getElementById('prevMonth');
        prevBtn.disabled = this.currentYear === 2024 && this.currentMonth === 0;
    }

    clearForm() {
        document.getElementById('leaveForm').reset();
        // Explicitly uncheck christmas availability checkbox
        document.getElementById('christmasAvailable').checked = false;
    }

    resetFilters() {
        document.getElementById('filterName').value = '';
        document.getElementById('filterType').value = '';
        document.getElementById('filterStartDate').value = '';
        document.getElementById('filterEndDate').value = '';
        if (typeof window.renderListView === 'function') window.renderListView();
    }

    renderCurrentView() {
        if (typeof window.renderCalendarView === 'function') window.renderCalendarView();
        if (typeof window.renderListView === 'function') window.renderListView();
    }

    populateEmployeeFilter() {
        const employeeSelect = document.getElementById('employeeFilter');
        const uniqueEmployees = [...new Set(this.leaves.map(leave => leave.name))].sort();
        
        // Clear existing options except the first one
        employeeSelect.innerHTML = '<option value="">All Employees</option>';
        
        uniqueEmployees.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            employeeSelect.appendChild(option);
        });
    }

    getFilteredLeaves() {
        if (!this.selectedEmployee) {
            return this.leaves;
        }
        return this.leaves.filter(leave => leave.name === this.selectedEmployee);
    }

    updateViews() {
        // Store original leaves
        const originalLeaves = this.leaves;
        
        // Temporarily replace with filtered leaves
        this.leaves = this.getFilteredLeaves();
        
        // Update views
        if (typeof window.renderCalendarView === 'function') window.renderCalendarView();
        if (typeof window.renderListView === 'function') window.renderListView();
        
        // Restore original leaves
        this.leaves = originalLeaves;
    }
}

let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new LeaveApp();
    window.leaveApp = app;
    
    // Initialize views after app is created
    setTimeout(() => {
        if (typeof window.renderCalendarView === 'function') window.renderCalendarView();
        if (typeof window.renderListView === 'function') window.renderListView();
    }, 100);
});

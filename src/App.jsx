import React, { useState, useEffect } from 'react';
import './App.css';
import LeaveForm from './components/LeaveForm';
import Controls from './components/Controls';
import CalendarView from './components/CalendarView';
import ListView from './components/ListView';
import EditModal from './components/EditModal';
import { publicHolidays } from './utils/constants';

function App() {
  const [leaves, setLeaves] = useState([]);
  const [currentView, setCurrentView] = useState('calendar');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [editingId, setEditingId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState('');

  useEffect(() => {
    loadLeaves();
  }, []);

  useEffect(() => {
    // Store leaves in localStorage when it changes
    localStorage.setItem('teamLeaves', JSON.stringify(leaves));
  }, [leaves]);

  const loadLeaves = () => {
    const stored = localStorage.getItem('teamLeaves');
    if (stored) {
      try {
        setLeaves(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading leaves:', e);
        setLeaves([]);
      }
    }
  };

  const addLeave = (leaveData) => {
    const leave = {
      id: Date.now(),
      ...leaveData
    };
    setLeaves(prev => [...prev, leave]);
    return true;
  };

  const updateLeave = (id, leaveData) => {
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, ...leaveData } : l));
  };

  const deleteLeave = (id) => {
    if (window.confirm('Are you sure you want to delete this leave entry?')) {
      setLeaves(prev => prev.filter(l => l.id !== id));
    }
  };

  const editLeave = (id) => {
    setEditingId(id);
  };

  const closeModal = () => {
    setEditingId(null);
    setIsProcessing(false);
  };

  const switchView = (view) => {
    setCurrentView(view);
  };

  const changeMonth = (delta) => {
    setCurrentMonth(prev => {
      let newMonth = prev + delta;
      let newYear = currentYear;
      
      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      } else if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }
      
      // Constrain years
      if (newYear > 2028) {
        setCurrentMonth(11);
        setCurrentYear(2028);
        return 11;
      }
      if (newYear < 2024) {
        setCurrentMonth(0);
        setCurrentYear(2024);
        return 0;
      }
      
      setCurrentYear(newYear);
      return newMonth;
    });
  };

  const filteredLeaves = selectedEmployee 
    ? leaves.filter(leave => leave.name === selectedEmployee)
    : leaves;

  return (
    <div className="container">
      <header>
        <div className="header-content">
          <img src="/assets/tally_logo1.svg" alt="Tally Logo" className="tally-logo" />
          <div className="header-text">
            <h1>Team Leave Calendar</h1>
            <p className="subtitle">Manage your team's planned and tentative annual leaves</p>
          </div>
        </div>
      </header>

      <LeaveForm onAddLeave={addLeave} />

      <Controls
        currentView={currentView}
        onSwitchView={switchView}
        leaves={leaves}
        selectedEmployee={selectedEmployee}
        onEmployeeChange={setSelectedEmployee}
      />

      {currentView === 'calendar' && (
        <CalendarView
          month={currentMonth}
          year={currentYear}
          leaves={filteredLeaves}
          onMonthChange={changeMonth}
          onEditLeave={editLeave}
          onDeleteLeave={deleteLeave}
        />
      )}

      {currentView === 'list' && (
        <ListView
          leaves={filteredLeaves}
          onEditLeave={editLeave}
          onDeleteLeave={deleteLeave}
        />
      )}

      {editingId && (
        <EditModal
          leave={leaves.find(l => l.id === editingId)}
          onSave={(leaveData) => {
            updateLeave(editingId, leaveData);
            closeModal();
          }}
          onClose={closeModal}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />
      )}
    </div>
  );
}

export default App;


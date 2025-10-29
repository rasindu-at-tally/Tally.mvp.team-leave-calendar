import React from 'react';
import ExportButton from './ExportButton';

const Controls = ({ currentView, onSwitchView, leaves, selectedEmployee, onEmployeeChange }) => {
  const uniqueEmployees = [...new Set(leaves.map(leave => leave.name))].sort();

  return (
    <section className="controls-section">
      <div className="view-toggles">
        <button 
          className={`view-toggle ${currentView === 'calendar' ? 'active' : ''}`}
          onClick={() => onSwitchView('calendar')}
        >
          Calendar View
        </button>
        <button 
          className={`view-toggle ${currentView === 'list' ? 'active' : ''}`}
          onClick={() => onSwitchView('list')}
        >
          List View
        </button>
      </div>
      <div className="employee-filter">
        <label htmlFor="employeeFilter">Filter by Employee:</label>
        <select 
          id="employeeFilter"
          value={selectedEmployee}
          onChange={(e) => onEmployeeChange(e.target.value)}
        >
          <option value="">All Employees</option>
          {uniqueEmployees.map(employee => (
            <option key={employee} value={employee}>{employee}</option>
          ))}
        </select>
      </div>
      <ExportButton leaves={leaves} />
    </section>
  );
};

export default Controls;


import React, { useState } from 'react';
import { formatDate, calculateDuration, getChristmasAvailabilityDisplay } from '../utils/helpers';

const ListView = ({ leaves, onEditLeave, onDeleteLeave }) => {
  const [filterName, setFilterName] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  const resetFilters = () => {
    setFilterName('');
    setFilterType('');
    setFilterStartDate('');
    setFilterEndDate('');
  };

  const filteredLeaves = leaves.filter(leave => {
    if (filterName && !leave.name.toLowerCase().includes(filterName.toLowerCase())) {
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
  }).sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  const maxDate = '2028-12-31';

  return (
    <section id="listView" className="view-container">
      <div className="list-controls">
        <div className="filter-group">
          <label htmlFor="filterName">Filter by Name:</label>
          <input 
            type="text" 
            id="filterName" 
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            placeholder="Enter name..." 
          />
        </div>
        <div className="filter-group">
          <label htmlFor="filterType">Filter by Type:</label>
          <select 
            id="filterType"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All</option>
            <option value="planned">Planned</option>
            <option value="tentative">Tentative</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="filterStartDate">From Date:</label>
          <input 
            type="date" 
            id="filterStartDate"
            value={filterStartDate}
            onChange={(e) => setFilterStartDate(e.target.value)}
            max={maxDate}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="filterEndDate">To Date:</label>
          <input 
            type="date" 
            id="filterEndDate"
            value={filterEndDate}
            onChange={(e) => setFilterEndDate(e.target.value)}
            max={maxDate}
          />
        </div>
        <div className="filter-group">
          <label>&nbsp;</label>
          <button className="btn btn-secondary btn-filter" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      </div>
      <div id="listTable" className="list-table">
        {filteredLeaves.length === 0 ? (
          <div className="empty-state">
            <p>No leave entries found</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Duration (Working Days)</th>
                <th>Available during Christmas</th>
                <th>Reason</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.map(leave => {
                const christmasValue = getChristmasAvailabilityDisplay(leave);
                let christmasStyle = {};
                if (christmasValue === 'N/A') {
                  christmasStyle = { color: '#6c757d' };
                } else if (christmasValue === 'Yes') {
                  christmasStyle = { color: '#28a745' };
                } else {
                  christmasStyle = { color: '#dc3545' };
                }

                return (
                  <tr 
                    key={leave.id} 
                    style={{ cursor: 'context-menu' }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      if (window.confirm(`Cancel leave for ${leave.name}?`)) {
                        onDeleteLeave(leave.id);
                      }
                    }}
                  >
                    <td>{leave.name}</td>
                    <td>
                      <span className={`type-badge type-${leave.leaveType}`}>
                        {leave.leaveType.charAt(0).toUpperCase() + leave.leaveType.slice(1)}
                      </span>
                    </td>
                    <td>{formatDate(leave.startDate)}</td>
                    <td>{formatDate(leave.endDate)}</td>
                    <td>{calculateDuration(leave.startDate, leave.endDate)}</td>
                    <td style={{ fontWeight: '600', ...christmasStyle }}>
                      {christmasValue}
                    </td>
                    <td>{leave.reason || '-'}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="action-btn edit" 
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditLeave(leave.id);
                          }}
                        >
                          Edit
                        </button>
                        <button 
                          className="action-btn delete" 
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteLeave(leave.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default ListView;


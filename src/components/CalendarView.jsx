import React from 'react';
import { getHoliday } from '../utils/constants';

const CalendarView = ({ month, year, leaves, onMonthChange, onEditLeave, onDeleteLeave }) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
  
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  
  const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const getLeavesForDate = (dateStr) => {
    return leaves.filter(leave => {
      return dateStr >= leave.startDate && dateStr <= leave.endDate;
    });
  };

  const canGoPrev = !(year === 2024 && month === 0);
  const canGoNext = !(year === 2028 && month === 11);

  const cells = [];
  
  // Empty cells for days before the first day of month
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`}></div>);
  }

  // Cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month, day);
    const isToday = currentDate.toDateString() === today.toDateString();
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const holiday = getHoliday(dateStr);
    const leavesForDay = getLeavesForDate(dateStr);

    const cellClass = ['calendar-cell'];
    if (isToday) cellClass.push('today');
    if (holiday) cellClass.push(`holiday-${holiday.country}`);

    cells.push(
      <div key={day} className={cellClass.join(' ')} title={holiday ? holiday.name : ''}>
        <div className="calendar-date">{day}</div>
        {leavesForDay.map((leave, idx) => (
          <div
            key={idx}
            className={`leave-item ${leave.leaveType}`}
            title={`${leave.name} - ${leave.leaveType}${leave.reason ? ': ' + leave.reason : ''} (Left-click to edit, Right-click to cancel)`}
            onClick={(e) => {
              e.stopPropagation();
              onEditLeave(leave.id);
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (window.confirm(`Cancel leave for ${leave.name}?`)) {
                onDeleteLeave(leave.id);
              }
            }}
          >
            {leave.name}
          </div>
        ))}
      </div>
    );
  }

  return (
    <section id="calendarView" className="view-container active">
      <div className="calendar-header">
        <button 
          className="nav-btn" 
          onClick={() => onMonthChange(-1)}
          disabled={!canGoPrev}
        >
          ← Previous
        </button>
        <h2>{months[month]} {year}</h2>
        <button 
          className="nav-btn" 
          onClick={() => onMonthChange(1)}
          disabled={!canGoNext}
        >
          Next →
        </button>
      </div>
      <div className="holiday-legend">
        <div className="holiday-legend-item">
          <div className="holiday-color nz"></div>
          <span>New Zealand Holidays</span>
        </div>
        <div className="holiday-legend-item">
          <div className="holiday-color au"></div>
          <span>Australia Holidays</span>
        </div>
        <div className="holiday-legend-item">
          <div className="holiday-color vn"></div>
          <span>Vietnam Holidays</span>
        </div>
        <div className="holiday-legend-item">
          <div className="holiday-color in"></div>
          <span>India Holidays</span>
        </div>
      </div>
      <div id="calendarGrid" className="calendar-grid">
        {dayHeaders.map(day => (
          <div key={day} className="calendar-day-header">{day}</div>
        ))}
        {cells}
      </div>
    </section>
  );
};

export default CalendarView;


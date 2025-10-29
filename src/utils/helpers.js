import { publicHolidays } from './constants';

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  let workingDays = 0;
  const currentDate = new Date(start);
  
  while (currentDate <= end) {
    const dayOfWeek = currentDate.getDay();
    const dateStr = currentDate.toISOString().split('T')[0];
    
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    const isHoliday = (
      publicHolidays.NZ?.[dateStr] ||
      publicHolidays.AU?.[dateStr] ||
      publicHolidays.VN?.[dateStr] ||
      publicHolidays.IN?.[dateStr]
    );
    
    if (!isWeekend && !isHoliday) {
      workingDays++;
    }
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return workingDays + (workingDays === 1 ? ' working day' : ' working days');
};

export const isWithinChristmasShutdown = (startDate, endDate) => {
  const shutdownStart = '2025-12-22';
  const shutdownEnd = '2026-01-09';
  return startDate <= shutdownEnd && endDate >= shutdownStart;
};

export const getChristmasAvailabilityDisplay = (leave) => {
  if (!isWithinChristmasShutdown(leave.startDate, leave.endDate)) {
    return 'N/A';
  }
  return leave.christmasAvailable ? 'Yes' : 'No';
};


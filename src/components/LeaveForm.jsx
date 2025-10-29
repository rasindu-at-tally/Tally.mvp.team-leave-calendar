import React, { useState } from 'react';

const LeaveForm = ({ onAddLeave }) => {
  const [formData, setFormData] = useState({
    name: '',
    leaveType: 'planned',
    startDate: '',
    endDate: '',
    reason: '',
    christmasAvailable: false
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const maxDate = '2028-12-31';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Auto-populate end date when start date is entered
    if (name === 'startDate' && value && !formData.endDate) {
      setFormData(prev => ({ ...prev, endDate: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isProcessing) return;

    setIsProcessing(true);

    try {
      if (formData.startDate > formData.endDate) {
        alert('End date must be after start date!');
        return;
      }

      const success = onAddLeave({
        name: formData.name.trim(),
        leaveType: formData.leaveType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason.trim(),
        christmasAvailable: formData.christmasAvailable
      });

      if (success) {
        // Clear form
        setFormData({
          name: '',
          leaveType: 'planned',
          startDate: '',
          endDate: '',
          reason: '',
          christmasAvailable: false
        });
      }
    } catch (error) {
      console.error('Error adding leave:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const clearForm = () => {
    setFormData({
      name: '',
      leaveType: 'planned',
      startDate: '',
      endDate: '',
      reason: '',
      christmasAvailable: false
    });
  };

  return (
    <section className="form-section">
      <h2>Add New Leave</h2>
      <form id="leaveForm" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Team Member Name *</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="leaveType">Leave Type *</label>
            <select 
              id="leaveType" 
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              required
            >
              <option value="planned">Planned</option>
              <option value="tentative">Tentative</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Start Date *</label>
            <input 
              type="date" 
              id="startDate" 
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              max={maxDate}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date *</label>
            <input 
              type="date" 
              id="endDate" 
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              max={maxDate}
              required 
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="reason">Reason / Notes</label>
          <textarea 
            id="reason" 
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows="2" 
            placeholder="Optional: Add reason or notes for this leave"
          />
        </div>
        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              id="christmasAvailable" 
              name="christmasAvailable"
              checked={formData.christmasAvailable}
              onChange={handleChange}
            />
            <span>Available during Christmas Shutdown (22 Dec 2025 - 09 Jan 2026)?</span>
          </label>
        </div>
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isProcessing}
          >
            {isProcessing ? 'Adding...' : 'Add Leave'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={clearForm}
          >
            Clear Form
          </button>
        </div>
      </form>
    </section>
  );
};

export default LeaveForm;


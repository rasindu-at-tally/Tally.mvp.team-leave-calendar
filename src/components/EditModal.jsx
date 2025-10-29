import React, { useState, useEffect } from 'react';

const EditModal = ({ leave, onSave, onClose, isProcessing, setIsProcessing }) => {
  const [formData, setFormData] = useState({
    name: '',
    leaveType: 'planned',
    startDate: '',
    endDate: '',
    reason: ''
  });

  useEffect(() => {
    if (leave) {
      setFormData({
        name: leave.name || '',
        leaveType: leave.leaveType || 'planned',
        startDate: leave.startDate || '',
        endDate: leave.endDate || '',
        reason: leave.reason || ''
      });
    }
  }, [leave]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Auto-populate end date when start date is entered
    if (name === 'startDate' && value && !formData.endDate) {
      setFormData(prev => ({ ...prev, endDate: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isProcessing) return;

    if (formData.startDate > formData.endDate) {
      alert('End date must be after start date!');
      return;
    }

    setIsProcessing(true);
    
    try {
      onSave({
        name: formData.name.trim(),
        leaveType: formData.leaveType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason.trim()
      });
    } catch (error) {
      console.error('Error updating leave:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!leave) return null;

  const maxDate = '2028-12-31';

  return (
    <div id="editModal" className="modal active">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Leave</h2>
        <form id="editForm" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="editName">Team Member Name *</label>
              <input 
                type="text" 
                id="editName" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="editLeaveType">Leave Type *</label>
              <select 
                id="editLeaveType" 
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
              <label htmlFor="editStartDate">Start Date *</label>
              <input 
                type="date" 
                id="editStartDate" 
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                max={maxDate}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="editEndDate">End Date *</label>
              <input 
                type="date" 
                id="editEndDate" 
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                max={maxDate}
                required 
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="editReason">Reason / Notes</label>
            <textarea 
              id="editReason" 
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="2"
            />
          </div>
          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isProcessing}
            >
              {isProcessing ? 'Updating...' : 'Update Leave'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;


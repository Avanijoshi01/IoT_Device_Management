import React, { useState } from 'react';

const AddDeviceModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    deviceName: '',
    deviceType: 'Temperature Sensor',
    location: '',
    ipAddress: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Adding device:', formData);
    onClose();
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add New Device</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="deviceName">Device Name</label>
            <input
              type="text"
              id="deviceName"
              name="deviceName"
              value={formData.deviceName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="deviceType">Device Type</label>
            <select
              id="deviceType"
              name="deviceType"
              value={formData.deviceType}
              onChange={handleInputChange}
            >
              <option>Temperature Sensor</option>
              <option>Motion Detector</option>
              <option>Smart Thermostat</option>
              <option>Power Monitor</option>
              <option>Camera</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ipAddress">IP Address</label>
            <input
              type="text"
              id="ipAddress"
              name="ipAddress"
              value={formData.ipAddress}
              onChange={handleInputChange}
              placeholder="192.168.1.100"
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Device</button>
        </form>
      </div>
    </div>
  );
};

export default AddDeviceModal; 
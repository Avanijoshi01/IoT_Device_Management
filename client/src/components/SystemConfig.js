import React from 'react';

const SystemConfig = () => {
  return (
    <div id="settings-page">
      <div className="page-header">
        <h1 className="page-title">System Configuration</h1>
        <div className="breadcrumb">Home / System Config</div>
      </div>
      <div className="chart-card">
        <div className="chart-header">
          <h3 className="chart-title">System Settings</h3>
        </div>
        <p>System configuration panel with global settings, device templates, notification preferences, and backup options.</p>
      </div>
    </div>
  );
};

export default SystemConfig; 
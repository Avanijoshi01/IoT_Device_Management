import React from 'react';

const TopBar = ({ onToggleSidebar, onAddDevice }) => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="sidebar-toggle" onClick={onToggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search devices, users..." />
        </div>
      </div>
      <div className="topbar-right">
        <button className="btn btn-primary" onClick={onAddDevice}>
          <i className="fas fa-plus"></i>
          Add Device
        </button>
        <div className="user-profile">
          <div className="user-avatar">JD</div>
          <span>Anushka Sharma</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar; 
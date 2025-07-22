import React from 'react';

function getUserInfo() {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload && payload.name && payload.email
      ? { name: payload.name, email: payload.email }
      : JSON.parse(localStorage.getItem('user'));
  } catch {
    return JSON.parse(localStorage.getItem('user'));
  }
}

const TopBar = ({ onToggleSidebar, onAddDevice, onLogout }) => {
  const handleLogout = () => {
    localStorage.clear();
    if (onLogout) onLogout();
    window.location.href = '/';
  };

  const user = getUserInfo();
  const initials = user && user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : 'JD';
  const displayName = user && user.name ? user.name : 'User';

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
        <button className="btn btn-secondary" onClick={handleLogout} style={{ marginLeft: 16 }}>
          <i className="fas fa-sign-out-alt"></i>
          Logout
        </button>
        <div className="user-profile">
          <div className="user-avatar">{initials}</div>
          <span>{displayName}</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar; 
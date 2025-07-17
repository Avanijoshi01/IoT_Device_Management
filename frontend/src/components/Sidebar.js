import React from 'react';

const Sidebar = ({ currentPage, onPageChange, collapsed }) => {
  const navItems = [
    { id: 'dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
    { id: 'devices', icon: 'fas fa-hdd', label: 'Device Monitor' },
    { id: 'analytics', icon: 'fas fa-chart-line', label: 'Analytics' },
    { id: 'users', icon: 'fas fa-users', label: 'User Management' },
    { id: 'settings', icon: 'fas fa-cog', label: 'System Config' },
    { id: 'alerts', icon: 'fas fa-bell', label: 'Alerts' }
  ];

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <i className="fas fa-microchip"></i>
        <h3>IoT Platform</h3>
      </div>
      <ul className="nav-menu">
        {navItems.map((item) => (
          <li key={item.id} className="nav-item">
            <a
              href="#"
              className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(item.id);
              }}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar; 
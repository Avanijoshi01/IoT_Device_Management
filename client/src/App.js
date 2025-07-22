import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './components/Dashboard';
import DeviceMonitor from './components/DeviceMonitor';
import Analytics from './components/Analytics';
import UserManagement from './components/UserManagement';
import SystemConfig from './components/SystemConfig';
import Alerts from './components/Alerts';
import AddDeviceModal from './components/AddDeviceModal';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function DashboardLayout({ onLogout }) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAddDeviceModal, setShowAddDeviceModal] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const showPage = (pageId) => {
    setCurrentPage(pageId);
  };

  const openAddDeviceModal = () => {
    setShowAddDeviceModal(true);
  };

  const closeAddDeviceModal = () => {
    setShowAddDeviceModal(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'devices':
        return <DeviceMonitor />;
      case 'analytics':
        return <Analytics />;
      case 'users':
        return <UserManagement />;
      case 'settings':
        return <SystemConfig />;
      case 'alerts':
        return <Alerts />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App">
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={showPage} 
        collapsed={sidebarCollapsed} 
      />
      <div className={`main-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <TopBar 
          onToggleSidebar={toggleSidebar}
          onAddDevice={openAddDeviceModal}
          onLogout={onLogout}
        />
        <div className="content">
          {renderPage()}
        </div>
      </div>
      {showAddDeviceModal && (
        <AddDeviceModal onClose={closeAddDeviceModal} />
      )}
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginForm onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={isLoggedIn ? <DashboardLayout onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/"} />} />
      </Routes>
    </Router>
  );
}

export default App;

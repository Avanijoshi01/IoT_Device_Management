import React, { useEffect, useRef } from 'react';

const Dashboard = () => {
  const performanceChartRef = useRef(null);
  const statusChartRef = useRef(null);

  useEffect(() => {
    // Wait for Chart.js to be available
    const initCharts = () => {
      if (window.Chart && performanceChartRef.current && statusChartRef.current) {
        try {
          // Performance Chart
          const performanceCtx = performanceChartRef.current.getContext('2d');
          new window.Chart(performanceCtx, {
            type: 'line',
            data: {
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              datasets: [{
                label: 'Online Devices',
                data: [245, 243, 247, 246, 251, 249, 247],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true
              }, {
                label: 'Warnings',
                data: [8, 12, 6, 9, 15, 11, 12],
                borderColor: '#f093fb',
                backgroundColor: 'rgba(240, 147, 251, 0.1)',
                tension: 0.4,
                fill: true
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(0,0,0,0.1)'
                  }
                },
                x: {
                  grid: {
                    color: 'rgba(0,0,0,0.1)'
                  }
                }
              }
            }
          });

          // Status Chart (Doughnut)
          const statusCtx = statusChartRef.current.getContext('2d');
          new window.Chart(statusCtx, {
            type: 'doughnut',
            data: {
              labels: ['Online', 'Offline', 'Warning'],
              datasets: [{
                data: [231, 4, 12],
                backgroundColor: [
                  '#56ab2f',
                  '#ff9a9e',
                  '#f093fb'
                ],
                borderWidth: 0
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                }
              }
            }
          });
        } catch (error) {
          console.log('Chart initialization error:', error);
        }
      }
    };

    // Try to initialize charts immediately
    initCharts();

    // If Chart.js is not loaded yet, wait for it
    if (!window.Chart) {
      const checkChart = setInterval(() => {
        if (window.Chart) {
          clearInterval(checkChart);
          initCharts();
        }
      }, 100);
    }
  }, []);

  const statsData = [
    { icon: 'fas fa-hdd', type: 'primary', value: '247', label: 'Total Devices' },
    { icon: 'fas fa-check-circle', type: 'success', value: '231', label: 'Online Devices' },
    { icon: 'fas fa-exclamation-triangle', type: 'warning', value: '12', label: 'Warnings' },
    { icon: 'fas fa-times-circle', type: 'danger', value: '4', label: 'Offline Devices' }
  ];

  const recentDevices = [
    {
      name: 'Temperature Sensor #1',
      type: 'Environmental',
      location: 'Server Room A',
      status: 'online',
      lastSeen: '2 minutes ago'
    },
    {
      name: 'Motion Detector #3',
      type: 'Security',
      location: 'Entrance Hall',
      status: 'warning',
      lastSeen: '5 minutes ago'
    },
    {
      name: 'Smart Thermostat #2',
      type: 'HVAC',
      location: 'Office Floor 2',
      status: 'online',
      lastSeen: '1 minute ago'
    },
    {
      name: 'Power Monitor #5',
      type: 'Energy',
      location: 'Electrical Room',
      status: 'offline',
      lastSeen: '2 hours ago'
    }
  ];

  return (
    <div id="dashboard-page">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <div className="breadcrumb">Home / Dashboard</div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className={`stat-icon ${stat.type}`}>
              <i className={stat.icon}></i>
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Device Performance Overview</h3>
            <select>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
            </select>
          </div>
          <div style={{ height: '300px', position: 'relative' }}>
            <canvas ref={performanceChartRef}></canvas>
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Device Status</h3>
          </div>
          <div style={{ height: '300px', position: 'relative' }}>
            <canvas ref={statusChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Recent Devices */}
      <div className="devices-section">
        <div className="devices-header">
          <h3>Recent Device Activity</h3>
        </div>
        <table className="devices-table">
          <thead>
            <tr>
              <th>Device Name</th>
              <th>Type</th>
              <th>Location</th>
              <th>Status</th>
              <th>Last Seen</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentDevices.map((device, index) => (
              <tr key={index}>
                <td>{device.name}</td>
                <td>{device.type}</td>
                <td>{device.location}</td>
                <td>
                  <span className={`status-badge status-${device.status}`}>
                    {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                  </span>
                </td>
                <td>{device.lastSeen}</td>
                <td>
                  <button className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>
                    <i className="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard; 
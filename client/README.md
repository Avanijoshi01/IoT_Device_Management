# IoT Device Management Platform

A modern, responsive web application for managing IoT devices with real-time monitoring, analytics, and user management capabilities.

## Features

### 🏠 Dashboard
- Real-time device statistics
- Interactive charts and graphs
- Recent device activity overview
- Quick status indicators

### 📊 Device Monitoring
- Comprehensive device management
- Real-time status updates
- Device configuration options
- Performance tracking

### 📈 Analytics
- Advanced data visualization
- Performance metrics
- Historical data analysis
- Custom reporting tools

### 👥 User Management
- Role-based access control
- User account administration
- Permission management
- Activity tracking

### ⚙️ System Configuration
- Global settings management
- Device templates
- Notification preferences
- Backup and restore options

### 🔔 Alerts
- Real-time alert monitoring
- Notification settings
- Alert history
- Custom alert rules

## Technology Stack

- **Frontend**: React.js with modern hooks
- **Styling**: CSS3 with responsive design
- **Charts**: Chart.js for data visualization
- **Icons**: Font Awesome for UI icons
- **Layout**: CSS Grid and Flexbox

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
frontend/
├── public/
│   ├── index.html          # Main HTML template
│   └── ...
├── src/
│   ├── components/         # React components
│   │   ├── Sidebar.js      # Navigation sidebar
│   │   ├── TopBar.js       # Top navigation bar
│   │   ├── Dashboard.js    # Main dashboard
│   │   ├── DeviceMonitor.js # Device monitoring
│   │   ├── Analytics.js    # Analytics interface
│   │   ├── UserManagement.js # User management
│   │   ├── SystemConfig.js # System settings
│   │   ├── Alerts.js       # Alert management
│   │   └── AddDeviceModal.js # Add device modal
│   ├── App.js             # Main App component
│   ├── App.css            # Main styles
│   └── index.js           # App entry point
└── package.json           # Dependencies and scripts
```

## Features in Detail

### Responsive Design
- Mobile-friendly interface
- Collapsible sidebar
- Adaptive layouts for different screen sizes

### Interactive Components
- Real-time charts and graphs
- Modal dialogs for device management
- Dynamic status indicators
- Search functionality

### Modern UI/UX
- Clean, professional design
- Smooth animations and transitions
- Intuitive navigation
- Consistent color scheme

## Future Enhancements

- WebSocket integration for real-time updates
- Backend API integration
- Advanced analytics and reporting
- Multi-language support
- Dark mode theme
- Export functionality for reports

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

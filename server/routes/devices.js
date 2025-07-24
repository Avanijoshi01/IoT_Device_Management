const express = require('express');
const Device = require('../models/Device');
const jwt = require('jsonwebtoken');
const router = express.Router();

// JWT middleware
const auth = require('../middleware/auth');

// Role check middleware
function authorizeRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ msg: 'Access denied' });
    }
    next();
  };
}

// GET /api/devices - List all devices
router.get('/', auth, async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// POST /api/devices - Add a device (Admin/Manager only)
router.post('/', auth, authorizeRoles('Admin', 'Manager'), async (req, res) => {
  try {
    const { name, type, location, status, metrics, lastSeen } = req.body;
    const device = new Device({ name, type, location, status, metrics, lastSeen });
    await device.save();
    res.status(201).json(device);
  } catch (err) {
    res.status(400).json({ msg: 'Invalid data', error: err.message });
  }
});

// PUT /api/devices/:id - Edit a device (Admin/Manager only)
router.put('/:id', auth, authorizeRoles('Admin', 'Manager'), async (req, res) => {
  try {
    const { name, type, location, status, metrics, lastSeen } = req.body;
    const device = await Device.findByIdAndUpdate(
      req.params.id,
      { name, type, location, status, metrics, lastSeen },
      { new: true, runValidators: true }
    );
    if (!device) return res.status(404).json({ msg: 'Device not found' });
    res.json(device);
  } catch (err) {
    res.status(400).json({ msg: 'Invalid data', error: err.message });
  }
});

// DELETE /api/devices/:id - Remove a device (Admin/Manager only)
router.delete('/:id', auth, authorizeRoles('Admin', 'Manager'), async (req, res) => {
  try {
    const device = await Device.findByIdAndDelete(req.params.id);
    if (!device) return res.status(404).json({ msg: 'Device not found' });
    res.json({ msg: 'Device deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router; 
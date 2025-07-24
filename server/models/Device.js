const mongoose = require('mongoose');

const MetricsSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number
}, { _id: false });

const DeviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['online', 'offline', 'warning'], default: 'offline' },
  metrics: { type: MetricsSchema, default: {} },
  lastSeen: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Device', DeviceSchema); 
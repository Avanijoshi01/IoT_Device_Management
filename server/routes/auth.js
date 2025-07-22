const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

// JWT secret
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}
const JWT_SECRET = process.env.JWT_SECRET;

// Registration
router.post('/register', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('role').optional().isIn(['Admin', 'Manager', 'Operator'])
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const { name, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });
    user = new User({ name, email, password, role });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login
router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Middleware for role-based access
function authorizeRoles(...roles) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ msg: 'No token, authorization denied' });
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (!roles.includes(decoded.role)) return res.status(403).json({ msg: 'Access denied' });
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ msg: 'Token is not valid' });
    }
  };
}

// Example protected route
router.get('/admin-only', authorizeRoles('Admin'), (req, res) => {
  res.json({ msg: 'Welcome, Admin!' });
});

// Password reset request
router.post('/forgot-password', [body('email').isEmail()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'No user with that email' });
    const token = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = token;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${token}`;
    await transporter.sendMail({
      to: user.email,
      subject: 'Password Reset',
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`
    });
    res.json({ msg: 'Password reset email sent' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Password reset confirm
router.post('/reset-password/:token', [body('password').isLength({ min: 6 })], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const user = await User.findOne({
      passwordResetToken: req.params.token,
      passwordResetExpires: { $gt: Date.now() }
    });
    if (!user) return res.status(400).json({ msg: 'Invalid or expired token' });
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json({ msg: 'Password has been reset' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Generate JWT token for testing
router.post('/generate-token', (req, res) => {
  const { id, role } = req.body;
  if (!id || !role) return res.status(400).json({ msg: 'id and role are required' });
  const token = jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

module.exports = router; 
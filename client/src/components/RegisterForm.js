import React, { useState } from 'react';
import { TextField, Button, Typography, Alert, Box, MenuItem, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const roles = ['Admin', 'Manager', 'Operator'];

export default function RegisterForm({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Operator');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || (data.errors && data.errors[0]?.msg) || 'Registration failed');
      setSuccess('Registration successful! You can now log in.');
      if (onRegister) onRegister(data.user);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3, boxShadow: 2, borderRadius: 2 }}>
      <Typography variant="h5" mb={2}>Register</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <TextField
        label="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        select
        label="Role"
        value={role}
        onChange={e => setRole(e.target.value)}
        fullWidth
        required
        margin="normal"
      >
        {roles.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
      </TextField>
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 2 }}>
        {loading ? <CircularProgress size={24} /> : 'Register'}
      </Button>
    </Box>
  );
} 
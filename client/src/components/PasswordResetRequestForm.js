import React, { useState } from 'react';
import { TextField, Button, Typography, Alert, Box, CircularProgress } from '@mui/material';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function PasswordResetRequestForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || (data.errors && data.errors[0]?.msg) || 'Request failed');
      setSuccess('Password reset email sent!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3, boxShadow: 2, borderRadius: 2 }}>
      <Typography variant="h5" mb={2}>Forgot Password</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 2 }}>
        {loading ? <CircularProgress size={24} /> : 'Send Reset Email'}
      </Button>
    </Box>
  );
} 
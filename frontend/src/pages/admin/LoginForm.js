import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CssBaseline,
  Avatar,
  Paper,
  InputAdornment,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/admin/home');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 10, mb: 6 }}>
      <CssBaseline />
      <Paper elevation={6} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: '#0b1a3c' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Admin Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: '#0b1a3c' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputLabel-root': { color: '#0b1a3c' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#0b1a3c' },
                '&:hover fieldset': { borderColor: '#0b1a3c' },
                '&.Mui-focused fieldset': { borderColor: '#0b1a3c' },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: '#0b1a3c' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputLabel-root': { color: '#0b1a3c' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#0b1a3c' },
                '&:hover fieldset': { borderColor: '#0b1a3c' },
                '&.Mui-focused fieldset': { borderColor: '#0b1a3c' },
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: '#0b1a3c',
              '&:hover': {
                bgcolor: '#0d274f',
              },
              textTransform: 'none',
            }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;

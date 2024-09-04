import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';

const CreateJob = () => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [alert, setAlert] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !company || !location || !type || !description) {
      setAlert('All fields must be filled.');
      return;
    }

    const newJob = { title, company, location, type, description };

    try {
      await fetch('http://localhost:8081/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob),
      });
      setAlert('Job offer created successfully!');
      setTimeout(() => {
        navigate('/admin/jobs');
      }, 2000);
    } catch (error) {
      console.error('Error creating job:', error);
      setAlert('Failed to create job offer.');
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 3,
      backgroundColor: '#f4f6f8',
      minHeight: '100vh',
      marginRight: { xs: 0, md: '240px' },
    }}>
      <Typography variant="h4" gutterBottom sx={{
        color: '#003366',
        textAlign: 'center',
        fontWeight: 600,
        mb: 4,
      }}>
        Create New Job Offer
      </Typography>
      {alert && <Alert severity={alert.includes('successfully') ? 'success' : 'error'} sx={{ mb: 2 }}>{alert}</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{
        maxWidth: '600px',
        width: '100%',
        backgroundColor: '#fff',
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}>
        <TextField
          label="Job Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            backgroundColor: title ? '#eaf1f9' : '#f7f9fc',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: title ? '#003366' : '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#003366',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#003366',
              },
            },
          }}
        />
        <TextField
          label="Company"
          fullWidth
          margin="normal"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          sx={{
            backgroundColor: company ? '#eaf1f9' : '#f7f9fc',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: company ? '#003366' : '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#003366',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#003366',
              },
            },
          }}
        />
        <TextField
          label="Location"
          fullWidth
          margin="normal"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{
            backgroundColor: location ? '#eaf1f9' : '#f7f9fc',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: location ? '#003366' : '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#003366',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#003366',
              },
            },
          }}
        />
        <TextField
          label="Job Type"
          fullWidth
          margin="normal"
          value={type}
          onChange={(e) => setType(e.target.value)}
          sx={{
            backgroundColor: type ? '#eaf1f9' : '#f7f9fc',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: type ? '#003366' : '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#003366',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#003366',
              },
            },
          }}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{
            backgroundColor: description ? '#eaf1f9' : '#f7f9fc',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: description ? '#003366' : '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#003366',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#003366',
              },
            },
          }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Create Job
        </Button>
      </Box>
    </Box>
  );
};

export default CreateJob;

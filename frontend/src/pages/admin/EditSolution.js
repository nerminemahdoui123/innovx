import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Grid, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import * as Icons from '@mui/icons-material';

// Liste d'icônes pertinentes pour les différentes catégories
const iconOptions = [
  { name: 'Memory', component: Icons.Memory },
  { name: 'SmartToy', component: Icons.SmartToy },
  { name: 'Psychology', component: Icons.Psychology },
  { name: 'AutoAwesome', component: Icons.AutoAwesome },
  { name: 'Code', component: Icons.Code },
  { name: 'Web', component: Icons.Web },
  { name: 'Html', component: Icons.Html },
  { name: 'Css', component: Icons.Css },
  { name: 'Javascript', component: Icons.Javascript },
  { name: 'PhoneAndroid', component: Icons.PhoneAndroid },
  { name: 'MobileFriendly', component: Icons.MobileFriendly },
  { name: 'BarChart', component: Icons.BarChart },
  { name: 'PieChart', component: Icons.PieChart },
  { name: 'ShowChart', component: Icons.ShowChart },
  { name: 'TableChart', component: Icons.TableChart },
  { name: 'QueryStats', component: Icons.QueryStats },
  { name: 'School', component: Icons.School },
  { name: 'MenuBook', component: Icons.MenuBook },
  { name: 'CastForEducation', component: Icons.CastForEducation },
  { name: 'Biotech', component: Icons.Biotech },
  { name: 'HealthAndSafety', component: Icons.HealthAndSafety },
  { name: 'MedicalServices', component: Icons.MedicalServices },
  { name: 'Computer', component: Icons.Computer },
  { name: 'LaptopMac', component: Icons.LaptopMac },
  { name: 'Cloud', component: Icons.Cloud },
  { name: 'Visibility', component: Icons.Visibility },
  { name: 'Camera', component: Icons.Camera },
  { name: 'CenterFocusStrong', component: Icons.CenterFocusStrong },
  { name: 'Analytics', component: Icons.Analytics },
  { name: 'Assessment', component: Icons.Assessment },
  { name: 'Insights', component: Icons.Insights },
  { name: 'DataUsage', component: Icons.DataUsage },
  { name: 'Security', component: Icons.Security },
];

const EditSolution = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [image, setImage] = useState('');
  const [alert, setAlert] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSolution = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/solutions/${id}`);
        const data = await response.json();
        if (response.ok) {
          setTitle(data.title);
          setDescription(data.description);
          setIcon(data.icon);
          setImage(data.image || '');
        } else {
          setAlert(data.error || 'Failed to fetch solution.');
        }
      } catch (error) {
        console.error('Error:', error);
        setAlert('Failed to fetch solution.');
      }
    };
    fetchSolution();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !icon) {
      setAlert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8081/api/solutions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, icon, image }),
      });

      const data = await response.json();
      if (response.ok) {
        setAlert('Solution updated successfully!');
        setTimeout(() => navigate('/admin/manage-solutions'), 2000);
      } else {
        setAlert(data.error || 'Failed to update solution.');
      }
    } catch (error) {
      console.error('Error:', error);
      setAlert('Failed to update solution.');
    }
  };

  const getBackgroundColor = (value) => {
    return value ? '#f7f9fc' : '#ffffff';
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 800,
        mx: 'auto',
        mt: 4,
        p: 3,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        '@media (max-width: 600px)': {
          p: 2,
        },
      }}
    >
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ color: '#003366' }}
      >
        Edit Solution
      </Typography>
      {alert && (
        <Alert
          severity={alert.includes('successfully') ? 'success' : 'error'}
          sx={{ mb: 2 }}
        >
          {alert}
        </Alert>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            required
            sx={{ backgroundColor: getBackgroundColor(title) }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Icon</InputLabel>
            <Select
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              label="Icon"
              sx={{ backgroundColor: '#f7f9fc' }}
            >
              {iconOptions.map((iconOption) => (
                <MenuItem key={iconOption.name} value={iconOption.name}>
                  {iconOption.component && (
                    <iconOption.component
                      style={{ fontSize: 24, marginRight: 8, color: '#003366' }}
                    />
                  )}
                  {iconOption.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            required
            sx={{ backgroundColor: getBackgroundColor(description) }}
          />
          <TextField
            label="Image URL"
            variant="outlined"
            fullWidth
            margin="normal"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            sx={{
              backgroundColor: getBackgroundColor(image),
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
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
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          mt: 3,
          backgroundColor: '#003366',
          color: 'white',
          '&:hover': {
            backgroundColor: '#002244',
          },
        }}
      >
        Update
      </Button>
    </Box>
  );
};

export default EditSolution;

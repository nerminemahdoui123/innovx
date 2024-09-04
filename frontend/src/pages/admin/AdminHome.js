import React from 'react';
import { Typography, Box } from '@mui/material';

const AdminHome = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5', 
        
        paddingLeft: { xs: 2, md: 0 }, 
        paddingRight: { xs: 2, md: 4 }, 
        marginRight: { xs: 200, md: '240px' },
        width: '100%', 
      }}
    >
      <Box
        sx={{
          textAlign: 'left', 
          bgcolor: 'white', 
          color: '#333', 
          p: 4, 
          borderRadius: 4, 
          width: '100%',
          maxWidth: 600,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
          transition: 'box-shadow 0.3s ease-in-out', 
          '&:hover': {
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', 
          },
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: 'bold', mb: 3, color: '#0b1a3c' }} 
        >
          Welcome Admin
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: 'medium', color: '#555' }} 
        >
          Here you can manage blog posts, solutions, and offers.
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminHome;

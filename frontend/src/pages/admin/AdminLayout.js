import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, CssBaseline, AppBar, Toolbar, IconButton, Button } from '@mui/material';
import { Menu as MenuIcon, AdminPanelSettings as AdminPanelSettingsIcon, Work as WorkIcon, Logout as LogoutIcon, Article as ArticleIcon, Add as AddIcon } from '@mui/icons-material';

const drawerWidth = 240;

const AdminLayout = () => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
 
    navigate('/admin'); // Redirection après déconnexion
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: '#f0f0f0', 
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: 'auto' }}>
            
            <Typography variant="h6" noWrap component="div" sx={{ display: 'flex', alignItems: 'center' }}>
              <AdminPanelSettingsIcon sx={{color: 'black', mr: 1 }} /> {/* Icône administrateur */}
              <Link to="/admin/home" style={{ color: 'black', textDecoration: 'none' }}>
                Admin Dashboard
              </Link>
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#0d47a1', 
            color: '#fff', 
          },
        }}
        open
      >
        <Toolbar />
       
        <Box 
          sx={{ 
            bgcolor: 'white', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            p: 1, 
            mx: 2, 
            borderRadius: 1 
          }}>
          <Link 
            to="/" 
            style={{ 
              textDecoration: 'none', 
              fontWeight: 'bold', 
              fontSize: '1.2rem', 
              color: 'rgb(61, 20, 241)' 
            }}
          >
            innovX
          </Link>
        </Box>
        <List>
          <ListItem button component={Link} to="/admin/create-blog">
            <ListItemIcon><AddIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Create Blog" />
          </ListItem>
          <ListItem button component={Link} to="/admin/blogs">
            <ListItemIcon><ArticleIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Manage Blogs" />
          </ListItem>
          <ListItem button component={Link} to="/admin/create-job">
            <ListItemIcon><AddIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Create Offer" />
          </ListItem>
          <ListItem button component={Link} to="/admin/jobs">
            <ListItemIcon><WorkIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Manage Offers" />
          </ListItem>
          <ListItem button component={Link} to="/admin/create-solution">
            <ListItemIcon><AddIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Create Solution" />
          </ListItem>
          <ListItem button component={Link} to="/admin/manage-solutions">
            <ListItemIcon><AdminPanelSettingsIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Manage Solutions" />
          </ListItem>
        </List>

        <Box sx={{ mt: 'auto', p: 2 }}>
          <Button
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              bgcolor: '#0d47a1',
              color: '#fff',
              '&:hover': {
                bgcolor: '#003c8f',
              },
            }}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'inherit', 
          p: 3,
          ml: { sm: `${drawerWidth}px` },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Toolbar />
        <Outlet /> 
      </Box>
    </Box>
  );
};

export default AdminLayout;

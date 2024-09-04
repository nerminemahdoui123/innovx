import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActions, IconButton, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './AdminSolutions.css'; 

const AdminSolutions = () => {
  const [solutions, setSolutions] = useState([]);
  const [alert, setAlert] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(6); // Nombre de solutions par page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/solutions');
        const data = await response.json();
        if (response.ok) {
          setSolutions(data);
        } else {
          setAlert(data.error || 'Failed to fetch solutions.');
        }
      } catch (error) {
        console.error('Error:', error);
        setAlert('Failed to fetch solutions.');
      }
    };
    fetchSolutions();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/api/solutions/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setSolutions(solutions.filter((solution) => solution.id !== id));
        setAlert('Solution deleted successfully!');
      } else {
        const data = await response.json();
        setAlert(data.error || 'Failed to delete solution.');
      }
    } catch (error) {
      console.error('Error:', error);
      setAlert('Failed to delete solution.');
    }
  };

  const handleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Calculer les solutions à afficher pour la page courante
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedSolutions = solutions.slice(startIndex, endIndex);

  // Gérer le changement de page
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Pagination
  const totalPages = Math.ceil(solutions.length / rowsPerPage);

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#003366', mb: 4, textAlign: "center", maxWidth: "600px" }}>
        Manage Solutions
      </Typography>
      {alert && (
        <Alert
          severity={alert.includes('successfully') ? 'success' : 'error'}
          sx={{ mb: 2 }}
        >
          {alert}
        </Alert>
      )}
      <Grid container spacing={3} justifyContent="center">
        {paginatedSolutions.map((solution) => (
          <Grid item xs={12} sm={6} md={4} key={solution.id}>
            <Card className="card-container">
              <CardContent className="card-content">
                <Typography variant="h6" sx={{ color: '#003366', fontWeight: 500 }}>
                  {solution.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#555', mt: 1 }}
                  className={expandedId === solution.id ? 'full-description' : 'truncated-description'}
                >
                  {solution.description}
                </Typography>
              </CardContent>
              <CardActions className="card-actions-container">
                <IconButton
                  color="primary"
                  onClick={() => navigate(`/admin/edit-solution/${solution.id}`)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(solution.id)}
                >
                  <DeleteIcon />
                </IconButton>
                <Button
                  size="small"
                  onClick={() => handleExpand(solution.id)}
                  className="learn-more-button"
                >
                  {expandedId === solution.id ? 'Show Less' : 'Learn More'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          sx={{ mr: 2 }}
        >
          Previous
        </Button>
        {[...Array(totalPages).keys()].map(pageNumber => (
          <Button
            key={pageNumber + 1}
            onClick={() => handlePageChange(pageNumber + 1)}
            sx={{ mx: 1, backgroundColor: page === pageNumber + 1 ? '#003366' : '#e3f2fd', color: page === pageNumber + 1 ? '#fff' : '#003366' }}
          >
            {pageNumber + 1}
          </Button>
        ))}
        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          sx={{ ml: 2 }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default AdminSolutions;

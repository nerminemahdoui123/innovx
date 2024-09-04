import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Container, Paper, CircularProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SolutionDetail = () => {
  const { id } = useParams();
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSolution = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/solutions/${id}`);
        if (response.ok) {
          const data = await response.json();
          setSolution(data);
        } else {
          setError('Solution not found');
        }
      } catch (error) {
        setError('Error fetching solution');
      } finally {
        setLoading(false);
      }
    };
    fetchSolution();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress color="primary" />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', marginTop: 4 }}>
          <Typography variant="h5" color="error">
            {error}
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigate('/')}>
            Go to Home
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ marginBottom: '185px' }}>
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h3" gutterBottom sx={{ color: '#003366' }}>
          {solution.title}
        </Typography>
        <Box
  sx={{
    display: 'flex',
    justifyContent: 'center', 
    mb: 3, 
  }}
>
  <img
    src={solution.image}
    alt={solution.title}
    className="solution-image"
    style={{
      display: 'block',
      margin: '0 auto',
      maxWidth: '100%', 
      height: 'auto', 
      width: '100%', }}
  />
</Box>

        <Typography
          variant="body1"
          paragraph
          sx={{ color: '#333', fontSize: '1.1rem', whiteSpace: 'pre-line' }}
        >
          {solution.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/solutions')}
            sx={{
              color: '#003366',
              borderColor: '#003366',
              '&:hover': {
                backgroundColor: '#003366',
                color: '#fff',
              },
            }}
          >
            Back to Solutions
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/')}
            sx={{
              backgroundColor: '#333',
              '&:hover': {
                backgroundColor: '#555',
              },
            }}
          >
            Go to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SolutionDetail;

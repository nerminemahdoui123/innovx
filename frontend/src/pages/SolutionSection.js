import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Card, CardContent, CardActions, Button } from '@mui/material';
import * as Icons from '@mui/icons-material';
import './SolutionSection.css';

const SolutionSection = () => {
  const navigate = useNavigate();
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/solutions');
        const data = await response.json();
        setSolutions(data);
      } catch (error) {
        console.error('Error fetching solutions:', error);
      }
    };
    fetchSolutions();
  }, []);

  const truncateText = (text, maxLines) => {
    const lines = text.split('\n');
    return lines.slice(0, maxLines).join('\n') + (lines.length > maxLines ? '...' : '');
  };

  const handleReadMore = (id) => {
    navigate(`/solution/${id}`);
  };

  return (
    <Box className="solution">
       <h2>Solution</h2>
      <h1>Our Solution</h1>
      <Grid container spacing={4} justifyContent="center">
        {solutions.map((solution) => {
          const IconComponent = Icons[solution.icon];
          return (
            <Grid item xs={12} sm={6} md={4} key={solution.id}>
              <Card className="solution-card">
                <CardContent>
                  <div className="solution-icon-container">
                    {IconComponent && <IconComponent className="solution-icon" />}
                  </div>
                  <Typography variant="h6" className="solution-title">
                    {solution.title}
                    
                  </Typography>
                 
                  <div className="horizontal-line"></div>
                  <Typography variant="body2" className="solution-description">
                    {truncateText(solution.description, 1)} {/* Affiche les 4 premières lignes */}
                  </Typography>
         
                </CardContent>
                <img
            src={solution.image}
            alt={solution.title}
            className="solution-image"
            style={{
              display: 'block',
              margin: '0 auto',
              maxWidth: '200%',
              height: '100',
              width: '200px',
            }}/>
                <CardActions>
                  <Button
                    size="small"
                    className="read-more-button"
                    onClick={() => handleReadMore(solution.id)}
                    endIcon={<Icons.ArrowForward />}
                  >
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default SolutionSection;

import React, { useState } from 'react';
import { Box, Grid, Typography, Card, CardContent, Avatar, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import './TeamSection.css';

const initialLeaders = [
  { name: 'Flen Ben Flen', title: 'Head of Marketing', details: '' },
  { name: 'Flen Ben Flen', title: 'Co-founder', details: '' },
  { name: 'Flen Ben Flen', title: 'Head of Marketing', details: '' },
];

const allLeaders = [
  ...initialLeaders,
  { name: 'Flen ben Flen', title: 'Chief Technology Officer', details: '' },
  { name: 'Flen ben Flen', title: 'Head of Sales', details: '' },
  { name: 'Flen ben Flen', title: 'Head of HR', details: '' },

];

const TeamSection = () => {
  const [showAll, setShowAll] = useState(false);

  const handleToggleClick = () => {
    setShowAll(prev => !prev); 
  };

  return (
    <Box className="team-section">
      <h2>Team</h2>
      <h1>Our Leaders</h1>
      <Grid container spacing={4} justifyContent="center">
        {(showAll ? allLeaders : initialLeaders).map((leader, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className={`team-card ${index === 1 ? 'center-card' : ''}`}>
              <CardContent>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar className="team-avatar" />
                  <Typography variant="h6" className="team-name">
                    {leader.name}
                  </Typography>
                  <Typography variant="body2" className="team-title">
                    {leader.title}
                  </Typography>
                  {leader.details && (
                    <Typography variant="body2" className="team-details">
                      {leader.details}
                    </Typography>
                  )}
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <IconButton className="team-toggle-button" onClick={handleToggleClick}>
        {showAll ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>
    </Box>
  );
};

export default TeamSection;

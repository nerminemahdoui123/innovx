import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, IconButton, CardActions, Divider, Button, Grid } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const jobsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:8081/jobs');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8081/jobs/${id}`, {
        method: 'DELETE',
      });
      setJobs(jobs.filter(job => job.id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-job/${id}`);
  };

  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleExpand = (id) => {
    setExpandedJobId(expandedJobId === id ? null : id);
  };

  return (
    <Box sx={{
      backgroundColor: '#f4f6f8',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
      paddingBottom: 6,
      paddingLeft: 3,
      paddingRight: 3,
    }}>
      <Typography variant="h4" gutterBottom sx={{
        color: '#003366',
        textAlign: 'center',
        fontWeight: 600,
        mb: 4,
      }}>
        Manage Job Offers
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {currentJobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Card sx={{
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: '#fff',
              maxWidth: 345,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              mb: 4,
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" sx={{ color: '#003366', fontWeight: 500 }}>
                  {job.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {job.company}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {job.location} | {job.type}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body1" sx={{ color: '#333' }}>
                  {expandedJobId === job.id ? job.description : job.description.substring(0, 200) + (job.description.length > 200 ? '...' : '')}
                </Typography>
              </CardContent>
              <CardActions sx={{
                justifyContent: 'space-between',
                backgroundColor: '#f0f0f0',
                borderTop: '1px solid #ddd',
                padding: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {job.description.length > 200 && (
                    <Button
                      onClick={() => handleExpand(job.id)}
                      sx={{ color: '#003366', mr: 2 }}
                    >
                      {expandedJobId === job.id ? 'Show Less' : 'Learn More'}
                    </Button>
                  )}
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <IconButton 
                    onClick={() => handleEdit(job.id)} 
                    sx={{ 
                      color: '#003366',
                      '&:hover': { backgroundColor: '#e3f2fd' },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleDelete(job.id)}
                    sx={{ 
                      color: '#f44336',
                      '&:hover': { backgroundColor: '#ffcdd2' },
                      ml: 1
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          sx={{ mr: 2 }}
        >
          Previous
        </Button>
        {[...Array(totalPages).keys()].map(page => (
          <Button
            key={page + 1}
            onClick={() => handlePageChange(page + 1)}
            sx={{ mx: 1, backgroundColor: currentPage === page + 1 ? '#003366' : '#e3f2fd', color: currentPage === page + 1 ? '#fff' : '#003366' }}
          >
            {page + 1}
          </Button>
        ))}
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          sx={{ ml: 2 }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default AdminJobs;

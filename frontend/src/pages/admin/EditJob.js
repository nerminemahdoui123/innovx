import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';

const EditJob = () => {
    const { jobId } = useParams();
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [alert, setAlert] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`http://localhost:8081/jobs/${jobId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch job details');
                }
                const data = await response.json();
                setTitle(data.title || '');
                setCompany(data.company || '');
                setLocation(data.location || '');
                setType(data.type || '');
                setDescription(data.description || '');
            } catch (error) {
                console.error('Error fetching job details:', error);
                setAlert('Failed to load job details.');
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [jobId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !company || !location || !type || !description) {
            setAlert('All fields must be filled.');
            return;
        }

        const updatedJob = { title, company, location, type, description };

        try {
            const response = await fetch(`http://localhost:8081/jobs/${jobId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedJob),
            });
            if (!response.ok) {
                throw new Error('Failed to update job');
            }
            setAlert('Job offer updated successfully!');
            setTimeout(() => {
                navigate('/admin/jobs');
            }, 2000);
        } catch (error) {
            console.error('Error updating job:', error);
            setAlert('Failed to update job offer.');
        }
    };

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f4f6f8',
            }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 3,
            backgroundColor: '#f4f6f8',
            minHeight: '100vh',
        }}>
            <Typography variant="h4" gutterBottom sx={{
                color: '#003366',
                textAlign: 'center',
                fontWeight: 600,
                mb: 4,
            }}>
                Edit Job Offer
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
                />
                <TextField
                    label="Company"
                    fullWidth
                    margin="normal"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                <TextField
                    label="Location"
                    fullWidth
                    margin="normal"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <TextField
                    label="Job Type"
                    fullWidth
                    margin="normal"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
                <TextField
                    label="Description"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Update Job
                </Button>
            </Box>
        </Box>
    );
};

export default EditJob;

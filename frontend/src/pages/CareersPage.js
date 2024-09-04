import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBuilding, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import './Careers.css';
import { Button } from '@mui/material';


const CareersPage = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null); // Pour gérer les erreurs
  const navigate = useNavigate();

  useEffect(() => {
    // Fonction pour récupérer les emplois depuis le backend
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:8081/jobs');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to load job offers.'); // Afficher une erreur en cas d'échec
      }
    };
    fetchJobs();
  }, []);

  const handleApplyClick = (job) => {
    navigate(`/apply/${job.title}`, { state: { job } });
  };

  return (
    <div className="careers-page">
      <h2>Offers</h2>
      <h1>Our Offers</h1>
      {error && <p className="error-message">{error}</p>} {/* Afficher un message d'erreur s'il y en a un */}
      <div className="job-cards">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div className="job-card" key={job.id}>
              <h3>{job.title}</h3>
              <div className="job-details">
                <span className="icon"><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
                <span>{job.location}</span>
                <span className="icon"><FontAwesomeIcon icon={faBuilding} /></span>
                <span>{job.company}</span>
                <span className="icon"><FontAwesomeIcon icon={faBriefcase} /></span>
                <span>{job.type}</span>
              </div>
              <p>{job.description}</p>
              <button className="apply-button" onClick={() => handleApplyClick(job)}>Apply now</button>
            </div>
          ))
        ) : (
          <p>No job offers available.</p>
        )}
      </div>
      <footer>
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
      </footer>
    </div>
  );
};

export default CareersPage;

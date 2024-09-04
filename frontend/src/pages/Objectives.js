import React from 'react';
import './Objectives.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faLaptopCode, faFlask } from '@fortawesome/free-solid-svg-icons'; 
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function Objectives() {
  const navigate = useNavigate();
  return (
    <div className="objectives">
      <section className="intro-section">
        <h1>Our Objectives in IT and AI</h1>
        <p>At InnovX, we strive to push the boundaries of innovation in the fields of Information Technology and Artificial Intelligence.</p>
      </section>

      <section className="objective-cards">
        <div className="card" style={{ animationDelay: '0.2s' }}>
          <FontAwesomeIcon icon={faBrain} className="card-icon" />
          <h2>Cutting-Edge AI Solutions</h2>
          <p>We develop advanced AI systems that drive efficiency and intelligence across various industries.</p>
        </div>
        <div className="card" style={{ animationDelay: '0.4s' }}>
          <FontAwesomeIcon icon={faLaptopCode} className="card-icon" />
          <h2>Innovative IT Services</h2>
          <p>Our IT services are designed to provide scalable and secure solutions tailored to your business needs.</p>
        </div>
        <div className="card" style={{ animationDelay: '0.6s' }}>
          <FontAwesomeIcon icon={faFlask} className="card-icon" />
          <h2>Research and Development</h2>
          <p>We invest in research to stay at the forefront of technological advancements in AI and IT.</p>
        </div>
      
      </section>
      <div>
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
    </div>
    </div>
  
  );
}

export default Objectives;

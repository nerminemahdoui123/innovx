import React, { useState } from 'react';
import './ProjectsPage.css';
import Why from './Why';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const domains = [
  {
    title: 'Industry',
    description: `AI solutions tailored for industrial applications. These technologies enhance operational efficiency, safety, and quality control through advanced data analysis and automation.`,
    image: 'https://th.bing.com/th/id/R.34f9efdd7a0e934f178b0a3e396db1fb?rik=Fg1Hh%2b1FagehfQ&pid=ImgRaw&r=0.jpg', // Replace with the path to your image.
    points: [
      'Predictive maintenance systems to foresee equipment failures and reduce downtime.',
      'Quality control solutions using computer vision to inspect and ensure product standards.'
    ]
  },
  {
    title: 'Education',
    description: `AI-driven tools designed to support teaching and learning. These solutions provide personalized educational experiences and assist educators in managing and assessing student performance.`,
    image: 'https://th.bing.com/th/id/R.e13fb52334a1925066f774182d22fc6f?rik=57HTDhdXvihLNg&pid=ImgRaw&r=0.jpg',
    points: [
      'Virtual tutors offering tailored support and interactive learning experiences.',
      'Automated grading systems to streamline assessment and feedback processes.'
    ]
  },
  {
    title: 'Healthcare',
    description: `Innovative AI solutions for the healthcare sector focused on improving diagnostic accuracy, patient monitoring, and personalized treatment plans.`,
    image: 'https://th.bing.com/th/id/OIP.RiJ029RKERqTdRKnRlj61QHaE8?rs=1&pid=ImgDetMain.jpg', 
    points: [
      'Advanced diagnostic tools for analyzing medical imaging and detecting anomalies.',
      'Remote monitoring systems for tracking patient health metrics and managing chronic conditions.'
    ]
  },
  {
    title: 'Business Intelligence (BI)',
    description: `AI solutions that enhance business decision-making through data analysis. These tools offer insights, visualizations, and predictive analytics to drive strategic planning and operational efficiency.`,
    image: 'https://th.bing.com/th/id/OIP.UB-mRTOkwFT_hY91kpJHvwHaG_?rs=1&pid=ImgDetMain.jpg', 
    points: [
      'Predictive analytics for forecasting business trends and customer behaviors.',
      'Interactive dashboards providing real-time data visualization and business insights.'
    ]
  }
  // Add more domains here as needed
];

const ProjectsPage = () => {
  
const navigate = useNavigate();
  // State to keep track of the selected domain index
  const [selectedDomainIndex, setSelectedDomainIndex] = useState(0);

  // Handle tab click
  const handleTabClick = (index) => {
    setSelectedDomainIndex(index);
  };

  return (
    <div>
      <Why />
      <div className="domain-title">InnovX Domains</div>
      <div className="domain-container">
        <div className="domain-tabs">
          {domains.map((domain, index) => (
            <div
              key={index}
              className={`tab ${index === selectedDomainIndex ? 'active' : ''}`}
              onClick={() => handleTabClick(index)}
            >
              <div className="tab-icon"></div>
              <div className="tab-title">{domain.title}</div>
            </div>
          ))}
        </div>
        <div className="domain-content">
          {domains[selectedDomainIndex] && (
            <div className="domain-card">
              <h2>{domains[selectedDomainIndex].title}</h2>
              <p>{domains[selectedDomainIndex].description}</p>
              <ul>
                {domains[selectedDomainIndex].points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
              <img src={domains[selectedDomainIndex].image} alt={domains[selectedDomainIndex].title} />
            </div>
          )}
        </div>
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

export default ProjectsPage;

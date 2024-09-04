import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Why.css';
import image5 from '../assets/image5.jpg';

const Why = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/projects');
  };

  return (
    <section className="why-section" onClick={handleRedirect}>
      <div className="what-we-do">
        <div className="content-container">
          <div className="image-container">
          <img src={image5}  alt="AI brain" />
          </div>
          <div className="text-container">
            <h2>What We Do?</h2>
            <h1>We Develop Products That People Love to Use.</h1>
            <p>At InnovX, we specialize in crafting advanced solutions that harness the power of Information Technology and Artificial Intelligence to solve real-world problems. Our expertise spans a wide range of applications, from developing cutting-edge AI systems that drive efficiency and innovation to delivering scalable IT services tailored to meet the unique needs of businesses. We focus on research and development to stay at the forefront of technology, ensuring our solutions are not only effective but also transformative. .</p>
            <div className="cards-container">
              <div className="card">
                <i className="fas fa-lightbulb"></i>
                <h3>Our Vision</h3>
                <p>Empowering Tomorrow’s Innovations.</p>
              </div>
              <div className="card">
                <i className="fas fa-bullseye"></i>
                <h3>Our Goal</h3>
                <p>Driving Excellence in Technology.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

 
    </section>
   
  );
};

export default Why;

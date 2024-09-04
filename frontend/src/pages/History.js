import React, { useState } from 'react';
import './History.css';
import About from './About';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';

const History = ({ handleHideHistory }) => {
  const [showAbout] = useState(false);
  const [showHowWorks] = useState(true);

  const toggleHowWorks = () => {
    handleHideHistory();
  };

  return (
    <div className="historypage">
      <section className="history">
        <h2>Our History</h2>
        <div className="history-content">
          <div className="history-item">
          <img src={image3}   alt="Historical event 1" />
            <div className="history-text">
              <h3>Our Vision and Beginnings</h3>
              <p>InnovX was founded with a vision to revolutionize the fields of Information Technology and Artificial Intelligence. Our journey began with a commitment to push the boundaries of innovation and deliver intelligent solutions that address complex challenges across various industries. From the outset, we aimed to integrate cutting-edge technology with practical applications, setting the stage for our future as leaders in AI and IT services.</p>
            </div>
          </div>
          <div className="history-item">
          <img src={image4}   alt="Historical event 2" />
            <div className="history-text">
              <h3>Our Growth and Achievements</h3>
              <p>Since our inception, our growth has been driven by a passion for research and development, along with a dedication to creating solutions that enhance operational efficiency and drive meaningful progress. InnovX’s history is marked by a series of milestones that highlight our relentless pursuit of excellence. From our humble beginnings, we have evolved into a trailblazer in the tech industry, continually shaping the future of technology with our groundbreaking advancements.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-works">
        <h2>How InnovX Works</h2>
        <div className="steps" style={{ display: showHowWorks ? 'grid' : 'none' }}>
          <div className="step">
            <h3>1. Assemble the right team</h3>
            <p>Building a team of skilled professionals who bring diverse expertise and innovative thinking to every project is essential for success..</p>
          </div>
          <div className="step">
            <h3>2. Tech architecture</h3>
            <p>Designing a robust and scalable technical framework that supports both current needs and future growth, ensuring efficiency and stability.</p>
          </div>
          <div className="step">
            <h3>3. Code reviews</h3>
            <p>Implementing thorough code reviews to maintain high standards of quality, identify potential issues early, and foster best practices.</p>
          </div>
          <div className="step">
            <h3>4. Sprint planning</h3>
            <p>Organizing and prioritizing tasks in sprint planning to ensure that every development cycle is focused, efficient, and aligned with project goals.</p>
          </div>
          <div className="step">
            <h3>5. Standups & weekly demos</h3>
            <p>Holding daily standups and weekly demos to track progress, address challenges, and demonstrate completed work, fostering transparency and collaboration.</p>
          </div>
          <div className="step">
            <h3>6. Iterative delivery</h3>
            <p>Adopting an iterative approach to deliver incremental improvements, allowing for continuous feedback and rapid adjustments to enhance the final product.</p>
          </div>
        </div>
        <button onClick={toggleHowWorks} className="toggle-button">
          {!showHowWorks ? '▼' : '▲'}
        </button>
      </section>

      {showAbout && <About />}
    </div>
  );
};

export default History;

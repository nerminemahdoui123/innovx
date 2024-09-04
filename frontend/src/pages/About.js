import React from 'react';
import History from './History';
import './HomePage';
import image2 from '../assets/image2.jpg';

const About = () => {
  const [showHistory, setShowHistory] = React.useState(false);

  const handleShowHistory = () => {
    setShowHistory((prev)=>!prev);
  };
  const handleHideHistory = () => {
    setShowHistory(false);
  };
  return (
    <>
     <section className="about">
      <div className="about-content">
        <h2>About InnovX Company</h2>
        <h3>Shaping the Future with Intelligent Solutions</h3>
        <p>Welcome to InnovX, where innovation meets intelligence. At InnovX, we are a forward-thinking startup dedicated to developing cutting-edge artificial intelligence solutions tailored to transform industries. Our expertise spans a wide range of applications, including education, computer vision, biomedical technologies, generative AI, business intelligence, and predictive trading. We are committed to pushing the boundaries of technology to deliver solutions that drive progress and create value for our clients. Join us on our journey to shape the future with intelligence..</p>
        <button onClick={handleShowHistory}>{!showHistory ? "See more" : "See less"} </button>
      </div>
      <img src={image2}  alt="Logo AI" />
    </section>
    {showHistory && <History  handleHideHistory={handleHideHistory}/>}
    </>
   
  );
};

export default About;

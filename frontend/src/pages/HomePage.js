import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './HomePage.css';
import Values from './Values';
import Why from './Why';
import Contact from './Contact';
import About from './About';
import SolutionSection from './SolutionSection';
import Chatbot from './Chatbot';

import image1 from '../assets/image1.jpg';


// Fonction pour formater les dates
const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

const HomePage = () => {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch('http://localhost:8081/blogs')
      .then(response => response.json())
      .then(data => {
        const sortedBlogs = data.sort((a, b) => new Date(b.date) - new Date(a.date)); // Tri des blogs par date
        setRecentBlogs(sortedBlogs.slice(0, 3)); // Obtenez les 3 derniers blogs
      })
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  // Fonction pour gérer la redirection
  const handleReadMoreClick = () => {
    navigate('/objectives');
  };

  return (
    <div className="homepage">
      <section className="hero">
        <div className="hero-content">
          <h1>Empowering Tomorrow with Intelligent Solutions</h1>
          <p>At InnovX, we strive to push the boundaries of innovation in the fields of Information Technology and Artificial Intelligence.</p>
          <button onClick={handleReadMoreClick}>Read More</button> 
        </div>
        <img src={image1} alt="Intelligence artificielle" />
      </section>
      <About />
      <Values />
      <Why />
      {/* <teamSection> pour la partie team et importe en haut la teamSection componenet pour affiché le team*/}
    
      <SolutionSection />
      <section className="recent-blogs">
        <h2>Latest Blogs</h2>
        <h1>Our Latest blogs</h1>
        <div className="recent-blogs-container">
          {recentBlogs.map((post) => (
            <div key={post.id} className="blog-card">
              <img src={post.image} alt={post.title} className="blog-image" />
              <h2 className="blog-title">{post.title}</h2>
              <p className="blog-date">{formatDate(post.date)}</p>
              <Link to={`/blog/${post.id}`} className="read-more">Read More &rarr;</Link>
            </div>
          ))}
        </div>
        <Link to="/blog" className="view-all-blogs">See all blogs</Link>
      </section>
      <Contact />
      
      <Chatbot/>
     
    </div>
    
  );
};

export default HomePage;

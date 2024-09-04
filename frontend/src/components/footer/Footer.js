import React from 'react';
import './Footer.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column social">
          <p className="footer-text">
            It is a long established fact that a reader will be distracted by the
            readable content of a page when looking at its layout.
          </p>
          <div className="social-icons">
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} color='white' />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} color='white'/>
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} color='white'/>
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} color='white'/>
            </a>
          </div>
        </div>
        <div className="footer-column solutions">
          <h2>Solutions</h2>
          <ul>
            <li>
              <Link to="/solution/2">Computer vision</Link>
            </li>
            <li>
              <Link to="/solution/9">BI and trading prediction</Link>
            </li>
            <li>
              <Link to="/solution/1">AI for education</Link>
            </li>
            <li>
              <Link to="/solution/8">Generative AI</Link>
            </li>
            <li>
              <Link to="/solution/3">Biomedical</Link>
            </li>
            <li>
              <Link to="/solution/10">Coaching and consulting</Link>
            </li>
          </ul>
        </div>
        <div className="footer-column solutions">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/solutions">Our Solutions</Link>
            </li>
            <li>
              <Link to="/careers">Careers</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column subscribe">
          <h2>Subscribe Us</h2>
          <form style={{alignItems:'start'}}>
            <input type="email" placeholder="Email" />
            <button type="submit" style={{maxWidth:'200px'}}>Submit</button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

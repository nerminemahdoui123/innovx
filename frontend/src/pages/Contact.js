import React, { useState } from 'react';
import './Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faInstagram, faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [alert, setAlert] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setAlert('Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setAlert('Failed to send message. Please try again.');
      }
    } catch (error) {
      setAlert('An error occurred. Please try again.');
      console.error('Error sending message:', error);
    }

    // Efface l'alerte après 10 secondes
    setTimeout(() => {
      setAlert('');
    }, 10000);
  };

  return (
    <section className="contact-section">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Contact Us</h2>
      </div>
      <div className="contact-container">
        <div className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" onClick={handleSubmit}>
            Send Now
          </button>
          {alert && <p className="alert">{alert}</p>}
        </div>
        <div className="contact-info">
          <div>
            <FontAwesomeIcon icon={faPhone} />
            <div>
              <p>Call Anytime :</p>
              <p>+216 444545454<br />+216 114545454</p>
            </div>
          </div>
          <div>
            <FontAwesomeIcon icon={faEnvelope} />
            <div>
              <p>Send Email :</p>
              <a href="mailto:connect@innova.com">connect@innova.com</a>
            </div>
          </div>
          <div>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <div>
              <p>Visit Us :</p>
              <p>Monastir 5000, Tunisia</p>
            </div>
          </div>
          <div className="social-icons">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperclip, faEnvelope, faUser, faPhone,
  faHome, faBriefcase, faCalendar, faGlobe
} from '@fortawesome/free-solid-svg-icons';
import './ApplicationForm.css';


const ApplicationForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { job } = state || {};
  const jobTitle = job ? job.title : 'Unknown Job Title';

  const [formData, setFormData] = useState({
    cv: null,
    coverLetter: null,
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    description: '',
    experience: '',
    dateAvailable: '',
    country: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('cv', formData.cv);
    formDataToSend.append('coverLetter', formData.coverLetter);
    formDataToSend.append('firstName', formData.firstName);
    formDataToSend.append('lastName', formData.lastName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('experience', formData.experience);
    formDataToSend.append('dateAvailable', formData.dateAvailable);
    formDataToSend.append('country', formData.country);
    formDataToSend.append('jobTitle', jobTitle);

    try {
      const response = await fetch('http://localhost:8081/send-application', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        alert('Your application has been sent!');
        navigate('/careers');
      } else {
        throw new Error('Failed to send application');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="application-form-container">
      <h2>Apply for {jobTitle} job</h2>
      <form onSubmit={handleSubmit} className="application-form">
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faUser} /> Surname:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faUser} /> First name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faEnvelope} /> Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faPhone} /> Phone:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faHome} /> Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faGlobe} /> Country:
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">Select your country</option>
              <option value="Ariana">Ariana</option>
              <option value="Beja">Beja</option>
              <option value="Ben Arous">Ben Arous</option>
              <option value="Bizerte">Bizerte</option>
              <option value="Gabes">Gabes</option>
              <option value="Gafsa">Gafsa</option>
              <option value="Jendouba">Jendouba</option>
              <option value="Kairouan">Kairouan</option>
              <option value="Kasserine">Kasserine</option>
              <option value="Kebili">Kebili</option>
              <option value="La Manouba">La Manouba</option>
              <option value="Le Kef">Le Kef</option>
              <option value="Mahdia">Mahdia</option>
              <option value="Medenine">Medenine</option>
              <option value="Monastir">Monastir</option>
              <option value="Nabeul">Nabeul</option>
              <option value="Sfax">Sfax</option>
              <option value="Sidi Bouzid">Sidi Bouzid</option>
              <option value="Siliana">Siliana</option>
              <option value="Sousse">Sousse</option>
              <option value="Tataouine">Tataouine</option>
              <option value="Tozeur">Tozeur</option>
              <option value="Tunis">Tunis</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faCalendar} /> Date Available:
            <input
              type="date"
              name="dateAvailable"
              value={formData.dateAvailable}
              onChange={handleChange}
              min={getCurrentDate()}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faBriefcase} /> Experience:
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faPaperclip} /> CV:
            <input
              type="file"
              name="cv"
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faPaperclip} /> Cover Letter:
            <input
              type="file"
              name="coverLetter"
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faPaperclip} /> Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
        </div>
        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Application'}
        </Button>
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
      </form>
    
    </div>
    
    
  );
};

export default ApplicationForm;

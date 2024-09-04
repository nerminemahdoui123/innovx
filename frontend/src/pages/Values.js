import React from 'react';
import './Values.css'; 

const Values = () => {
  const valuesData = [
    {
      icon: 'fas fa-plus-circle',
      title: 'Positive Impact',
      description: 'Utilize AI to create a positive impact on the world, contributing to solving global problems and improving people\'s lives.',
      number: '01'
    },
    {
      icon: 'fas fa-handshake',
      title: 'Trust',
      description: 'Build trust with customers and partners by ensuring data reliability, security, and privacy.',
      number: '02'
    },
    {
      icon: 'fas fa-users',
      title: 'Engagement',
      description: 'Drive employee engagement by recognizing their contributions and valuing their ideas, offering opportunities for professional development.',
      number: '03'
    },
    {
      icon: 'fas fa-balance-scale',
      title: 'Ethics',
      description: 'Develop and use AI ethically and responsibly, ensuring transparency, fairness, and the absence of bias.',
      number: '04'
    }
  ];

  return (
    <section className="values-section">
      <h2>Values</h2>
      <h1>Our values</h1>
      <div className="values-container">
        {valuesData.map((value, index) => (
          <div className="value-card" key={index} data-number={value.number}>
            <i className={value.icon}></i>
            <h3>{value.title}</h3>
            <p>{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Values;

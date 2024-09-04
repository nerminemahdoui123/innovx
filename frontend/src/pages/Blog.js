import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Blog.css';
import { Button } from '@mui/material';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8081/blogs')
      .then(response => response.json())
      .then(data => setBlogPosts(data))
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  const handleReadMore = (id) => {
    navigate(`/blog/${id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="blog-section">
      <div className="blog-titles">
        <h2>Blog</h2>
        <h1>Our Blog</h1>
      </div>
      <div className="blog-cards">
        {blogPosts.map((post) => (
          <div key={post.id} className="blog-card">
            <img src={post.image} alt={post.title} className="blog-image" />
            <h2 className="blog-title">{post.title}</h2>
            <p className="blog-date">{formatDate(post.date)}</p>
            <div 
              className="blog-content" 
              dangerouslySetInnerHTML={{ __html: post.content.slice(0, 100) + '...' }} 
            />
            <button onClick={() => handleReadMore(post.id)} className="read-more">
              Read More &rarr;
            </button>
          </div>
        ))}
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

export default Blog;

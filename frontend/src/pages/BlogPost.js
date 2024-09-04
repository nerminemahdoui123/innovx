import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BlogPost.css';
import { Button } from '@mui/material';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8081/blogs/${id}`)
      .then(response => response.json())
      .then(data => setBlog(data))
      .catch(error => console.error('Error fetching blog:', error));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="blog-post">
      <h1 className="blog-title">{blog.title}</h1>
      <p className="blog-date">{formatDate(blog.date)}</p>
      <img src={blog.image} alt={blog.title} className="blog-image" />
      <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate('/blog')}
        sx={{
          color: '#003366',
          borderColor: '#003366',
          '&:hover': {
            backgroundColor: '#003366',
            color: '#fff',
          },
        }}
      >
        Back to blogs
      </Button>
    </div>
  );
};

export default BlogPost;

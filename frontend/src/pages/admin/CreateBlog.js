import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateBlog = () => {
  const { blogId } = useParams();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [alert, setAlert] = useState('');
  const [focused, setFocused] = useState({ title: false, date: false, image: false, content: false });
  const navigate = useNavigate();

  useEffect(() => {
    if (blogId) {
      fetch(`http://localhost:8081/blogs/${blogId}`)
        .then((response) => response.json())
        .then((data) => {
          setTitle(data.title);
          setDate(formatDateForInput(data.date));
          setImage(data.image);
          setContent(data.content);
        })
        .catch((error) => console.error('Error fetching blog:', error));
    }
  }, [blogId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !date || !image || !content) {
      setAlert('All fields must be filled.');
      return;
    }

    const blogData = {
      title,
      date: convertDateToISO(date),
      image,
      content,
    };

    const requestOptions = {
      method: blogId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogData),
    };

    fetch(`http://localhost:8081/blogs${blogId ? `/${blogId}` : ''}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setAlert(blogId ? 'Blog updated successfully!' : 'Blog added successfully!');
        setTimeout(() => {
          navigate('/admin/blogs');
        }, 2000);
      })
      .catch((error) => console.error('Error saving blog:', error));
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return ''; 
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${year}-${month}-${day}`;
  };

  const convertDateToISO = (dateString) => {
    if (!dateString) return ''; 
    const [year, month, day] = dateString.split('-');
    return `${year}-${month}-${day}`;
  };

  const getBackgroundColor = (value) => {
    return value ? '#e3f2fd' : '#f7f9fc';
  };

  // Configuration des modules pour ReactQuill
  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      [{ 'color': [] }, { 'background': [] }],          
      ['clean']                                         
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'color', 'background'              
  ];

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: '600px',
        margin: 'auto',
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        '@media (max-width: 600px)': {
          p: 2,
        },
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, color: '#003366', textAlign: 'center' }}>
        {blogId ? 'Edit Blog' : 'Create Blog'}
      </Typography>
      {alert && (
        <Alert
          severity={alert.includes('successfully') ? 'success' : 'error'}
          sx={{ mb: 2 }}
        >
          {alert}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
            backgroundColor: getBackgroundColor(title),
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: focused.title ? '#003366' : '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#003366',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#003366',
              },
            },
          }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setFocused((prev) => ({ ...prev, title: true }))}
          onBlur={() => setFocused((prev) => ({ ...prev, title: false }))}
        />
        <TextField
          type="date"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
            backgroundColor: getBackgroundColor(date),
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: focused.date ? '#003366' : '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#003366',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#003366',
              },
            },
          }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onFocus={() => setFocused((prev) => ({ ...prev, date: true }))}
          onBlur={() => setFocused((prev) => ({ ...prev, date: false }))}
        />
        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
            backgroundColor: getBackgroundColor(image),
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: focused.image ? '#003366' : '#ccc',
              },
              '&:hover fieldset': {
                borderColor: '#003366',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#003366',
              },
            },
          }}
          value={image}
          onChange={(e) => setImage(e.target.value)}
          onFocus={() => setFocused((prev) => ({ ...prev, image: true }))}
          onBlur={() => setFocused((prev) => ({ ...prev, image: false }))}
        />
        <ReactQuill
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          theme="snow"
          style={{
            height: '200px',
            marginBottom: '20px',
            backgroundColor: getBackgroundColor(content),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          {blogId ? 'Update Blog' : 'Create Blog'}
        </Button>
      </form>
    </Box>
  );
};

export default CreateBlog;

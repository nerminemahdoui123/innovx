import React from 'react';
import { Box, Typography, Card, CardContent, CardActions, CardMedia, Button, IconButton, Avatar, CardHeader, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import parse from 'html-react-parser';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const AdminBlogs = () => {
  const [blogPosts, setBlogPosts] = React.useState([]);
  const [expanded, setExpanded] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const blogsPerPage = 3;
  const navigate = useNavigate();

  React.useEffect(() => {
    fetch('http://localhost:8081/blogs')
      .then(response => response.json())
      .then(data => setBlogPosts(data))
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  const handleExpandClick = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8081/blogs/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setBlogPosts(prevBlogs => prevBlogs.filter(blog => blog.id !== id));
      }
    })
    .catch(error => console.error('Error deleting blog:', error));
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-blog/${id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  const truncateContent = (content, length) => {
    const textContent = content.replace(/<[^>]+>/g, ''); // Remove HTML tags for truncation
    if (textContent.length > length) {
      return `${textContent.substring(0, length)}...`;
    }
    return textContent;
  };

  // Pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogPosts.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogPosts.length / blogsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Box sx={{
      backgroundColor: '#f4f6f8',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
      paddingBottom: 6, 
      paddingLeft: 3,   
      paddingRight: 3,  
    }}>
      <Typography variant="h4" gutterBottom sx={{
        color: '#003366',
        textAlign: 'center',
        fontWeight: 600,
        mb: 4,
      }}>
        Manage Blogs
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {currentBlogs.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card sx={{
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: '#fff',
              maxWidth: 345,
              width: '100%',
              height: '100%', 
              display: 'flex',
              flexDirection: 'column',
              mb: 4, 
            }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                    A
                  </Avatar>
                }
                title={post.title}
                subheader={formatDate(post.date)} 
              />
              <CardMedia
                component="img"
                height="194"
                image={post.image}
                alt={post.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography paragraph sx={{ whiteSpace: 'pre-line' }}>
                  {expanded === post.id ? parse(post.content) : truncateContent(post.content, 150)}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <ExpandMore
                  expand={expanded === post.id}
                  onClick={() => handleExpandClick(post.id)}
                  aria-expanded={expanded === post.id}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
                <IconButton 
                  onClick={() => handleEdit(post.id)} 
                  sx={{
                    color: '#003366',
                    '&:hover': { backgroundColor: '#e3f2fd' },
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  onClick={() => handleDelete(post.id)}
                  sx={{
                    color: '#f44336',
                    '&:hover': { backgroundColor: '#ffcdd2' },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          sx={{ mr: 2 }}
        >
          Previous
        </Button>
        {[...Array(totalPages).keys()].map(page => (
          <Button
            key={page + 1}
            onClick={() => handlePageChange(page + 1)}
            sx={{ mx: 1, backgroundColor: currentPage === page + 1 ? '#003366' : '#e3f2fd', color: currentPage === page + 1 ? '#fff' : '#003366' }}
          >
            {page + 1}
          </Button>
        ))}
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          sx={{ ml: 2 }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default AdminBlogs;

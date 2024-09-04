import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import Contact from './pages/Contact';
import SolutionSection from './pages/SolutionSection';
import CareersPage from './pages/CareersPage';
import Blog from './pages/Blog';
import About from './pages/About';
import History from './pages/History';
import LoginForm from './pages/admin/LoginForm';
import AdminHome from './pages/admin/AdminHome';
import CreateBlog from './pages/admin/CreateBlog';
import CreateJob from './pages/admin/CreateJob';
import AdminLayout from './pages/admin/AdminLayout';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminJobs from './pages/admin/AdminJobs';
import EditJob from './pages/admin/EditJob';
import BlogPost from './pages/BlogPost';
import CreateSolution from './pages/admin/CreateSolution';
import EditSolution from './pages/admin/EditSolution';
import AdminSolutions from './pages/admin/AdminSolutions';
import SolutionDetail from './pages/SolutionDetail';
import ApplicationForm from './pages/ApplicationForm';
import Objectives from './pages/Objectives'; 
import ProjectsPage from './pages/ProjectsPage';



function App() {
  return (
    <Router>
      <Routes>
        {/* Routes avec Layout pour user*/}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/solutions" element={<SolutionSection />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<LoginForm />} />
          <Route path="/history" element={<History />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/solution/:id" element={<SolutionDetail />} />
          <Route path="/apply/:jobTitle" element={<ApplicationForm />} />
          <Route path="/objectives" element={<Objectives />} /> 
          <Route path="/projects" element={<ProjectsPage />} />
        </Route>
        
        {/* Routes sans Layout pour la partie d'admin */}
        <Route element={<AdminLayout />}>
  <Route path="/admin/home" element={<AdminHome />} />
  <Route path="/admin/create-blog" element={<CreateBlog />} />
  <Route path="/admin/create-job" element={<CreateJob />} />
  <Route path="/admin/blogs" element={<AdminBlogs />} />
  <Route path="/admin/edit-blog/:blogId" element={<CreateBlog />} />
  <Route path="/admin/jobs" element={<AdminJobs />} />
  <Route path="/admin/edit-job/:jobId" element={<EditJob />} />
  <Route path="/admin/create-solution" element={<CreateSolution />} />
  <Route path="/admin/manage-solutions" element={<AdminSolutions />} />
  <Route path="/admin/edit-solution/:id" element={<EditSolution />} />

  <Route path="/admin/manage-solutions" element={<AdminSolutions />} />
</Route>

      
      </Routes>
    </Router>
  );
}

export default App;

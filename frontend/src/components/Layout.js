import Navbar from './navbar/Navbar';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';
import ScrollToTopButton from '../pages/ScrollToTopButton';

const Layout = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      
      {/* Conteneur pour le bouton et le footer */}
      <div style={{ position: 'relative' }}>
        <ScrollToTopButton />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

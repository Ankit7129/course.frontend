// src/components/Shared/Header.js

import React from 'react';
import './Header.css'; // Importing the CSS file

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="site-title">Course Platform</h1>
        <p className="tagline">Empowering Education, One Course at a Time.</p> {/* Creative Tagline */}
        
      </div>
  
      {/* Bubbles for floating animation */}
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
    </header>
  );
};

export default Header;

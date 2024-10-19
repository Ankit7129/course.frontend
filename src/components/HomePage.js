// src/components/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Importing the CSS file for HomePage

const HomePage = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Welcome to JAMBAVANTHA</h1>
        <p className="tagline">Your Ultimatimate Destination for Quality education</p>
        
        {/* Register button styles */}
        <div className="register-links">
          <Link to="/login/student" className="register-button">Student Login</Link>
          <Link to="/login/college" className="register-button">College Login</Link>
        </div>
      </div>
      
      {/* Bubbles for floating animation */}
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
    </div>
  );
};

export default HomePage;

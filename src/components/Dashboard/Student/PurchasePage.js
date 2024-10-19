// PurchasePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
//import './PurchasePage.css'; // Optional: Add a CSS file for styling

const PurchasePage = () => {
  const navigate = useNavigate();

  const handleBackToCourses = () => {
    navigate('/courses'); // Navigate back to the course list
  };

  return (
    <div className="purchase-page-container">
      <h1>Feature Under Development</h1>
      <p>We are currently working on this portion of the website. Thank you for your patience and cooperation. Please check back soon!</p>
      <button onClick={handleBackToCourses} className="back-button">Back to Courses</button>
    </div>
  );
};

export default PurchasePage;

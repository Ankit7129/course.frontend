import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CollegeDashboard.css'; // Import CSS for styling

const CollegeDashboard = () => {
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Check if the user is authenticated by checking for a token
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token is found, redirect to login page
      navigate('/login/college');
    } else {
      // Prevent the user from going back to the login page after login
      window.history.pushState(null, null, window.location.href);
      window.addEventListener('popstate', () => {
        window.history.pushState(null, null, window.location.href);
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    // Redirect to home page after logout
    navigate('/');
  };

  // Retrieve college information from localStorage
  const collegeId = localStorage.getItem('collegeId'); // Added college ID
  const collegeName = localStorage.getItem('collegeName');
  const collegeEmail = localStorage.getItem('adminEmail');
  const collegePhone = localStorage.getItem('phoneNumber');
  const registrationNumber= localStorage.getItem('registrationNumber')
  const collegeLocation = localStorage.getItem('collegeLocation');
 
  //const collegeCourses = JSON.parse(localStorage.getItem('collegeCourses')) || []; // Parse courses array

  return (
    <div className="college-dashboard">
      <h1>Welcome to the College Dashboard!</h1>
      
      <div className="college-info">
        <h2>College Information</h2>
        <p>College ID: {collegeId}</p> {/* Display College ID */}
        <p>Name: {collegeName}</p>
        <p>Email: {collegeEmail}</p>
        <p>Phone Number: {collegePhone}</p>
        <p>Location: {collegeLocation}</p>
        <p>Registartion Number:{registrationNumber}</p>
        
        {/*<p>Number of Courses: {collegeCourses.length}</p> Right now its not wrking soit is commented*/}
      </div>

      <div className="button-group">
        <button onClick={() => navigate('/add-course')}>Add New Course</button>
        <button onClick={() => navigate('/manage-courses')}>View and Manage Courses</button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Bubbles for floating animation */}
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
    </div>
  );
};

export default CollegeDashboard;

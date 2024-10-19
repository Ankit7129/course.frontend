import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Importing the CSS file

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

const Login = ({ userType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // To handle error messages
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // API endpoint based on the userType (student or college)
    const apiUrl = userType === 'student' 
      ? `${BASE_URL}/api/students/login` 
      : `${BASE_URL}/api/colleges/login`;

    try {
      // Sending login request to appropriate endpoint
      const response = await axios.post(apiUrl, {
         adminEmail: email , email, // Always use 'email' for both student and college
        password,
      });

      // If successful login, store token and user data
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token); // Store token

        if (userType === 'college' && response.data.college) {
          // Store the college-related data after successful login
          localStorage.setItem('collegeId', response.data.collegeID);
          localStorage.setItem('collegeName', response.data.college.collegeName);
          localStorage.setItem('adminEmail', response.data.college.adminEmail);
          localStorage.setItem('phoneNumber', response.data.college.phoneNumber);
          localStorage.setItem('registrationNumber', response.data.college.registrationNumber);
        } else if (userType === 'student' && response.data.student) {
          // Store the student-related data
          localStorage.setItem('studentId', response.data.studentID);
          localStorage.setItem('studentName', response.data.student.name);
          localStorage.setItem('studentEmail', response.data.student.email);
          localStorage.setItem('studentPhoneNumber', response.data.student.phoneNumber);
          localStorage.setItem('educationalBackground', response.data.student.educationalBackground);
        }

        // Redirect to the appropriate dashboard
        if (userType === 'student') {
          navigate('/dashboard/student');
        } else {
          navigate('/dashboard/college');
        }
      } else {
        // Handle cases where token is not present in the response
        setErrorMessage('Login failed. No token received.');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message); // Show backend error message
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      {/* Bubble Animation Background */}
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>

      <h2>{userType === 'student' ? 'Student' : 'College'} Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      {/* Display error message if there is one */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Forgot Password and New User Registration buttons */}
      <div className="button-group" style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/forget-password')}>Forgot Password?</button>
        <button onClick={() => navigate(`/register/${userType}`)}>New User? Register Here</button>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </div>
  );
};

export default Login;

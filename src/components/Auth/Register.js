// src/components/Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Register.css'; // Import the CSS file for styles
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';


const Register = ({ userType }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    educationalBackground: '',
    password: '',
    collegeName: '',
    registrationNumber: '',
  });

  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Set API endpoint based on the userType (student or college)
    const apiUrl = userType === 'student' 
      ? `${BASE_URL}/api/students/register`
      : `${BASE_URL}/api/colleges/register`;

    // Prepare data to send based on the userType
    const dataToSend = userType === 'student' 
      ? {
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          educationalBackground: formData.educationalBackground,
          password: formData.password,
        }
      : {
          collegeName: formData.collegeName,
          adminEmail: formData.email,
          registrationNumber: formData.registrationNumber,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
        };

    try {
      const response = await axios.post(apiUrl, dataToSend);
      console.log(response.data); // Log successful registration

      // Check if the API response indicates that the verification email was sent
      if (response.data.verificationSent) {
        setSuccessMessage(`Registration successful! A verification email has been sent to ${formData.email}. Please check your inbox to verify your account.`);
      } else {
        setSuccessMessage('Registration successful, but verification email was not sent. Please contact support.');
      }

      setErrorMessage(''); // Clear any previous error messages
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message); // Set error message from server
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.'); // Generic error message
      }
    }
  };

  return (
    <div className="register-container">
      <h2>{userType === 'student' ? 'Student' : 'College'} Registration</h2>
      
      {/* Display success message if registration is successful */}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Display error message if any */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleRegister}>
        {/* For Students */}
        {userType === 'student' && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <select
              name="educationalBackground"
              value={formData.educationalBackground}
              onChange={handleChange}
              required
            >
              <option value="">Select Educational Background</option>
              <option value="8th Grade">8th Grade</option>
              <option value="9th Grade">9th Grade</option>
              <option value="10th Grade">10th Grade</option>
              <option value="Graduation">Graduation</option>
            </select>
          </>
        )}

        {/* For Colleges */}
        {userType === 'college' && (
          <>
            <input
              type="text"
              name="collegeName"
              placeholder="College Name"
              value={formData.collegeName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="registrationNumber"
              placeholder="Registration Number"
              value={formData.registrationNumber}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </>
        )}

        {/* Common Fields */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>

      {/* Bubbles for floating animation */}
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
    </div>
  );
};

export default Register;

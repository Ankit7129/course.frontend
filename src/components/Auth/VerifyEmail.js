import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

const VerifyEmail = () => {
  const { token } = useParams(); // Get the token from the URL parameters
  const [status, setStatus] = useState(''); // State to track verification status
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Call the backend verification endpoint
        const response = await axios.get(`${BASE_URL}/api/auth/verify-email/${token}`);
        setStatus(response.data.message); // Set success message
      } catch (error) {
        if (error.response) {
          setStatus(error.response.data.message); // Set error message from server
        } else {
          setStatus('An unexpected error occurred. Please try again.'); // Generic error message
        }
      }
    };

    verifyEmail();
  }, [token]);

  const handleGoToLogin = () => {
    navigate('/login/student'); // Redirect to login page
  };

  return (
    <div className="verification-container">
      <h1>Email Verification</h1>
      <p>{status}</p>
      <button onClick={handleGoToLogin}>Go to Login</button>
    </div>
  );
};

export default VerifyEmail;

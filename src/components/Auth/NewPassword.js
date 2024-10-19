import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

const NewPassword = () => {
  const { token } = useParams(); // Extract the token from the URL
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Validate that both passwords match
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/reset-password/${token}`, {
        newPassword,
      });

      console.log(response.data); // Log response data for debugging
      setSuccessMessage('Password reset successfully!');
      setErrorMessage('');

      // Redirect to login after successful reset
      setTimeout(() => {
        navigate('/login'); // Adjust the redirect path as necessary
      }, 3000);
    } catch (error) {
      console.error(error); // Handle error here
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message); // Show specific error message from backend
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Set New Password</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>

      {/* Display error or success messages */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default NewPassword;

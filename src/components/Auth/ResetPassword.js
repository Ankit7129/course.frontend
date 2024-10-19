import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords don't match.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/reset-password/${token}`, { newPassword });
      setMessage(response.data.message); // Display success message

      // Redirect to home page after a delay
      setTimeout(() => {
        navigate('/'); // Redirect to home page
      }, 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
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
        <button type="submit">Change Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;

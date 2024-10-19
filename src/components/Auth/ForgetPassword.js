import React, { useState } from 'react';
import axios from 'axios';
import './ForgetPassword.css';
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';


const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('student');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(''); // Clear previous messages

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/forgot-password`, {
        email,
        userType,
      });
      setMessage(response.data.message || 'Reset link sent! Check your email.'); // Success message
    } catch (error) {
      setMessage('Error sending reset link. Please try again.'); // Error message
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Forget Password</h2>
      <form onSubmit={handleSendEmail}>
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="student">Student</option>
          <option value="college">College</option>
        </select>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      
      {message && <p className="feedback-message">{message}</p>}
    
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      ))
    </div>
  );
};

export default ForgetPassword;

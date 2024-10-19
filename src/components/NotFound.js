// NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Not Found</h1>
      <p style={styles.message}>Oops! The page you are looking for does not exist.</p>
      <Link to="/" style={styles.link}>
        Go back to Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
  },
  heading: {
    fontSize: '48px',
    color: '#343a40',
  },
  message: {
    fontSize: '24px',
    color: '#6c757d',
  },
  link: {
    marginTop: '20px',
    fontSize: '20px',
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default NotFound;

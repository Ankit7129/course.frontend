import React from 'react';

const NotFound = () => {
  // Function to go back to the previous page
  const goBack = () => {
    window.history.back(); // Go to the previous page in the browser's history
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Not Found</h1>
      <p style={styles.message}>Oops! The page you are looking for does not exist. We are working on it. Coming Soon :)</p>
      <button onClick={goBack} style={styles.button}>
        Go Back to Previous Page
      </button>
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
  button: {
    marginTop: '20px',
    fontSize: '20px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default NotFound;

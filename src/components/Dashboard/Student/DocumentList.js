import React, { useEffect, useState } from 'react';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000'; // Use your base URL

const DocumentList = () => {
  const [aadharNumber, setAadharNumber] = useState('');
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get the Aadhaar number from local storage after login and set it in the state
    const storedAadharNumber = localStorage.getItem('aadharNumber');
    if (storedAadharNumber) {
      setAadharNumber(storedAadharNumber);
    }
  }, []); // Run once on component mount

  const handleFetchDocuments = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      const response = await axios.get(`${BASE_URL}/api/documents`, {
        params: { aadharNumber }, // Pass the Aadhaar number as a query parameter
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Check if documents are returned
      if (response.data.length === 0) {
        setError('No documents found for the provided Aadhaar number.');
      } else {
        setDocuments(response.data); // Set the retrieved documents
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching documents. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Document List</h2>
      <form onSubmit={handleFetchDocuments}>
        <input
          type="text"
          placeholder="Aadhaar Number"
          value={aadharNumber}
          readOnly // Make the input read-only
          required
        />
        <button type="submit">Fetch Documents</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {documents.length > 0 && (
        <div>
          <h3>Documents Found:</h3>
          <ul>
            {documents.map((doc) => (
              <li key={doc._id}>
                <strong>Document Type:</strong> {doc.documentType}<br />
                <strong>Document URL:</strong> <a href={doc.documentUrl} target="_blank" rel="noopener noreferrer">View Document</a><br />
                <strong>Aadhaar Number:</strong> {doc.aadharNumber}<br />
                <strong>Status:</strong> {doc.verified ? 'Verified' : 'Not Verified'}<br />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DocumentList;

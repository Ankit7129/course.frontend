// DocumentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000'; // Use your base URL

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Get the studentId and studentName from localStorage
  const studentId = localStorage.getItem('studentId');
  const token = localStorage.getItem('token'); // Assuming the token is stored after login

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!studentId) {
        setErrorMessage('Student ID not found in local storage.');
        return;
      }

      setLoading(true);
      setErrorMessage('');

      try {
        const response = await axios.get(`${BASE_URL}/api/documents?studentId=${studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDocuments(response.data); // Set the fetched documents
      } catch (error) {
        setErrorMessage(error.response?.data?.error || 'Error fetching documents');
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [studentId, token]); // Dependency array includes studentId and token

  return (
    <div>
      <h2>Your Uploaded Documents</h2>
      {loading && <p>Loading...</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {documents.length > 0 && (
        <div>
          <ul>
            {documents.map((document) => (
              <li key={document._id}>
                <p>Document Type: {document.documentType}</p>
                <p>Aadhaar Number: {document.aadhaarNo}</p>
                <p>DigiLocker ID: {document.digilockerId}</p>
                <p>
                  Document URL: <a href={document.documentUrl} target="_blank" rel="noopener noreferrer">View Document</a>
                </p>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      )}
      {documents.length === 0 && !loading && <p>No documents found.</p>} {/* Message for no documents */}
    </div>
  );
};

export default DocumentList;

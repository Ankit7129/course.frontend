import React, { useState, useEffect } from 'react';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000'; // Use your base URL

const DocumentUpload = () => {
  // State to hold the Aadhar number, document, document type, etc.
  const [aadharNumber, setAadharNumber] = useState('');
  const [document, setDocument] = useState(null);
  const [documentType, setDocumentType] = useState('');
  const [customDocumentType, setCustomDocumentType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Use useEffect to fetch Aadhar number from local storage on component mount
  useEffect(() => {
    const storedAadhar = localStorage.getItem('aadharNumber'); // Fetch Aadhar number
    if (storedAadhar) {
      setAadharNumber(storedAadhar); // Set the fetched value as the Aadhar number
    }
  }, []);

  const handleDocumentChange = (event) => {
    setDocument(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validate Aadhar number format
    if (!/^\d{16}$/.test(aadharNumber)) {
      setError('Aadhar number must be a 16-digit number.');
      setLoading(false);
      return;
    }

    // Create FormData object to send the file and Aadhar number
    const formData = new FormData();
    formData.append('document', document);
    formData.append('aadharNumber', aadharNumber);
    formData.append('documentType', documentType === 'Other (Please specify)' ? customDocumentType : documentType); // Use custom type if selected

    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      const response = await axios.post(`${BASE_URL}/api/documents/upload`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });

      setSuccess('Document uploaded successfully!');
      setDocument(null);
      setDocumentType('');
      setCustomDocumentType(''); // Clear custom input
    } catch (err) {
      setError(err.response?.data?.error || 'Error uploading document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload Document</h2>
      <form onSubmit={handleUpload}>
        <div>
          <label htmlFor="aadharNumber">Aadhar Number:</label>
          <input
            type="text"
            id="aadharNumber"
            value={aadharNumber}
            readOnly // Make this field read-only
          />
        </div>
        <div>
          <label htmlFor="document">Choose Document:</label>
          <input
            type="file"
            id="document"
            accept=".pdf,image/*" // Accept PDF and images
            onChange={handleDocumentChange}
            required
          />
        </div>
        <div>
          <label htmlFor="documentType">Document Type:</label>
          <select
            id="documentType"
            value={documentType}
            onChange={(e) => {
              setDocumentType(e.target.value);
              if (e.target.value !== 'Other (Please specify)') {
                setCustomDocumentType(''); // Clear custom input if not selecting "Other"
              }
            }}
            required
          >
            <option value="">Select Educational Background</option>
            <option value="Class 8">Class 8</option>
            <option value="Class 9">Class 9</option>
            <option value="Class 10">Class 10</option>
            <option value="Class 11 Science">Class 11 Science</option>
            <option value="Class 11 Commerce">Class 11 Commerce</option>
            <option value="Class 11 Arts">Class 11 Arts</option>
            <option value="Class 12 Science">Class 12 Science</option>
            <option value="Class 12 Commerce">Class 12 Commerce</option>
            <option value="Class 12 Arts">Class 12 Arts</option>
            <option value="Undergraduate (B.Tech)">Undergraduate (B.Tech)</option>
            <option value="Undergraduate (BBA)">Undergraduate (BBA)</option>
            <option value="Other (Please specify)">Other (Please specify)</option>
          </select>
          {documentType === 'Other (Please specify)' && (
            <input
              type="text"
              placeholder="Specify other document type"
              value={customDocumentType}
              onChange={(e) => setCustomDocumentType(e.target.value)}
              required // Make this required if "Other" is selected
            />
          )}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Document'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default DocumentUpload;

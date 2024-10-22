import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DocumentUpload.css'; // Import CSS for styling
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000'; // Use your base URL

const DocumentUpload = () => {
  const navigate = useNavigate();
  const [documentType, setDocumentType] = useState('');
  const [aadhaarNo, setAadhaarNo] = useState('');
  const [digilockerId, setDigilockerId] = useState('');
  const [document, setDocument] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // New state for success message

  // Retrieve student information from localStorage
  const studentId = localStorage.getItem('studentId');
  const studentName = localStorage.getItem('studentName');

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('document', document);
    formData.append('documentType', documentType);
    formData.append('aadhaarNo', aadhaarNo);
    formData.append('digilockerId', digilockerId);
    formData.append('studentId', studentId); // Include student ID
    formData.append('studentName', studentName); // Include student name

    const token = localStorage.getItem('token'); // Assuming you store the token after login

    try {
      await axios.post(`${BASE_URL}/api/documents/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      // Set success message and clear any previous error
      setSuccessMessage('Document uploaded successfully!');
      setErrorMessage(''); // Clear error message
    } catch (error) {
      // Set error message and clear any previous success
      setErrorMessage(error.response?.data?.error || 'Error uploading document');
      setSuccessMessage(''); // Clear success message
      console.error('Error uploading document:', error);
    }
  };

  return (
    <div className="document-upload-container">
      <h2>Upload Document</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Display success message */}
      <form onSubmit={handleUpload}>
        <div className="form-group">
          <label>
            Student ID:
            <input type="text" value={studentId} readOnly />
          </label>
        </div>
        <div className="form-group">
          <label>
            Student Name:
            <input type="text" value={studentName} readOnly />
          </label>
        </div>
        <div className="form-group">
          <label>
            Document (Type: File):
            <input type="file" onChange={(e) => setDocument(e.target.files[0])} required />
          </label>
        </div>
        <div className="form-group">
          <label>
            Document Type:
            <select value={documentType} onChange={(e) => setDocumentType(e.target.value)} required>
              <option value="">Select Document Type</option>
              <option value="class_10_certificate">Class 10 Certificate</option>
              <option value="class_11_certificate">Class 11 Certificate</option>
              <option value="class_12_certificate">Class 12 Certificate</option>
              <option value="btech_graduation">B.Tech Graduation</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Aadhaar Number:
            <input
              type="text"
              value={aadhaarNo}
              onChange={(e) => setAadhaarNo(e.target.value)}
              required // Set required for Aadhaar number field
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            DigiLocker ID:
            <input
              type="text"
              value={digilockerId}
              onChange={(e) => setDigilockerId(e.target.value)}
              required // Set required for DigiLocker ID field
            />
          </label>
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default DocumentUpload;

// src/components/Dashboard/Student/DocumentUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const DocumentUpload = () => {
  const [document, setDocument] = useState(null);
  const [documentType, setDocumentType] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', document);
    formData.append('documentType', documentType);
    formData.append('aadharNumber', aadharNumber);

    await axios.post('/api/uploadDocument', formData); // Adjust the endpoint accordingly
    alert('Document uploaded successfully!');
  };

  return (
    <form onSubmit={handleUpload}>
      <h3>Upload Document</h3>
      <input
        type="text"
        placeholder="Document Type"
        value={documentType}
        onChange={(e) => setDocumentType(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Aadhar Number"
        value={aadharNumber}
        onChange={(e) => setAadharNumber(e.target.value)}
        required
      />
      <input
        type="file"
        onChange={(e) => setDocument(e.target.files[0])}
        required
      />
      <button type="submit">Upload Document</button>
    </form>
  );
};

export default DocumentUpload;

import React from 'react';
import axios from 'axios';
//import './DocumentVerification.css'; // Import CSS for styling

const DocumentVerification = ({ docs, onDocChange }) => {
  const handleVerification = async (docId, verified) => {
    await axios.post(`/api/college/document-verification/${docId}`, { verified });
    onDocChange(); // Refresh the documents list
  };

  return (
    <div className="document-verification">
      <h4>Document Verification</h4>
      <ul>
        {docs.map((doc) => (
          <li key={doc.id}>
            <span>{doc.studentName} - {doc.documentType}</span>
            <button onClick={() => handleVerification(doc.id, true)}>Verify</button>
            <button onClick={() => handleVerification(doc.id, false)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentVerification;

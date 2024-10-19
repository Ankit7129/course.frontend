import React from 'react';
import axios from 'axios';
//import './CourseApprovals.css'; // Import CSS for styling

const CourseApprovals = ({ approvals, onApprovalChange }) => {
  const handleApproval = async (approvalId, approve) => {
    await axios.post(`/api/college/course-approvals/${approvalId}`, { approved: approve });
    onApprovalChange(); // Refresh the approvals list
  };

  return (
    <div className="course-approvals">
      <h4>Pending Approvals</h4>
      <ul>
        {approvals.map((approval) => (
          <li key={approval.id}>
            <span>{approval.studentName} - {approval.courseName}</span>
            <button onClick={() => handleApproval(approval.id, true)}>Approve</button>
            <button onClick={() => handleApproval(approval.id, false)}>Deny</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseApprovals;

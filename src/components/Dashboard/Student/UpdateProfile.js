import React, { useState, useEffect } from 'react';

const UpdateProfile = () => {
  // State variables for editable fields
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [educationalBackground, setEducationalBackground] = useState('');
  
  // State variables for non-editable fields
  const [studentEmail, setStudentEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  
  // State variables for status messages
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch current student information from localStorage
    const storedName = localStorage.getItem('studentName');
    const storedEmail = localStorage.getItem('studentEmail');
    const storedPhone = localStorage.getItem('studentPhoneNumber');
    const storedBackground = localStorage.getItem('educationalBackground');
    const storedId = localStorage.getItem('studentId');

    // Populate form with existing data
    if (storedName) setStudentName(storedName);
    if (storedEmail) setStudentEmail(storedEmail);
    if (storedPhone) setStudentPhone(storedPhone);
    if (storedBackground) setEducationalBackground(storedBackground);
    if (storedId) setStudentId(storedId);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!studentName || !studentPhone || !educationalBackground) {
      setErrorMessage('Please fill in all the required fields.');
      setSuccessMessage(''); // Clear success message if any
      return;
    }

    // Save updated profile details to localStorage (except email and studentId)
    localStorage.setItem('studentName', studentName);
    localStorage.setItem('studentPhoneNumber', studentPhone);
    localStorage.setItem('educationalBackground', educationalBackground);

    // Simulate success for demonstration purposes
    setSuccessMessage('Profile updated successfully.');
    setErrorMessage(''); // Clear error message if any
  };

  return (
    <div className="update-profile-container">
      <h2>Update Your Profile</h2>

      {/* Success and Error Messages */}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="profile-form">
        
        {/* Student ID - Non-editable */}
        <div className="form-group">
          <label>Student ID:</label>
          <input
            type="text"
            value={studentId}
            readOnly
          />
        </div>

        {/* Email - Non-editable */}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={studentEmail}
            readOnly
          />
        </div>

        {/* Name - Editable */}
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
        </div>

        {/* Phone Number - Editable */}
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            value={studentPhone}
            onChange={(e) => setStudentPhone(e.target.value)}
            required
          />
        </div>

        {/* Educational Background - Editable */}
        <div className="form-group">
          <label>Educational Background:</label>
          <select
            name="educationalBackground"
            value={educationalBackground}
            onChange={(e) => setEducationalBackground(e.target.value)}
            required
          >
            <option value="">Select Educational Background</option>
            <option value="8th Grade">8th Grade</option>
            <option value="9th Grade">9th Grade</option>
            <option value="10th Grade">10th Grade</option>
            <option value="Graduation">Graduation</option>
          </select>
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;

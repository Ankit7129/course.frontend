import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import './AddCourse.css'; // Import CSS for styling

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000'; // Use your base URL

const AddCourse = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [courseData, setCourseData] = useState({
    courseName: '',
    description: '',
    price: '',
    duration: '',
    remarks: '',
    college: localStorage.getItem('collegeId') || '' // Use college ID from local storage
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: name === 'remarks' ? value.split(',') : value // Convert remarks to an array
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/college/add-course`, courseData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token if required
        },
      });
      alert(response.data.message); // Show success message
      navigate('/dashboard/college'); // Redirect to college dashboard after successful addition
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Failed to add course. Please try again.');
    }
  };

  return (
    <div className="add-course-container">
      <h2>Add New Course</h2>

{/* Description for the page */}
<p className="page-description">
  This is the page where you can add new courses to the system. 
  Please fill in the details below to create a new course, including the course name, description, price, 
  duration, and any additional remarks you may have. 
</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course Name:</label>
          <input
            type="text"
            name="courseName"
            value={courseData.courseName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={courseData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Duration:</label>
          <input
            type="text"
            name="duration"
            value={courseData.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Remarks (comma separated):</label>
          <input
            type="text"
            name="remarks"
            value={courseData.remarks}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;

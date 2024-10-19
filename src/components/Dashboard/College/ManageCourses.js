import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  // Fetch courses when the component mounts
  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetch only the logged-in college's courses
  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/college/courses`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Send JWT token in request
        },
      });
      setCourses(response.data); // Set the courses for the logged-in college
    } catch (error) {
      setError('Error fetching courses, please try again.');
    }
  };

  // Handle course deletion
  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`${BASE_URL}/api/college/courses/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure the token is sent
        },
      });
      // Remove the deleted course from the state
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      setError('Error deleting course, please try again.');
    }
  };

  return (
    <div className="manage-courses-container">
      <h2>Manage Your Courses</h2>

      <p className="page-description">
        This page allows you to view, manage, and edit the courses you have added to the system.
        You can review course details such as the name, description, price, and duration, and perform actions like editing
        or deleting courses.
      </p>

      {error && <p className="error-message">{error}</p>}

      <ul className="course-list">
        {courses.map((course) => (
          <li key={course._id} className="course-item">
            <h3>{course.courseName}</h3>
            <p>{course.description}</p>
            <p>Price: ${course.price}</p>
            <p>Duration: {course.duration}</p>
            <p>
              <strong>Remarks:</strong>
              {Array.isArray(course.remarks) && course.remarks.length > 0
                ? course.remarks.join(', ')
                : 'No remarks available'}
            </p>
            <button onClick={() => handleDelete(course._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCourses;

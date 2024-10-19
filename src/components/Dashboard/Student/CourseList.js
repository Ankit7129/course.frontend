import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000'; // Use your base URL

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/college/courses`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setCourses(response.data);
      } catch (err) {
        setError('Error fetching courses. Please try again later.');
      }
    };

    fetchCourses();
  }, []);

  const handlePurchaseClick = () => {
    navigate('/purchase'); // Navigate to the Purchase Page
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="course-list-container">
      <h1>Available Courses</h1>
      {courses.length > 0 ? (
        <ul>
          {courses.map((course) => (
            <li key={course._id} className="course-item">
              <h2>{course.courseName}</h2>
              <p>{course.description}</p>
              <p><strong>Price:</strong> ${course.price}</p>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p><strong>College:</strong> {course.college ? course.college.collegeName : 'Unknown College'}</p>
              <p><strong>Remarks:</strong> {course.remarks.join(', ')}</p>

              {/* Purchase Course Button */}
              <button onClick={handlePurchaseClick} className="purchase-button">Purchase Course</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
};

export default CourseList;

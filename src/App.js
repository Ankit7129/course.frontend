// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Shared/Header';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgetPassword from './components/Auth/ForgetPassword';
//import ResetPassword from './components/Auth/ResetPassword';
import StudentDashboard from './components/Dashboard/Student/StudentDashboard';
import CollegeDashboard from './components/Dashboard/College/CollegeDashboard';
import HomePage from './components/HomePage'; // Import the HomePage component
import VerifyEmail from './components/Auth/VerifyEmail'; // Import the new component
import ManageCourses from './components/Dashboard/College/ManageCourses';
import AddCourse from './components/Dashboard/College/AddCourse'; // Import AddCourse
import CourseList from './components/Dashboard/Student/CourseList';
import PurchasePage from './components/Dashboard/Student/PurchasePage';
import Documents from './components/Dashboard/Student/Documents';
import DocumentList from './components/Dashboard/Student/DocumentList';
import UpdateProfile from './components/Dashboard/Student/UpdateProfile';


import NotFound from './components/NotFound'; // Create a NotFound component


const App = () => {
  return (
    <Router>
      {/* Render Header only if not on the dashboard routes */}
      {!window.location.pathname.includes('/dashboard/') && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Updated to use HomePage */}
        <Route path="/login/student" element={<Login userType="student" />} />
        <Route path="/login/college" element={<Login userType="college" />} />
        <Route path="/register/student" element={<Register userType="student" />} />
        <Route path="/register/college" element={<Register userType="college" />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} /> {/* Add this route */}
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/college" element={<CollegeDashboard />} />

        <Route path="/add-course" element={<AddCourse />} /> {/* Add course route */}
        <Route path="/courses" element={<CourseList />} />
        <Route path="/purchase" element={<PurchasePage />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
        <Route path="/my-documents" element={< DocumentList/>} />
        <Route path="/update-profile" element={<UpdateProfile />} />


        <Route path="/manage-courses" element={<ManageCourses />} />
        
     
      </Routes>
    </Router>
  );
};

export default App;

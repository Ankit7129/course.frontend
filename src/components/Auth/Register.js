import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

const Register = ({ userType }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        aadharNumber: '',
        educationalBackground: '',
        password: '',
        collegeName: '',
        registrationNumber: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    const educationalBackgroundOptions = [
        'Class 8', 'Class 9', 'Class 10', 'Class 11 Science',
        'Class 11 Commerce', 'Class 11 Arts', 'Class 12 Science',
        'Class 12 Commerce', 'Class 12 Arts', 'Undergraduate (B.Tech)',
        'Undergraduate (BBA)', 'Other (Please specify)',
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setProgress(0); // Reset progress

        const apiUrl = userType === 'student' 
            ? `${BASE_URL}/api/students/register`
            : `${BASE_URL}/api/colleges/register`;

        const dataToSend = userType === 'student' 
            ? {
                name: formData.name,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                aadharNumber: formData.aadharNumber,
                educationalBackground: formData.educationalBackground,
                password: formData.password,
              }
            : {
                collegeName: formData.collegeName,
                adminEmail: formData.email,
                registrationNumber: formData.registrationNumber,
                phoneNumber: formData.phoneNumber,
                password: formData.password,
              };

        try {
            const response = await axios.post(apiUrl, dataToSend, {
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    const percent = Math.floor((loaded * 100) / total);
                    setProgress(percent);
                },
            });

            // Simulating delay to show progress bar
            setTimeout(() => {
                setLoading(false);
                setProgress(100); // Complete the progress
            }, 1000); // Simulate a 1-second delay for demonstration

            // Check if the API response indicates that the verification email was sent
            if (response.data.verificationSent) {
                setSuccessMessage(`Registration successful! A verification email has been sent to ${formData.email}. Please check your inbox to verify your account.`);
            } else {
                setSuccessMessage('Registration successful, but verification email was not sent. Please contact support.');
            }

            setErrorMessage('');
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h2>{userType === 'student' ? 'Student' : 'College'} Registration</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleRegister}>
                {userType === 'student' && (
                    <>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="aadharNumber"
                            placeholder="Aadhaar Number"
                            value={formData.aadharNumber}
                            onChange={handleChange}
                            required
                        />
                        <select
                            name="educationalBackground"
                            value={formData.educationalBackground}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Educational Background</option>
                            {educationalBackgroundOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </>
                )}

                {userType === 'college' && (
                    <>
                        <input
                            type="text"
                            name="collegeName"
                            placeholder="College Name"
                            value={formData.collegeName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="registrationNumber"
                            placeholder="Registration Number"
                            value={formData.registrationNumber}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </>
                )}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading}>Register</button>
            </form>

            {loading && (
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>
            )}

            {/* Bubbles for floating animation */}
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
        </div>
    );
};

export default Register;

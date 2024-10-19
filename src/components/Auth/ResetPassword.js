import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

const ResetPassword = () => {
    const { token } = useParams(); // Get token from URL
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/api/auth/reset-password/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message || 'Password reset successfully!');
                setTimeout(() => navigate('/'), 3000); // Redirect after 3 seconds
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Failed to reset password. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword}>
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>} {/* Display message to the user */}
        </div>
    );
};

export default ResetPassword;

import React, { useState } from 'react';
import axios from 'axios'; import { useTheme } from '../context/ThemeContext';
import { useNavigate } from "react-router-dom";  // Use useNavigate instead of Navigate
import Cookies from 'js-cookie';

const Login = () => {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate(); // Move useNavigate here
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const API_URL = process.env.REACT_APP_API_URL;
            const response = await axios.post(`${API_URL}/api/admin/login`, formData, {
                withCredentials: true // Add this line
            });

            if (response.data.token) {
                // Add console log to verify token received
                console.log('Login successful, response.data.token);
                Cookies.set('jwtCookie', response.data.token, { expires: 7, secure: true }); // Set cookie to expire in 7 days
            
                navigate('/admin');
            }
        } catch (error) {
            alert('Login failed. Please check your credentials and try again.');
            console.error('Login error:', error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen py-12 sm:px-6 lg:px-8 transition-colors duration-200
            ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold">
                    Welcome Back
                </h2>
                <p className={`mt-2 text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Sign in to manage your properties
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className={`py-8 px-4 shadow sm:rounded-lg sm:px-10 transition-colors duration-200
                    ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className={`block text-sm font-medium
                                ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
                                        focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200
                                        ${isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'}`}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className={`block text-sm font-medium
                                ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
                                        focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200
                                        ${isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'}`}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className={`w-full border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

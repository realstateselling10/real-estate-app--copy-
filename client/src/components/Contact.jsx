import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; import {
    Alert,
    Snackbar,

} from "@mui/material";

const Contact = () => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [contact, setContact] = useState({
        fullName: '',
        email: '',
        property: '',
        phoneNumber: '',
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact((prevContact) => ({
            ...prevContact,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${API_URL}/api/user/contact`, contact);
            alert("We will contact you soon");
        } catch (error) {
            setError(error.response ? error.response.data.error : error.message);
            console.error('Error submitting contact form:', error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`max-w-2xl mx-auto p-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg shadow-lg`}>
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={contact.fullName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={contact.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={contact.phoneNumber}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Property Title</label>
                        <input
                            type="text"
                            name="property"
                            value={contact.property}
                            onChange={handleChange}

                            className="w-full p-2 border rounded bg-gray-200"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className={`w-full py-2 px-4 rounded ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white transition duration-300`}
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
            {error && (
                <Snackbar open={true} autoHideDuration={6000} onClose={() => setError(null)}>
                    <Alert onClose={() => setError(null)} severity="error">
                        {typeof error === 'string' ? error : JSON.stringify(error)}
                    </Alert>
                </Snackbar>
            )}
        </div>
    );
};

export default Contact;
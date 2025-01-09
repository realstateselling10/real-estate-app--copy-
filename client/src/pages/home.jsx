import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PropertyList = () => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/property`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'https://client-two-teal-20.vercel.app'
                    }
                });
                console.log('Fetched properties:', response.data);
                setProperties(response.data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);

    const handleViewDetails = (propertyId) => {
        navigate(`/property/${propertyId}`);
    };

    return (
        <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200
            ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>

            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-12 text-center">
                <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Featured Properties
                </h1>
                <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Discover your perfect property in Nepal
                </p>
            </div>

            {/* Property Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((property) => (
                    <div
                        key={property._id}
                        className={`rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105
                            ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                    >
                        {/* Property Image */}
                        <div className="relative h-48 w-full">
                            <img
                                src={property.images && property.images[0] ? property.images[0] : 'default-image-url.jpg'}
                                alt={property.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                रू {property.price}
                            </div>
                        </div>

                        {/* Property Details */}
                        <div className="p-6">
                            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {property.title}
                            </h3>
                            <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {property.location}
                            </p>
                            <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                                {property.description}
                            </p>

                            {/* Property Features */}
                            <div className={`flex justify-between pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>


                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                    </svg>
                                    <span className="text-sm">{property.size || 0} </span>
                                </div>
                            </div>

                            {/* View Details Button */}
                            <button
                                onClick={() => handleViewDetails(property._id)}
                                className={`w-full mt-6 px-4 py-2 rounded-md font-medium transition duration-300
                                    ${isDarkMode
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PropertyList;

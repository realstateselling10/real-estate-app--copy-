import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

const PropertyDetail = () => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";


    const { id } = useParams();
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
    const [property, setProperty] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/property/${id}`);
                setProperty(response.data);
            } catch (error) {
                console.error('Error fetching property details:', error);
            }
        };

        fetchProperty();
    }, [id]);

    const handleContactClick = () => {
        navigate(`/contact`);
    };

    if (!property) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`min-h-screen py-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className={`mb-6 flex items-center space-x-2 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                        }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Back to Properties</span>
                </button>

                {/* Property Title and Price */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                    <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="inline-block">
                            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {property.location}
                        </span>
                    </p>
                    <p className="text-2xl font-bold text-blue-600 mt-2">रू {property.price}</p>
                </div>

                {/* Image Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="md:col-span-2">
                        <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-96 object-cover rounded-lg"
                        />
                    </div>
                    {property.images.slice(1).map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`${property.title} ${index + 2}`}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                    ))}
                </div>

                {/* Property Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Main Details */}
                    <div className="md:col-span-2">
                        <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                            <h2 className="text-xl font-bold mb-4">Property Details</h2>
                            <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {property.description}
                            </p>

                            {/* Key Features */}
                            <div className="">

                                <div className="text-center ">
                                    <div className={`p-3 rounded-full inline-block ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                        </svg>
                                    </div>
                                    <p className="mt-2">{property.size} sq.ft</p>
                                </div>
                            </div>

                            {/* Features Table */}
                            <div className="grid grid-cols-2 gap-4">
                                {property.features && Object.entries(property.features).map(([key, value]) => (
                                    <div key={key} className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{key}</p>
                                        <p className="font-medium">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>

                    {/* Contact Card */}
                    <div className="md:col-span-1">
                        <div className={`sticky top-24 p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                            <h2 className="text-xl font-bold mb-4">Contact Agent</h2>
                            <div className="space-y-4">

                                <button onClick={handleContactClick} className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                                    Contact Agent
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <nav className={`sticky top-0 z-50 transition-colors duration-200 
            ${isDarkMode
                ? 'bg-gray-800 text-white'
                : 'bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 text-white shadow-lg'}
            `}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            to="/"
                            className="flex items-center space-x-2 text-white hover:text-gray-100 transition duration-300"
                        >
                            <svg
                                className="w-8 h-8"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M14 6l-4.22 5.63 1.25 1.67L14 9.33 19 16h-8.46l-4.01-5.37L1 16h22L14 6zM5 16l1.52-2.03L8.04 16H5z" />
                            </svg>
                            <span className="font-bold text-xl hidden sm:block">हाम्रो घडेरी</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-300 ${location.pathname === '/'
                                ? 'bg-white/20 text-white'
                                : 'text-white hover:bg-white/10'
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/contact"
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-300 ${location.pathname === '/add-property'
                                ? 'bg-white/20 text-white'
                                : 'text-white hover:bg-white/10'
                                }`}
                        >
                            Contact
                        </Link>


                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg hover:bg-white/10 transition duration-300"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? (
                                <svg className="w-6 h-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg hover:bg-white/10 transition duration-300"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? (
                                <svg className="w-6 h-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                    />
                                </svg>
                            )}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-white/10 transition duration-300"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            to="/"
                            className={`block px-3 py-2 rounded-lg text-base font-medium transition duration-300 ${location.pathname === '/'
                                ? 'bg-white/20 text-white'
                                : 'text-white hover:bg-white/10'
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/add-property"
                            className={`block px-3 py-2 rounded-lg text-base font-medium transition duration-300 ${location.pathname === '/add-property'
                                ? 'bg-white/20 text-white'
                                : 'text-white hover:bg-white/10'
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            Add Property
                        </Link>
                        <Link
                            to="/login"
                            className={`block px-3 py-2 rounded-lg text-base font-medium transition duration-300 ${location.pathname === '/login'
                                ? 'bg-white/20 text-white'
                                : 'text-white hover:bg-white/10'
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

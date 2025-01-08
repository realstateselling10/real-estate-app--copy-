import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './admin/components/Navbar';
import Login from './components/Login';
import AdminPropertyManager from './admin/AdminPropertyManager';
// Import other components as needed

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<AdminPropertyManager />} />
                    {/* Add other routes as needed */}
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login/Index';
import OTP from '../pages/Login/OTP';

/**
 * RouteFile component handles all the route definitions for the application.
 * It sets up routing using react-router-dom and defines the paths and components.
 */
const RouteFile = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Route for the login page */}
                <Route path='/' element={<Login />} />
                {/* Route for the OTP verification page */}
                <Route path='/OTP' element={<OTP />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RouteFile;

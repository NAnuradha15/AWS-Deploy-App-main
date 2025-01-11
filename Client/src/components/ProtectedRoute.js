// components/ProtectedRoute.js

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Adjust the path based on your project structure

/**
 * ProtectedRoute Component
 * 
 * This component wraps around routes that require authentication.
 * If the user is not authenticated, it redirects them to the login page.
 * Otherwise, it renders the desired component.
 * 
 * @param {Object} props - Props passed to the component
 * @param {React.Component} props.children - The component to render if authenticated
 * @returns {React.Component}
 */
const ProtectedRoute = ({ children }) => {
    const { user } = useContext(UserContext); // Access user from UserContext

    // If user is not logged in, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If user is logged in, render the children components
    return children;
};

export default ProtectedRoute;

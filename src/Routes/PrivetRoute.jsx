import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const PrivetRoute = ({ children }) => {
    const { user } = use(AuthContext);
    const location = useLocation();

    // If user is logged in, show the protected page
    if (user) {
        return children;
    }

    // If user is not logged in, redirect to login page
    // Save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivetRoute;
import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const PrivetRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (user) {
        return children;
    }

    // ✅ Store the current location in state before redirecting to login
    return (
        <Navigate 
            to="/login" 
            state={{ from: location }} 
            replace 
        />
    );
};

export default PrivetRoute;
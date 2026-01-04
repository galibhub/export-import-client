


import React, { useContext } from 'react'; 
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const PrivetRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext); 
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg text-primary"></div>
                    <p className="text-gray-600 mt-2">Verifying Session...</p>
                </div>
            </div>
        );
    }

    if (user) {
        return children;
    }

    return (
        <Navigate 
            to="/login" 
            state={{ from: location }} 
            replace 
        />
    );
};

export default PrivetRoute;
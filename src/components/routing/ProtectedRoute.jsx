import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div className="d-flex justify-content-center p-5"><div className="spinner-border text-primary" role="status"></div></div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/MyAccountSignIn" replace />;
};

export default ProtectedRoute;

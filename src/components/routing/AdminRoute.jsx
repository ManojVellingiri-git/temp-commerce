import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = () => {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    if (loading) {
        return <div className="d-flex justify-content-center p-5 min-vh-100 align-items-center"><div className="spinner-border text-primary" role="status"></div></div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/MyAccountSignIn" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;

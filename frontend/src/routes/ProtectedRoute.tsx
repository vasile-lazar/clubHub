import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import type { User } from '../types/User';

interface ProtectedRouteProps {
    user: User | null;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user }) => {
    // If user is not logged in, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Otherwise, render the child routes
    return <Outlet />;
};

export default ProtectedRoute;

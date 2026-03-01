import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';
import type { UserRole } from '../types';
import { PATHS } from './paths';

interface GuardProps {
    requireAuth?: boolean;
    allowedRoles?: UserRole[];
    publicOnly?: boolean;
    redirectTo?: string;
}

export function Guard({
                          requireAuth = false,
                          allowedRoles,
                          publicOnly = false,
                          redirectTo,
                      }: GuardProps) {
    const location = useLocation();
    const { user, isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg-primary">
                <p className="text-text-secondary">Loading...</p>
            </div>
        );
    }

    if (publicOnly && isAuthenticated) {
        const destination = redirectTo ?? (() => {
            if (user?.role === 'admin') return PATHS.admin.dashboard;
            if (user?.role === 'clubmanager') return PATHS.clubmanager.clubs;
            return PATHS.app.dashboard;
        })();
        return <Navigate to={destination} replace />;
    }

    if (requireAuth && !isAuthenticated) {
        return (
            <Navigate
                to={redirectTo ?? PATHS.public.login}
                replace
                state={{ from: location }}
            />
        );
    }

    if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
        return <Navigate to={redirectTo ?? PATHS.public.forbidden} replace />;
    }

    return <Outlet />;
}
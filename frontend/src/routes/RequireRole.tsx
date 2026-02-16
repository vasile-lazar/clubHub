import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { UserRole } from '../types';
import { ROUTES } from './routes';

interface RequireRoleProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export const RequireRole: React.FC<RequireRoleProps> = ({ allowedRoles, children }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to={ROUTES.login} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTES.forbidden} replace />;
  }

  return <>{children}</>;
};

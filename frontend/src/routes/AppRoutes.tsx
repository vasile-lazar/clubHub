import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { GuestLayout } from '../layouts/GuestLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { UserLayout } from '../layouts/UserLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { RequireAuth } from './RequireAuth';
import { RequireRole } from './RequireRole';
import { ROUTES } from './routes';

import { Landing } from '../pages/guest/Landing';
import { Login } from '../pages/guest/Login';
import { Register } from '../pages/guest/Register';

import { Dashboard } from '../pages/user/Dashboard';
import { Profile } from '../pages/user/Profile';
import { Clubs } from '../pages/user/Clubs';
import { Events } from '../pages/user/Events';
import { MyClubs } from '../pages/user/MyClubs';

import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { UserManagement } from '../pages/admin/UserManagement';
import { Settings } from '../pages/admin/Settings';

import { NotFound } from '../pages/NotFound';
import { Forbidden } from '../pages/Forbidden';

export const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.landing} element={<GuestLayout />}>
        <Route index element={<Landing />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.register} element={<Register />} />
      </Route>

      <Route
        element={
          <RequireAuth>
            <UserLayout />
          </RequireAuth>
        }
      >
        <Route path={ROUTES.dashboard} element={<Dashboard />} />
        <Route path={ROUTES.profile} element={<Profile />} />
        <Route path={ROUTES.clubs} element={<Clubs />} />
        <Route path={ROUTES.events} element={<Events />} />
        <Route path={ROUTES.myClubs} element={<MyClubs />} />
      </Route>

      <Route
        element={
          <RequireAuth>
            <RequireRole allowedRoles={['admin']}>
              <AdminLayout />
            </RequireRole>
          </RequireAuth>
        }
      >
        <Route path={ROUTES.admin} element={<AdminDashboard />} />
        <Route path={ROUTES.adminUsers} element={<UserManagement />} />
        <Route path={ROUTES.adminSettings} element={<Settings />} />
      </Route>

      <Route path={ROUTES.forbidden} element={<Forbidden />} />
      <Route path={ROUTES.notFound} element={<NotFound />} />

      <Route path="/home-logged" element={<Navigate to={ROUTES.dashboard} replace />} />
      <Route path="/signup" element={<Navigate to={ROUTES.register} replace />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

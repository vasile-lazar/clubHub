import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GuestLayout } from '../layouts/GuestLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { UserLayout } from '../layouts/UserLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { Guard } from './Guard';
import { PATHS } from './paths';

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

const router = createBrowserRouter([
  {
    element: <GuestLayout />,
    children: [
      { path: PATHS.public.home, element: <Landing /> },
    ],
  },
  {
    element: <Guard publicOnly />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: PATHS.public.login, element: <Login /> },
          { path: PATHS.public.register, element: <Register /> },
        ],
      },
    ],
  },
  {
    element: <Guard requireAuth />,
    children: [
      {
        element: <UserLayout />,
        children: [
          { path: PATHS.app.dashboard, element: <Dashboard /> },
          { path: PATHS.app.profile, element: <Profile /> },
          { path: PATHS.app.clubs, element: <Clubs /> },
          { path: PATHS.app.events, element: <Events /> },
          { path: PATHS.app.myClubs, element: <MyClubs /> },
        ],
      },
    ],
  },
  {
    element: <Guard requireAuth allowedRoles={['admin']} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: PATHS.admin.dashboard, element: <AdminDashboard /> },
          { path: PATHS.admin.users, element: <UserManagement /> },
          { path: PATHS.admin.settings, element: <Settings /> },
        ],
      },
    ],
  },
  { path: PATHS.public.forbidden, element: <Forbidden /> },
  { path: '*', element: <NotFound /> },
]);

export const AppRoutes = () => <RouterProvider router={router} />;
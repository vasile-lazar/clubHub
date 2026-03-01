import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {SmartLayout} from '../layouts/SmartLayout';
import {AuthLayout} from '../layouts/AuthLayout';
import {UserLayout} from '../layouts/UserLayout';
import {AdminLayout} from '../layouts/AdminLayout';
import {ClubManagerLayout} from '../layouts/ClubManagerLayout';
import {Guard} from './Guard';
import {PATHS} from './paths';

import {Landing} from '../pages/guest/Landing';
import {Login} from '../pages/guest/Login';
import {Register} from '../pages/guest/Register';
import {Clubs} from '../pages/user/Clubs';
import {ClubPage} from '../pages/user/ClubPage';
import {Events} from '../pages/user/Events';

import {Dashboard} from '../pages/user/Dashboard';
import Profile from '../pages/user/Profile';
import {MyClubs} from '../pages/user/MyClubs';

import {AdminDashboard} from '../pages/admin/AdminDashboard';
import {UserManagement} from '../pages/admin/UserManagement';
import {ClubsManagement} from '../pages/admin/ClubsManagement';
import {EventsManagement} from '../pages/admin/EventsManagement';
import {Settings} from '../pages/admin/Settings';

import {ClubManagerClubsManagement} from '../pages/clubmanager/ClubManagerClubsManagement';
import {ClubManagerEventsManagement} from '../pages/clubmanager/ClubManagerEventsManagement';

import {NotFound} from '../pages/NotFound';
import {Forbidden} from '../pages/Forbidden';

const router = createBrowserRouter([
    // Public — accessible by everyone, layout based on auth state
    {
        element: <SmartLayout/>,
        children: [
            {path: PATHS.public.home, element: <Landing/>},
            {path: PATHS.app.clubs, element: <Clubs/>},
            {path: PATHS.app.clubDetail, element: <ClubPage/>},
            {path: PATHS.app.events, element: <Events/>},
        ],
    },

    // Auth — redirect away if already logged in
    {
        element: <Guard publicOnly/>,
        children: [
            {
                element: <AuthLayout/>,
                children: [
                    {path: PATHS.public.login, element: <Login/>},
                    {path: PATHS.public.register, element: <Register/>},
                ],
            },
        ],
    },

    // User + ClubManager shared routes
    {
        element: <Guard requireAuth allowedRoles={['user', 'clubmanager']}/>,
        children: [
            {
                element: <UserLayout/>,
                children: [
                    {path: PATHS.app.dashboard, element: <Dashboard/>},
                    {path: PATHS.app.profile, element: <Profile/>},
                    {path: PATHS.app.myClubs, element: <MyClubs/>},
                ],
            },
        ],
    },

    // ClubManager only
    {
        element: <Guard requireAuth allowedRoles={['clubmanager']}/>,
        children: [
            {
                element: <ClubManagerLayout/>,
                children: [
                    {path: PATHS.clubmanager.clubs, element: <ClubManagerClubsManagement/>},
                    {path: PATHS.clubmanager.events, element: <ClubManagerEventsManagement/>},
                ],
            },
        ],
    },
    // Admin only
    {
        element: <Guard requireAuth allowedRoles={['admin']}/>,
        children: [
            {
                element: <AdminLayout/>,
                children: [
                    {path: PATHS.admin.dashboard, element: <AdminDashboard/>},
                    {path: PATHS.admin.users, element: <UserManagement/>},
                    {path: PATHS.admin.clubs, element: <ClubsManagement/>},
                    {path: PATHS.admin.events, element: <EventsManagement/>},
                    {path: PATHS.admin.settings, element: <Settings/>},
                ],
            },
        ],
    },

    {path: PATHS.public.forbidden, element: <Forbidden/>},
    {path: '*', element: <NotFound/>},
]);

export const AppRoutes = () => <RouterProvider router={router}/>;
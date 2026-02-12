// src/routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import GuestLayout from '../layouts/GuestLayout';
import LoggedInLayout from '../layouts/LoggedInLayout';

import Home from '../pages/Home';
import HomeLogged from '../pages/HomeLogged';
import LogIn from '../pages/LogIn';
import SignUp from '../pages/SignUp';
import MyProfile from '../pages/MyProfile';
import Clubs from '../pages/Clubs';
import Events from '../pages/Events';

import type { User } from '../App';

interface AppRoutesProps {
    loggedInUser: User | null;
    setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ loggedInUser, setLoggedInUser }) => {
    const isLoggedIn = !!loggedInUser;

    return (
        <Routes>
            {/* Guest Layout Routes */}
            <Route element={<GuestLayout />}>
                <Route
                    path="/"
                    element={isLoggedIn ? <Navigate to="/home-logged" replace /> : <Home />}
                />
                <Route path="/login" element={<LogIn setLoggedInUser={setLoggedInUser} />} />
                <Route path="/signup" element={<SignUp />} />
            </Route>

            {/* Logged-In Layout Routes */}
            {isLoggedIn && loggedInUser && (
                <Route
                    element={<LoggedInLayout user={loggedInUser} setUser={setLoggedInUser} />}
                >
                    <Route
                        path="/home-logged"
                        element={<HomeLogged />}
                    />
                    <Route
                        path="/profile"
                        element={<MyProfile user={loggedInUser} setUser={setLoggedInUser} />}
                    />
                    <Route path="/clubs" element={<Clubs />} />
                    <Route path="/events" element={<Events />} />
                </Route>
            )}

            {/* Catch-all 404 */}
            <Route
                path="*"
                element={
                    <div className="text-red-500 text-center pt-40">
                        Pagina nu a fost găsită (404)
                    </div>
                }
            />
        </Routes>
    );
};

export default AppRoutes;

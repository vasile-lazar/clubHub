import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import GuestLayout from '../layouts/GuestLayout';
import LoggedInLayout from '../layouts/LoggedInLayout';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';
import HomeLogged from '../pages/HomeLogged';
import LogIn from '../pages/LogIn';
import SignUp from '../pages/SignUp';
import MyProfile from '../pages/MyProfile';
import Clubs from '../pages/Clubs';
import Events from '../pages/Events';
import MyClubs from "../pages/MyClubs.tsx";

import {PathConsts} from "./PathConsts.ts";
import type { User } from '../types/User.ts';

interface AppRoutesProps {
    loggedInUser: User | null;
    setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ loggedInUser, setLoggedInUser }) => {
    return (
        <Router>
            <Routes>
                {/* Guest Layout */}
                <Route element={<GuestLayout />}>
                    <Route path={PathConsts.landing} element={<Home />} />
                    <Route path={PathConsts.login} element={<LogIn setLoggedInUser={setLoggedInUser} />} />
                    <Route path={PathConsts.signup} element={<SignUp />} />
                </Route>

                {/* Protected Routes */}
                <Route element={<ProtectedRoute user={loggedInUser} />}>
                    <Route
                        element={<LoggedInLayout user={loggedInUser!} setUser={setLoggedInUser} />}
                    >
                        <Route path={PathConsts.homelogged} element={<HomeLogged />} />
                        <Route path={PathConsts.myclubs} element={<MyClubs user={loggedInUser!} setUser={setLoggedInUser} />}/>
                        <Route
                            path={PathConsts.profile}
                            element={<MyProfile user={loggedInUser!} setUser={setLoggedInUser} />}
                        />
                        <Route path={PathConsts.clubs} element={<Clubs />} />
                        <Route path={PathConsts.events} element={<Events />} />
                    </Route>
                </Route>

                {/* Catch-all 404 */}
                <Route
                    path="*"
                    element={
                        <div className="text-text-warning text-center pt-40">
                            Pagina nu a fost găsită (404)
                        </div>
                    }
                />
            </Routes>
        </Router>
    );
};

export default AppRoutes;

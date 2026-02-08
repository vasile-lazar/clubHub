import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import HomeLogged from './pages/HomeLogged';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import MyProfile from './pages/MyProfile';

export interface User {
    username: string;
    password: string;
    role: 'user' | 'admin';
    pfp?: string;
}

function App() {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    return (
        <Router>
            {loggedInUser && (
                <Sidebar
                    username={loggedInUser.username}
                    pfp={loggedInUser.pfp}
                    role={loggedInUser.role}
                    setLoggedInUser={setLoggedInUser}
                />
            )}

            <div className={`transition-all min-h-screen ${loggedInUser ? 'ml-64' : 'ml-0'}`}>
                <div className="p-0">
                    <Routes>
                        {/* Redirect home to HomeLogged if signed in */}
                        <Route
                            path="/"
                            element={loggedInUser ? <Navigate to="/home-logged" replace /> : <Home />}
                        />
                        <Route path="/home-logged" element={<HomeLogged />} />
                        <Route
                            path="/profile"
                            element={
                                loggedInUser ? (
                                    <MyProfile user={loggedInUser} setUser={setLoggedInUser} />
                                ) : (
                                    <Navigate to="/login" replace />
                                )
                            }
                        />
                        <Route
                            path="/login"
                            element={<LogIn setLoggedInUser={setLoggedInUser} />}
                        />
                        <Route path="/signup" element={<SignUp />} />
                        <Route
                            path="*"
                            element={
                                <div className="text-red-500 text-center pt-40">
                                    Pagina nu a fost găsită (404)
                                </div>
                            }
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

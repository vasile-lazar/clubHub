import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Clubs from './pages/Clubs';
import Announcements  from './pages/Announcements';

export interface User {
    username: string;
    password: string;
    role: 'user' | 'admin';
    pfp?: string; // optional profile picture
}


function App() {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    return (
        <Router>
            <div id="wrapper" className={loggedInUser ? '' : 'no-sidebar'}>
                {loggedInUser && <Sidebar />}
                <div id="main" style={{ width: loggedInUser ? undefined : '100%' }}>
                    <div className="inner">
                        <Header loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
                        <Routes>
                            <Route path="/" element={<Home/>} />
                            <Route path="/login" element={<LogIn setLoggedInUser={setLoggedInUser} />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/clubs" element={<Clubs />} />
                            <Route path="/announcements" element={<Announcements />} />
                            <Route path="*" element={<div style={{color: "red", textAlign: "center", paddingTop:370}}>Pagina nu a fost găsită (404)</div>} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;

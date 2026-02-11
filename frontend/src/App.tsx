import {useState} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import ThemeToggle from "./components/ThemeToggle.tsx";

export interface User {
    username: string;
    password: string;
    role: 'user' | 'admin';
    pfp?: string;
}

function App() {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    return (
        <>
            <ThemeToggle/>
            <Router>
                <AppRoutes loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
            </Router>
        </>
    );
}

export default App;

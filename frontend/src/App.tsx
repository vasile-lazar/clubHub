import {useState} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

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
                <AppRoutes loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
        </Router>
    );
}

export default App;

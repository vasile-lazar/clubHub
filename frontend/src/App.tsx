import {useState} from 'react';
import AppRoutes from './routes/AppRoutes';
import type {User} from './types/User.ts'

function App() {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    return (
        <AppRoutes loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
    );
}

export default App;

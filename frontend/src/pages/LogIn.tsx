import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
    username: string;
    password: string;
    role: "user" | "admin";
}

// Mock users
const MOCK_USERS: User[] = [
    { username: "alice", password: "123", role: "user" },
    { username: "bob", password: "admin", role: "admin" },
];

const LoginPage: React.FC<{ setLoggedInUser: (user: User) => void }> = ({ setLoggedInUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        const found = MOCK_USERS.find(
            (u) => u.username === username && u.password === password
        );
        if (found) {
            setLoggedInUser(found);   // update global/app state
            setError("");
            navigate("/");            // redirect to home page
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="login-page">
            <h2>Log In</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Log In</button>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default LoginPage;

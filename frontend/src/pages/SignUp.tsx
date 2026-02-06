import React, { useState } from "react";

const SignUpPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignUp = () => {
        // For now, just check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
        } else {
            setError("");
            alert("Sign-up submitted (mock, no backend)");
            // Here you would normally send data to backend
            setUsername("");
            setPassword("");
            setConfirmPassword("");
        }
    };

    return (
        <div className="login-page">
            <h2>Sign Up</h2>
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
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleSignUp}>Sign Up</button>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default SignUpPage;

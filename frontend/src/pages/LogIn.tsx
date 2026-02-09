import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginPhoto from '../images/loginPhoto.jpg';

interface LogInProps {
    setLoggedInUser: (user: any) => void;
}

const LogIn: React.FC<LogInProps> = ({ setLoggedInUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (username === 'user' && password === 'user') {
            setLoggedInUser({ username, password, role: 'user' });
            navigate('/home-logged');
        } else if (username === 'admin' && password === 'admin') {
            setLoggedInUser({ username, password, role: 'admin' });
            navigate('/home-logged');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="relative flex min-h-screen w-full">
            {/* Home button */}
            <Link
                to="/"
                className="absolute top-6 right-6 z-20 bg-button-dark text-text-inverse px-4 py-2 rounded hover:bg-button-darkHover"
            >
                Go back
            </Link>

            {/* Left photo */}
            <div className="hidden md:flex md:w-1/2 flex-shrink-0 relative">
                <div className="absolute top-6 left-6 z-20 text-white text-2xl font-bold">
                    ClubHub
                </div>

                <img
                    src={loginPhoto}
                    alt="Login"
                    className="object-cover w-full h-screen"
                />
            </div>

            {/* Right form */}
            <div className="flex-1 flex items-center justify-center bg-bg-primary p-8">
                <div className="max-w-md w-full space-y-8">
                    <h2 className="text-3xl font-bold text-text-primary">
                        Welcome Back to ClubHub
                    </h2>
                    <p className="text-text-secondary">
                        Please log in to your account
                    </p>

                    <form className="space-y-4" onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setError('');
                            }}
                            className="w-full p-3 rounded border border-input-border focus:border-input-focus"
                            required
                        />

                        <div className="space-y-1">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError('');
                                }}
                                className="w-full p-3 rounded border border-input-border focus:border-input-focus"
                                required
                            />
                            {error && (
                                <p className="text-sm text-red-500">
                                    {error}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-between items-center text-sm mt-1">
                            <label className="flex items-center gap-2 text-text-secondary">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="accent-button-orange"
                                />
                                Remember me
                            </label>

                            <button
                                type="button"
                                className="text-button-orange hover:underline"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-button-orange text-text-inverse p-3 rounded hover:bg-button-orangeHover"
                        >
                            Log In
                        </button>
                    </form>

                    <p className="text-text-secondary text-center mt-6">
                        No account?{' '}
                        <Link
                            to="/signup"
                            className="text-button-orange hover:underline font-semibold"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LogIn;

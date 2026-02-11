import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import registerPhoto from '../assets/images/loginPhoto.jpg';

const SignUp: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setError('');
        alert('Registered successfully!');
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
                    src={registerPhoto}
                    alt="Register"
                    className="object-cover w-full h-screen"
                />
            </div>

            {/* Right form */}
            <div className="flex-1 flex items-center justify-center bg-bg-primary p-8">
                <div className="max-w-md w-full space-y-8">
                    <h2 className="text-3xl font-bold text-text-primary">
                        Welcome to ClubHub
                    </h2>
                    <p className="text-text-secondary">
                        Create your account to join the community
                    </p>

                    <form className="space-y-4" onSubmit={handleRegister}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 rounded border border-input-border focus:border-input-focus"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded border border-input-border focus:border-input-focus"
                            required
                        />
                        <div className="space-y-1">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full p-3 rounded border border-input-border focus:border-input-focus"
                                required
                            />
                            {error && (
                                <p className="text-red-500 text-sm">
                                    {error}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-button-orange text-text-inverse p-3 rounded hover:bg-button-orangeHover"
                        >
                            Register
                        </button>
                    </form>

                    <p className="text-text-secondary text-center mt-6">
                        Have an account?{' '}
                        <Link
                            to="/login"
                            className="text-button-orange hover:underline font-semibold"
                        >
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import type { User } from "../App";

interface HeaderProps {
    loggedInUser: User | null;
    setLoggedInUser: (user: User | null) => void;
}

const Header: React.FC<HeaderProps> = ({ loggedInUser, setLoggedInUser }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        setLoggedInUser(null);
        setDropdownOpen(false);
    };

    return (
        <header className="w-full bg-gray-900 text-white flex items-center justify-between px-6 py-3 shadow-md fixed top-0 z-50">

            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-indigo-500">
                ClubHub
            </Link>

            {/* Center navigation */}
            <nav className="flex space-x-6">
                <Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link>
                <Link to="/clubs" className="hover:text-indigo-400 transition-colors">Clubs</Link>
                <Link to="/announcements" className="hover:text-indigo-400 transition-colors">Announcements</Link>
            </nav>

            {/* Auth/Profile */}
            <div className="flex items-center space-x-4 relative">
                {!loggedInUser ? (
                    <>
                        <Link
                            to="/login"
                            className="px-4 py-1 rounded hover:bg-gray-700 transition-colors"
                        >
                            Log In
                        </Link>
                        <Link
                            to="/signup"
                            className="px-4 py-1 bg-indigo-500 rounded hover:bg-indigo-600 transition-colors"
                        >
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <img
                            src={loggedInUser.pfp || "/default-pfp.jpg"}
                            alt="Profile"
                            className="w-9 h-9 rounded-full border-2 border-indigo-500"
                        />
                        <span className="hidden md:inline">{loggedInUser.username}</span>

                        {dropdownOpen && (
                            <ul className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded shadow-lg py-2 text-sm">
                                <li className="px-4 py-1 border-b border-gray-700">Role: {loggedInUser.role}</li>
                                <li>
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-1 hover:bg-gray-700 transition-colors"
                                    >
                                        My Profile
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-1 hover:bg-gray-700 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;

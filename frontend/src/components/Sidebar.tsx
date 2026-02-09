import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { User } from '../App';

interface SidebarProps {
    username?: string;
    pfp?: string;
    role?: string;
    setLoggedInUser?: React.Dispatch<React.SetStateAction<User | null>>;
}

const Sidebar: React.FC<SidebarProps> = ({ username = 'User', pfp, role = 'user', setLoggedInUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (setLoggedInUser) {
            setLoggedInUser(null);
            navigate('/login');
        }
    };

    return (
        <div className="fixed top-0 left-0 h-screen w-64 bg-bg-secondary flex flex-col shadow-lg z-50">
            {/* Profile section */}
            <div className="flex items-center gap-4 p-4 border-b border-card-border">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300">
                    {pfp ? (
                        <img src={pfp} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-text-primary flex items-center justify-center h-full w-full">
                            {username.charAt(0).toUpperCase()}
                        </span>
                    )}
                </div>
                <div>
                    <p className="text-text-primary font-semibold">{username}</p>
                    <p className="text-text-secondary text-sm">
                        {role === 'admin' ? 'Admin' : 'Student'}
                    </p>
                </div>
            </div>

            {/* User Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto">
                <p className="text-text-secondary uppercase text-xs font-bold mb-2">Your Dashboard</p>
                <ul className="space-y-2 mb-4">
                    <li>
                        <Link
                            to="/"
                            className="block px-3 py-2 rounded hover:bg-bg-primary text-text-primary font-medium"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/profile"
                            className="block px-3 py-2 rounded hover:bg-bg-primary text-text-primary font-medium"
                        >
                            My Profile
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/my-clubs"
                            className="block px-3 py-2 rounded hover:bg-bg-primary text-text-primary font-medium"
                        >
                            My Clubs
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/my-events"
                            className="block px-3 py-2 rounded hover:bg-bg-primary text-text-primary font-medium"
                        >
                            My Events
                        </Link>
                    </li>
                </ul>

                {/* Divider */}
                <hr className="border-card-border my-2" />

                {/* Global Navigation */}
                <p className="text-text-secondary uppercase text-xs font-bold mb-2">Global</p>
                <ul className="space-y-2">
                    <li>
                        <Link
                            to="/clubs"
                            className="block px-3 py-2 rounded hover:bg-bg-primary text-text-primary font-medium"
                        >
                            Clubs
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/events"
                            className="block px-3 py-2 rounded hover:bg-bg-primary text-text-primary font-medium"
                        >
                            Events
                        </Link>
                    </li>
                </ul>

                {/* Admin Panel (only for admins) */}
                {role === 'admin' && (
                    <>
                        <hr className="border-card-border my-2" />
                        <p className="text-text-secondary uppercase text-xs font-bold mb-2">Admin Panel</p>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/admin/users"
                                    className="block px-3 py-2 rounded hover:bg-bg-primary text-text-primary font-medium"
                                >
                                    Manage Users
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/clubs"
                                    className="block px-3 py-2 rounded hover:bg-bg-primary text-text-primary font-medium"
                                >
                                    Manage Clubs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/events"
                                    className="block px-3 py-2 rounded hover:bg-bg-primary text-text-primary font-medium"
                                >
                                    Manage Events
                                </Link>
                            </li>
                        </ul>
                    </>
                )}
            </nav>

            {/* Log out button */}
            <div className="p-4 border-t border-card-border">
                <button
                    onClick={handleLogout}
                    className="w-full bg-button-dark text-text-inverse p-2 rounded hover:bg-button-darkHover"
                >
                    Log Out
                </button>
            </div>

            {/* Footer / Contact */}
            <div className="p-4 border-t border-card-border text-xs text-text-secondary">
                <p>Have Questions?</p>
                <p>
                    <Link to="mailto:contact@clubhub.university.edu" className="hover:underline">
                        contact@clubhub.university.edu
                    </Link>
                </p>
                <p>(123) 456-7890</p>
                <p className="mt-2">&copy; 2026 ClubHub. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Sidebar;

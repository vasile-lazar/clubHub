import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/main.css';
import { User } from "../App";

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
        <header id="header">
            <Link to="/" className="logo">
                <strong>ClubHub</strong>
            </Link>

            <ul className="auth-links">
                {!loggedInUser ? (
                    <>
                        <li><Link to="/login">Log In</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                    </>
                ) : (
                    <li
                        className="profile-menu"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <img
                            src={loggedInUser.pfp || "/default-pfp.jpg"}
                            alt="Profile"
                            className="pfp"
                        />
                        {dropdownOpen && (
                            <ul className="dropdown">
                                <li>Role: {loggedInUser.role}</li>
                                <li><Link to="/profile">My Profile</Link></li>
                                <li><button onClick={handleLogout}>Logout</button></li>
                            </ul>
                        )}
                    </li>
                )}
            </ul>
        </header>
    );
};

export default Header;

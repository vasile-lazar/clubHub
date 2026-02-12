import { useState } from "react";
import { Link } from "react-router-dom";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const Header: React.FC = () => {
    const [theme, setTheme] = useState<"light" | "dark">("light"); // start in light mode

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark"); // toggle dark class
    };

    return (
        <header className="fixed w-full z-50 bg-bg-surface backdrop-blur-md border-b border-none transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-brand-orangeDark">
                        ClubHub
                    </Link>

                    {/* Center navigation */}
                    <nav className="flex space-x-6">
                        <Link to="/" className="text-text-primary hover:text-button-primaryHover transition-colors">
                            Home
                        </Link>
                        <Link to="/clubs" className="text-text-primary hover:text-button-primaryHover transition-colors">
                            Clubs
                        </Link>
                        <Link
                            to="/announcements"
                            className="text-text-primary hover:text-button-primaryHover transition-colors"
                        >
                            Announcements
                        </Link>
                    </nav>

                    {/* Auth/Profile + Theme Toggle */}
                    <div className="flex items-center space-x-4 relative">
                        <Link
                            to="/login"
                            className="text-text-primary hover:text-button-primaryHover transition-colors"
                        >
                            Log In
                        </Link>
                        <Link
                            to="/signup"
                            className="text-white px-4 py-1 bg-button-secondary rounded hover:bg-button-secondaryHover transition-colors"
                        >
                            Sign Up
                        </Link>

                        {/* Theme toggle button */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded transition-colors"
                            title="Toggle light/dark mode"
                        >
                            {theme === "light" ? (
                                <SunIcon className="w-5 h-5 text-brand-orangeDark" />
                            ) : (
                                <MoonIcon className="w-5 h-5 text-text-primary" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

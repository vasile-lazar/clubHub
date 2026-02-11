import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const Header: React.FC = () => {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    // Load theme from localStorage or system preference
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        if (storedTheme) {
            setTheme(storedTheme);
            document.documentElement.classList.toggle("dark", storedTheme === "dark");
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setTheme(prefersDark ? "dark" : "light");
            document.documentElement.classList.toggle("dark", prefersDark);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    return (
        <header className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-orange-600">
                        ClubHub
                    </Link>

                    {/* Center navigation */}
                    <nav className="flex space-x-6">
                        <Link to="/" className="hover:text-button-orangeHover transition-colors">
                            Home
                        </Link>
                        <Link to="/clubs" className="hover:text-button-orangeHover transition-colors">
                            Clubs
                        </Link>
                        <Link
                            to="/announcements"
                            className="hover:text-button-orangeHover transition-colors"
                        >
                            Announcements
                        </Link>
                    </nav>

                    {/* Auth/Profile + Theme Toggle */}
                    <div className="flex items-center space-x-4 relative">
                        <Link
                            to="/login"
                            className="hover:text-button-orangeHover transition-colors"
                        >
                            Log In
                        </Link>
                        <Link
                            to="/signup"
                            className="text-white px-4 py-1 bg-slate-800 rounded hover:bg-black transition-colors"
                        >
                            Sign Up
                        </Link>

                        {/* Theme toggle button */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            title="Toggle light/dark mode"
                        >
                            {theme === "light" ? (
                                <SunIcon className="w-5 h-5 text-yellow-500" />
                            ) : (
                                <MoonIcon className="w-5 h-5 text-gray-200" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

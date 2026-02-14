import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

type Theme = "light" | "dark";

const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = useState<Theme>(() => {
        // 1️⃣ Check localStorage
        const saved = localStorage.getItem("theme") as Theme | null;
        if (saved) return saved;

        // 2️⃣ Check system preference
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        return prefersDark ? "dark" : "light";
    });

    // Apply theme to document + save it
    useEffect(() => {
        const isDark = theme === "dark";
        document.documentElement.classList.toggle("dark", isDark);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 z-50 p-2 rounded bg-bg-surface shadow-md hover:bg-bg-secondary transition-colors"
            title="Toggle light/dark mode"
        >
            {theme === "light" ? (
                <SunIcon className="w-6 h-6 text-yellow-500" />
            ) : (
                <MoonIcon className="w-6 h-6 text-gray-200" />
            )}
        </button>
    );
};

export default ThemeToggle;

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

type Theme = "light" | "dark";

interface ToggleThemeButtonProps {
    className?: string;
}

const ToggleThemeButton: React.FC<ToggleThemeButtonProps> = ({ className }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        // Check localStorage first
        const storedTheme = localStorage.getItem("theme") as Theme | null;
        if (storedTheme) return storedTheme;

        // Fallback to system preference
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDark ? "dark" : "light";
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };

    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 
                  hover:opacity-80 active:scale-95 [&>svg]:w-6 [&>svg]:h-6 ${className ?? ''}`}
            title="Toggle light/dark mode"
            aria-label="Toggle theme"
        >
            {theme === "light" ? (
                <MoonIcon className="w-6 h-6" />
            ) : (
                <SunIcon className="w-6 h-6" />
            )}
        </button>
    );
};

export default ToggleThemeButton;

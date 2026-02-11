import { useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = useState<"light" | "dark">("light"); // default light

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 z-50 p-2 rounded bg-bg-surface shadow-md hover:bg-bg-secondary dark:hover:bg-bg-secondary transition-colors"
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

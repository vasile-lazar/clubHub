import { Link } from "react-router-dom";
import ToggleThemeButton from "../../components/ThemeToggle.tsx";


const Header: React.FC = () => {
    
    // Common class for the glass-blur hover effect
    // Update the blurHoverClass
    const blurHoverClass = "px-2 py-2 rounded-full transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-md hover:shadow-lg active:scale-95";
    
    return (
        <header className="fixed top-0 w-full z-50 bg-brand-orange transition-colors border-b border-white/10">
            <div className="text-text-inverse font-bold max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Logo + divider */}
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/"
                            className="text-text-primary text-3xl font-black tracking-tighter hover:opacity-80 transition-opacity"
                        >
                            <span className="text-text-primary">Club</span>
                            <span className="text-text-inverse">Hub</span>
                        </Link>

                        <div className="h-6 w-[1px] bg-white/20" />
                    </div>
                    
                    {/* Center navigation with Blur Hovers */}
                    <nav className="flex space-x-2">
                        <Link to="/" className={blurHoverClass}>
                            Home
                        </Link>
                        <Link to="/clubs" className={blurHoverClass}>
                            Clubs
                        </Link>
                        <Link to="/announcements" className={blurHoverClass}>
                            Announcements
                        </Link>
                    </nav>

                    {/* Auth + Theme Toggle */}
                    <div className="flex items-center space-x-3">

                        {/* Theme toggle with Blur Hover */}
                        <ToggleThemeButton/>
                        <div className="h-6 w-[1px] bg-white/20 mx-2" />

                        <Link
                            to="/login"
                            className="hover:text-text-primary transition-colors font-medium"
                        >
                            Log In
                        </Link>

                        <Link
                            to="/signup"
                            className="px-5 py-2 bg-brand-blueDark text-white rounded-full font-bold shadow-md hover:brightness-110 hover:shadow-xl transition-all active:scale-95"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
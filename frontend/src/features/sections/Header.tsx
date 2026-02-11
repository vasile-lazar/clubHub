import { Link } from "react-router-dom";


const Header: React.FC = () => {
    
    return (
        <header className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-orange-600">
                        ClubHub
                    </Link>
        
                    {/* Center navigation */}
                    <nav className="flex space-x-6">
                        <Link to="/" className="hover:text-button-orangeHover transition-colors">Home</Link>
                        <Link to="/clubs" className="hover:text-button-orangeHover transition-colors">Clubs</Link>
                        <Link to="/announcements" className="hover:text-button-orangeHover transition-colors">Announcements</Link>
                    </nav>
        
                    {/* Auth/Profile */}
                    <div className="flex items-center space-x-4 relative">
                                <Link
                                    to="/login"
                                    className="hover: text-button-orangeHover transition-colors "
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/signup"
                                    className=" text-white px-4 py-1 bg-slate-800 rounded hover:bg-black transition-colors"
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

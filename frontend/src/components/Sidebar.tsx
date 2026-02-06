import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../styles/main.css';

const Sidebar: React.FC = () => {
    const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});

    const toggleSubmenu = (name: string) => {
        setOpenSubmenus(prev => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

    return (
        <div id="sidebar">
            <div className="inner">
                {/* Menu */}
                <nav id="menu">
                    <header className="major">
                        <h2>Menu</h2>
                    </header>
                    <ul>
                        <li><Link to="/">Homepage</Link></li>
                        <li><Link to="/generic">Clubs</Link></li>
                        <li><Link to="#">Events</Link></li>
                        <li><Link to="#">Announcements</Link></li>

                    </ul>
                </nav>

                {/* Contact */}
                <section>
                    <header className="major">
                        <h2>Have Questions?</h2>
                    </header>
                    <ul className="contact">
                        <li className="icon solid fa-envelope">
                            <Link to="mailto:info@untitled.tld">contact@clubhub.university.edu</Link>
                        </li>
                        <li className="icon solid fa-phone">(123) 456-7890</li>
                    </ul>
                </section>

                {/* Footer */}
                <footer id="footer">
                    <p className="copyright">&copy; 2026 ClubHub. All rights reserved.</p>
                </footer>

            </div>
        </div>
    );
};

export default Sidebar;

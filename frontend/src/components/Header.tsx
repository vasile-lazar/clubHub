import React from 'react';
import { Link } from "react-router-dom";
import '../styles/main.css';
interface SocialIcon {
    href: string;
    label: string;
    iconClass: string;
}

const Header: React.FC = () => {
    const socialLinks: SocialIcon[] = [
        { href: "#", label: "Twitter", iconClass: "fa-twitter" },
        { href: "#", label: "Facebook", iconClass: "fa-facebook-f" },
        { href: "#", label: "Snapchat", iconClass: "fa-snapchat-ghost" },
        { href: "#", label: "Instagram", iconClass: "fa-instagram" },
        { href: "#", label: "Medium", iconClass: "fa-medium-m" },
    ];

    return (
        <header id="header">
            <Link to="/" className="logo">
                <strong>ClubHub</strong>
            </Link>

            <ul className="icons">
                {socialLinks.map((social, index) => (
                    <li key={index}>
                        <Link to={social.href} className={`icon brands ${social.iconClass}`}>
                            <span className="label">{social.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </header>
    );
};

export default Header;
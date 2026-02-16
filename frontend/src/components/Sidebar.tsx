import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import type { User } from '../App';
import ToggleThemeButton from "./ThemeToggle.tsx";

import {
    HomeIcon,
    UserIcon,
    UserGroupIcon,
    CalendarIcon,
    ShieldCheckIcon,
    ArrowLeftEndOnRectangleIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
    username?: string;
    pfp?: string;
    role?: 'user' | 'admin';
    setLoggedInUser?: React.Dispatch<React.SetStateAction<User | null>>;
}

type NavItem = {
    to: string;
    label: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const iconClass = 'h-6 w-6';

const userLinks: NavItem[] = [
    { to: '/home-logged', label: 'Home', icon: HomeIcon },
    { to: '/profile', label: 'My Profile', icon: UserIcon },
    { to: '/my-clubs', label: 'My Clubs', icon: UserGroupIcon },
    { to: '/my-events', label: 'My Events', icon: CalendarIcon },
];

const globalLinks: NavItem[] = [
    { to: '/clubs', label: 'Clubs', icon: UserGroupIcon },
    { to: '/events', label: 'Events', icon: CalendarIcon },
];

const adminLinks: NavItem[] = [
    { to: '/admin/users', label: 'Manage Users', icon: UserGroupIcon },
    { to: '/admin/clubs', label: 'Manage Clubs', icon: ShieldCheckIcon },
    { to: '/admin/events', label: 'Manage Events', icon: CalendarIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ username = 'User', pfp, role = 'user', setLoggedInUser }) => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const handleLogout = () => {
        setLoggedInUser?.(null);
        navigate('/');
    };

    const renderLinks = (links: NavItem[]) =>
        links.map(({ to, label, icon: Icon }) => (
            <li key={to} className="group relative">
                <NavLink
                    to={to}
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded font-medium relative ${
                            isActive
                                ? 'bg-brand-orange text-text-inverse'
                                : 'text-text-primary hover:bg-bg-primary'
                        }`
                    }
                >
                    {Icon && <Icon className={iconClass} />}
                    {!collapsed && <span>{label}</span>}

                    {/* Tooltip on collapse */}
                    {collapsed && (
                        <span className="absolute left-full ml-2 whitespace-nowrap px-2 py-1 rounded bg-bg-primary text-text-primary text-xs opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">
                            {label}
                        </span>
                    )}
                </NavLink>
            </li>
        ));

    return (
        <div
            className={`sticky top-0 left-0 h-screen bg-bg-primary flex flex-col shadow-lg z-50 transition-all duration-300 border-r-4 border-text-secondary ${
                collapsed ? 'w-20' : 'w-64'
            }`}
        >
            {/* Collapse toggle */}
            <div className="flex justify-end p-2">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-bg-primary transition-colors relative group"
                    title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                >
                    {collapsed ? (
                        <ChevronRightIcon className="h-5 w-5 text-text-primary" />
                    ) : (
                        <ChevronLeftIcon className="h-5 w-5 text-text-primary" />
                    )}
                </button>
            </div>

            {/* Profile */}
            <div
                className={`flex items-center gap-4 p-4 border-b border-border-default ${
                    collapsed ? 'justify-center' : ''
                }`}
            >
                <div className="w-12 h-12 rounded-full overflow-hidden bg-bg-primary flex items-center justify-center">
                    {pfp ? (
                        <img src={pfp} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-text-primary">{username.charAt(0).toUpperCase()}</span>
                    )}
                </div>
                {!collapsed && (
                    <div>
                        <p className="text-text-primary font-semibold">{username}</p>
                        <p className="text-text-secondary text-sm">{role === 'admin' ? 'Admin' : 'Student'}</p>
                    </div>
                )}
                <div className={`absolute right-0 mr-4 ${collapsed ? 'hidden' : ''}`}>
                <ToggleThemeButton className="text-text-primary"/>
                </div>  
            </div>

            {/* Navigation */}
            <nav className={`flex-1 p-4 ${
                collapsed ? 'overflow-hidden' : 'overflow-y-auto'
            }`}>
                <Section title="Your Dashboard" collapsed={collapsed}>
                    {renderLinks(userLinks)}
                </Section>
                <Divider />
                <Section title="Global" collapsed={collapsed}>
                    {renderLinks(globalLinks)}
                </Section>
                {role === 'admin' && (
                    <>
                        <Divider />
                        <Section title="Admin Panel" collapsed={collapsed}>
                            {renderLinks(adminLinks)}
                        </Section>
                    </>
                )}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-border-default">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-button-secondary text-slate-400 p-2 rounded hover:bg-button-secondaryHover transition"
                >
                    {!collapsed ? 'Log Out' : <ArrowLeftEndOnRectangleIcon className={iconClass} />}
                </button>
            </div>
        </div>
    );
};

/* Helpers */
const Section: React.FC<{ title: string; children: React.ReactNode; collapsed?: boolean }> = ({
                                                                                                  title,
                                                                                                  children,
                                                                                                  collapsed,
                                                                                              }) => (
    <>
        {!collapsed && <p className="text-text-secondary uppercase text-xs font-bold mb-2">{title}</p>}
        <ul className="space-y-2 mb-4">{children}</ul>
    </>
);

const Divider = () => <hr className="border-border-default my-2" />;

export default Sidebar;

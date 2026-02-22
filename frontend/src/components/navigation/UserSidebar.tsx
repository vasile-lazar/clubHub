import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    HomeIcon,
    UserIcon,
    UserGroupIcon,
    CalendarIcon,
    ArrowLeftEndOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
    ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import { useToggle } from '../../hooks/useToggle';
import ThemeToggle from '../ThemeToggle';
import { PATHS } from '../../routes/paths';
import type { User } from '../../types';

interface NavItem {
    to: string;
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const userNavItems: NavItem[] = [
    { to: PATHS.app.dashboard, label: 'Dashboard', icon: HomeIcon },
    { to: PATHS.app.profile, label: 'Profile', icon: UserIcon },
    { to: PATHS.app.myClubs, label: 'My Clubs', icon: UserGroupIcon },
    { to: PATHS.app.clubs, label: 'Clubs', icon: UserGroupIcon },
    { to: PATHS.app.events, label: 'Events', icon: CalendarIcon },
];

interface NavItemProps {
    item: NavItem;
    onClose: () => void;
    navLinkClass: ({ isActive }: { isActive: boolean }) => string;
}

function UserNavItem({ item, onClose, navLinkClass }: NavItemProps) {
    const { to, label, icon: Icon } = item;
    return (
        <NavLink to={to} className={navLinkClass} onClick={onClose}>
            <Icon className="h-5 w-5 flex-shrink-0" />
            <span>{label}</span>
        </NavLink>
    );
}

interface UserSidebarProps {
    user: User;
}

export const UserSidebar: React.FC<UserSidebarProps> = ({ user }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isMobileOpen, toggleMobile, setMobileOpen] = useToggle(false);

    const handleLogout = () => {
        logout();
        navigate(PATHS.public.login);
    };

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition ${
            isActive ? 'bg-brand-orange text-white' : 'text-text-primary hover:bg-bg-secondary'
        }`;

    const sidebarContent = (
        <>
            <div className="p-4 border-b border-border-default">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-bg-secondary flex items-center justify-center overflow-hidden">
                        {user.pfp ? (
                            <img src={user.pfp} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-text-primary font-bold text-lg">
                {user.username.charAt(0).toUpperCase()}
              </span>
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="font-semibold text-text-primary truncate">{user.username}</p>
                        <p className="text-xs text-text-secondary capitalize">{user.role}</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {userNavItems.map((item) => (
                    <UserNavItem
                        key={item.to}
                        item={item}
                        onClose={() => setMobileOpen(false)}
                        navLinkClass={navLinkClass}
                    />
                ))}
                {user.role === 'admin' && (
                    <>
                        <div className="my-2 border-t border-border-default" />
                        <NavLink
                            to={PATHS.admin.root}
                            className={navLinkClass}
                            onClick={() => setMobileOpen(false)}
                        >
                            <ShieldCheckIcon className="h-5 w-5 flex-shrink-0" />
                            <span>Admin Panel</span>
                        </NavLink>
                    </>
                )}
            </nav>

            <div className="p-4 border-t border-border-default flex items-center gap-2">
                <ThemeToggle className="text-text-primary" />
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition font-medium"
                >
                    <ArrowLeftEndOnRectangleIcon className="h-5 w-5" />
                    Log Out
                </button>
            </div>
        </>
    );

    return (
        <>
            <button
                onClick={() => toggleMobile()}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-bg-primary border border-border-default shadow-md"
                aria-label="Toggle menu"
            >
                {isMobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>

            <aside
                className={`
          fixed inset-y-0 left-0 z-40 w-64 h-screen min-h-[100vh] bg-bg-primary border-r border-border-default
          flex flex-col transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                {sidebarContent}
            </aside>

            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-30 bg-black/50"
                    onClick={() => setMobileOpen(false)}
                    aria-hidden
                />
            )}
        </>
    );
};
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';
import {
    ShieldCheckIcon,
    UserGroupIcon,
    Cog6ToothIcon,
    ArrowLeftEndOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks';
import { useToggle } from '../../hooks';
import { PATHS } from '../../routes/paths';
import type { User } from '../../types';

interface NavItem {
    to: string;
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const adminNavItems: NavItem[] = [
    { to: PATHS.admin.root, label: 'Admin Dashboard', icon: ShieldCheckIcon },
    { to: PATHS.admin.users, label: 'Manage Users', icon: UserGroupIcon },
    { to: PATHS.admin.clubs, label: 'Manage Clubs', icon: Cog6ToothIcon },
    { to: PATHS.admin.events, label: 'Manage Events', icon: Cog6ToothIcon },
    { to: PATHS.admin.settings, label: 'Settings', icon: Cog6ToothIcon },
];

interface AdminNavItemProps {
    item: NavItem;
    onClose: () => void;
    navLinkClass: ({ isActive }: { isActive: boolean }) => string;
    end?: boolean;
}

function AdminNavItem({ item, onClose, navLinkClass, end }: AdminNavItemProps) {
    const { to, label, icon: Icon } = item;
    return (
        <NavLink to={to} className={navLinkClass} onClick={onClose} end={end}>
            <Icon className="h-5 w-5 flex-shrink-0" />
            <span>{label}</span>
        </NavLink>
    );
}

interface AdminSidebarProps {
    user: User;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ user }) => {
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
                    <div className="w-10 h-10 rounded-full bg-bg-secondary flex items-center justify-center">
                        <ShieldCheckIcon className="h-6 w-6 text-brand-orange" />
                    </div>
                    <div>
                        <p className="font-semibold text-text-primary">{user.username}</p>
                        <p className="text-xs text-brand-orange">Admin</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {adminNavItems.map((item) => (
                    <AdminNavItem
                        key={item.to}
                        item={item}
                        onClose={() => setMobileOpen(false)}
                        navLinkClass={navLinkClass}
                        end={item.to === PATHS.admin.root}
                    />
                ))}
                <div className="pt-4 mt-4 border-t border-border-default">
                    <NavLink
                        to={PATHS.app.dashboard}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-text-secondary hover:bg-bg-secondary"
                    >
                        ← Back to App
                    </NavLink>
                </div>
            </nav>

            <div className="p-4 border-t border-border-default flex flex-col gap-2">
                <ThemeToggle className="text-text-primary self-start" />
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
                aria-label="Toggle admin menu"
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
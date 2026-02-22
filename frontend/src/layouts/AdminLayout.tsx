import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Sidebar } from '../components/navigation/Sidebar';
import type { SidebarNavItem } from '../components/navigation/Sidebar';
import {
    ShieldCheckIcon,
    UserGroupIcon,
    Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { PATHS } from '../routes/paths';

const adminNavItems: SidebarNavItem[] = [
    { to: PATHS.admin.root, label: 'Admin Dashboard', icon: ShieldCheckIcon, end: true },
    { to: PATHS.admin.users, label: 'Manage Users', icon: UserGroupIcon },
    { to: PATHS.admin.settings, label: 'Settings', icon: Cog6ToothIcon },
];

export const AdminLayout: React.FC = () => {
    const { user } = useAuth();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    if (!user) return null;

    return (
        <div className="flex min-h-screen bg-bg-secondary">
            <Sidebar
                user={user}
                navItems={adminNavItems}
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
                footerLinks={[{ to: PATHS.app.dashboard, label: '← Back to App' }]}
                mobileMenuAriaLabel="Toggle admin menu"
            />
            <main
                className={`flex-1 overflow-auto min-h-screen transition-[margin] duration-300 ease-in-out ${
                    isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
                }`}
            >
                <div className="p-4 lg:p-6 border-l-1">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
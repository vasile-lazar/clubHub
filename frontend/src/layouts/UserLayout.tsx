import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Sidebar } from '../components/navigation/Sidebar';
import type { SidebarNavItem } from '../components/navigation/Sidebar';
import {
  HomeIcon,
  UserIcon,
  UserGroupIcon,
  CalendarIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { PATHS } from '../routes/paths';

const userNavItems: SidebarNavItem[] = [
  { to: PATHS.app.dashboard, label: 'Dashboard', icon: HomeIcon },
  { to: PATHS.app.profile, label: 'Profile', icon: UserIcon },
  { to: PATHS.app.myClubs, label: 'My Clubs', icon: UserGroupIcon },
  { to: PATHS.app.clubs, label: 'Clubs', icon: UserGroupIcon },
  { to: PATHS.app.events, label: 'Events', icon: CalendarIcon },
];

export const UserLayout: React.FC = () => {
  const { user } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  if (!user) return null;

  const extraNavItems: SidebarNavItem[] =
    user.role === 'admin'
      ? [{ to: PATHS.admin.root, label: 'Admin Panel', icon: ShieldCheckIcon }]
      : [];

  return (
    <div className="flex min-h-screen bg-bg-secondary">
      <Sidebar
        user={user}
        navItems={userNavItems}
        extraNavItems={extraNavItems.length > 0 ? extraNavItems : undefined}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        mobileMenuAriaLabel="Toggle menu"
      />
      <main
        className={`flex-1 overflow-auto min-h-screen transition-[margin] duration-300 ease-in-out ${
          isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        <div className="p-4 lg:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

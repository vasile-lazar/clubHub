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
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

import { useAuth } from '../../hooks';
import { useToggle } from '../../hooks';
import ThemeToggle from '../ThemeToggle';
import { PATHS } from '../../routes/paths';
import type { User } from '../../types';

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface SidebarProps {
  user: User;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

/* ---------------- USER NAV ---------------- */

const userNavItems: NavItem[] = [
  { to: PATHS.app.dashboard, label: 'Dashboard', icon: HomeIcon },
  { to: PATHS.app.profile, label: 'Profile', icon: UserIcon },
  { to: PATHS.app.myClubs, label: 'My Clubs', icon: UserGroupIcon },
  { to: PATHS.app.clubs, label: 'Clubs', icon: UserGroupIcon },
  { to: PATHS.app.events, label: 'Events', icon: CalendarIcon },
];

/* ---------------- ADMIN EXTRA NAV ---------------- */

const adminExtraNavItems: NavItem[] = [
  { to: PATHS.admin.root, label: 'Admin Dashboard', icon: ShieldCheckIcon },
  { to: PATHS.admin.users, label: 'Manage Users', icon: UserGroupIcon },
  { to: PATHS.admin.settings, label: 'Admin Settings', icon: Cog6ToothIcon },
];

/* ---------------- COMPONENT ---------------- */

export const Sidebar: React.FC<SidebarProps> = ({
                                                  user,
                                                  isCollapsed = false,
                                                  onToggleCollapse,
                                                }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileOpen, toggleMobile, setMobileOpen] = useToggle(false);

  const isAdmin = user.role === 'admin';

  const handleLogout = () => {
    logout();
    navigate(PATHS.public.login);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
      `flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition ${
          isActive
              ? 'bg-brand-orange text-white'
              : 'text-text-primary hover:bg-bg-secondary'
      } ${isCollapsed ? 'justify-center' : ''}`;

  return (
      <>
        {/* -------- Mobile Toggle -------- */}
        <button
            onClick={() => toggleMobile()}
            className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-bg-primary border border-border-default shadow-md"
            aria-label="Toggle menu"
        >
          {isMobileOpen ? (
              <XMarkIcon className="h-6 w-6" />
          ) : (
              <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        {/* -------- Sidebar -------- */}
        <aside
            className={`
          fixed inset-y-0 left-0 z-40 h-screen min-h-[100dvh]
          bg-bg-primary border-r border-border-default
          flex flex-col transform transition-[width,transform] duration-300 ease-in-out
          lg:translate-x-0
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
          w-64
        `}
        >
          {/* -------- Header (profile + collapse button inline) -------- */}
          <div
              className={`relative border-b border-border-default flex items-center min-h-[72px] ${
                  isCollapsed ? 'justify-center p-3' : 'gap-3 p-4'
              }`}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-full bg-bg-secondary flex items-center justify-center overflow-hidden flex-shrink-0">
                {user.pfp ? (
                    <img
                        src={user.pfp}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-text-primary font-bold text-lg">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                )}
              </div>

              {!isCollapsed && (
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-text-primary truncate">
                      {user.username}
                    </p>
                    <p className="text-xs text-text-secondary capitalize">
                      {user.role}
                    </p>
                  </div>
              )}
            </div>

            {/* Collapse button: inline when expanded, slightly outside when collapsed */}
            
                <button
                    onClick={onToggleCollapse}
                    className={`
                      hidden lg:flex items-center justify-center flex-shrink-0
                      w-8 h-8 rounded-lg border border-border-default
                      bg-bg-primary text-text-secondary
                      hover:bg-bg-secondary hover:text-text-primary
                      transition-all duration-200
                      ${isCollapsed
                        ? 'absolute -right-3 top-1/2 -translate-y-1/2 shadow-md z-10'
                        : 'ml-1'
                      }
                    `}
                    title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                  {isCollapsed ? (
                      <ChevronRightIcon className="h-4 w-4" />
                  ) : (
                      <ChevronLeftIcon className="h-4 w-4" />
                  )}
                </button>
            
          </div>

          {/* -------- Navigation -------- */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {/* User Pages */}
            {userNavItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                    key={to}
                    to={to}
                    className={navLinkClass}
                    onClick={() => setMobileOpen(false)}
                    title={isCollapsed ? label : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span>{label}</span>}
                </NavLink>
            ))}

            {/* Admin Pages */}
            {isAdmin && (
                <>
                  <div className="my-3 border-t border-border-default" />

                  {!isCollapsed && (
                      <p className="px-3 text-xs font-semibold text-text-secondary uppercase">
                        Admin
                      </p>
                  )}

                  {adminExtraNavItems.map(({ to, label, icon: Icon }) => (
                      <NavLink
                          key={to}
                          to={to}
                          className={navLinkClass}
                          onClick={() => setMobileOpen(false)}
                          title={isCollapsed ? label : undefined}
                          end={to === PATHS.admin.root}
                      >
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        {!isCollapsed && <span>{label}</span>}
                      </NavLink>
                  ))}
                </>
            )}
          </nav>

          {/* -------- Footer -------- */}
          <div
              className={`border-t border-border-default flex flex-col gap-2 ${
                  isCollapsed ? 'items-center p-3' : 'p-4'
              }`}
          >
            <div
                className={`flex items-center gap-2 ${
                    isCollapsed ? 'flex-col' : 'w-full'
                }`}
            >
              <ThemeToggle className="text-text-primary" />

              <button
                  onClick={handleLogout}
                  className={`flex items-center gap-2 rounded-lg text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition font-medium ${
                      isCollapsed ? 'p-2' : 'flex-1 px-3 py-2'
                  }`}
                  title={isCollapsed ? 'Log Out' : undefined}
                  aria-label="Log Out"
              >
                <ArrowLeftEndOnRectangleIcon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span>Log Out</span>}
              </button>
            </div>
          </div>
        </aside>

        {/* -------- Mobile Overlay -------- */}
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
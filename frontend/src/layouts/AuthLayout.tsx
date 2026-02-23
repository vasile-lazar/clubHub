import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { PATHS } from '../routes/paths';

export const AuthLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-bg-primary">
            <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
                <ThemeToggle className="text-text-primary" />
                <Link
                    to={PATHS.public.home}
                    className="px-4 py-2 rounded-lg bg-bg-secondary hover:bg-bg-secondary/80 text-text-primary font-bold border border-border-default"
                >
                    Go back
                </Link>
            </div>
            <Outlet />
        </div>
    );
};
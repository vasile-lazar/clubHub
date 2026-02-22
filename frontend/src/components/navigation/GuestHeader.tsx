import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';
import { PATHS } from '../../routes/paths';

export const GuestHeader: React.FC = () => (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-orange border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <Link
                    to={PATHS.public.home}
                    className="text-2xl font-black tracking-tighter text-white hover:opacity-90"
                >
                    Club<span className="text-white/90">Hub</span>
                </Link>
                <nav className="flex items-center gap-2 sm:gap-4">
                    <ThemeToggle className="text-white" />
                    <Link
                        to={PATHS.public.login}
                        className="text-white/90 hover:text-white font-medium px-3 py-1.5 rounded-lg hover:bg-white/10 transition"
                    >
                        Log In
                    </Link>
                    <Link
                        to={PATHS.public.register}
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl transition"
                    >
                        Sign Up
                    </Link>
                </nav>
            </div>
        </div>
    </header>
);
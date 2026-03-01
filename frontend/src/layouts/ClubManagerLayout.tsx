import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/navigation/Sidebar';
import { useAuth } from '../hooks';

export const ClubManagerLayout: React.FC = () => {
    const { user } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(false);

    if (!user) return null;

    return (
        <div className="flex min-h-screen bg-bg-primary">
            <Sidebar
                user={user}
                isCollapsed={isCollapsed}
                onToggleCollapse={() => setIsCollapsed((v) => !v)}
            />
            <main className={`flex-1 transition-all duration-300 ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
                <div className="p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
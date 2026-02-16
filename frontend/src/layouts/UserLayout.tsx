import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserSidebar } from '../components/navigation/UserSidebar';

export const UserLayout: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-bg-secondary">
      <UserSidebar user={user} />
      <main className="flex-1 overflow-auto min-h-screen lg:ml-64">
        <div className="p-4 lg:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

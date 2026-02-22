import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks';
import { AdminSidebar } from '../components/navigation/AdminSidebar';

export const AdminLayout: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-bg-secondary">
      <AdminSidebar user={user} />
      <main className="flex-1 overflow-auto min-h-screen lg:ml-64">
        <div className="p-4 lg:p-6 border-l-2 border-admin-accentBorder/50">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

import { useAuth } from '../hooks';
import { GuestLayout } from './GuestLayout';
import { UserLayout } from './UserLayout';
import { AdminLayout } from './AdminLayout';

export const SmartLayout: React.FC = () => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) return <GuestLayout />;
    if (user?.role === 'admin') return <AdminLayout />;
    return <UserLayout />;
};
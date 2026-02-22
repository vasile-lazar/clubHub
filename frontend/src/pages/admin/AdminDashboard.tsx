import React, { useEffect, useState } from 'react';
import {
    UserGroupIcon,
    UserPlusIcon,
    ShieldCheckIcon,
    CalendarIcon,
    ChartBarIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/Card';

interface ActivityItem {
    id: string;
    action: string;
    user: string;
    time: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface StatItem {
    label: string;
    value: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface StatCardProps {
    item: StatItem;
}

const StatCard: React.FC<StatCardProps> = ({ item }) => (
    <Card>
        <CardHeader>
            <CardTitle className="text-sm">{item.label}</CardTitle>
            <item.icon className="w-4 h-4 text-brand-orange" />
        </CardHeader>
        <CardContent>
            <div className="text-3xl font-bold text-text-primary">{item.value}</div>
            <p className="text-xs mt-1 text-text-secondary">Platform overview</p>
        </CardContent>
    </Card>
);

interface ActivityRowProps {
    item: ActivityItem;
}

const ActivityRow: React.FC<ActivityRowProps> = ({ item }) => (
    <li className="flex justify-between items-center py-2 border-b border-border-default last:border-0">
        <div className="flex items-center gap-3">
            <item.icon className="h-5 w-5 text-brand-orange flex-shrink-0" />
            <div>
                <p className="font-medium text-text-primary">{item.action}</p>
                <p className="text-sm text-text-secondary">{item.user}</p>
            </div>
        </div>
        <span className="text-xs text-text-muted">{item.time}</span>
    </li>
);

const mockActivity: ActivityItem[] = [
    { id: '1', action: 'User created', user: 'alice', time: '2 min ago', icon: UserPlusIcon },
    { id: '2', action: 'User suspended', user: 'bob', time: '15 min ago', icon: ShieldCheckIcon },
    { id: '3', action: 'Role updated', user: 'jane', time: '1 hour ago', icon: ShieldCheckIcon },
    { id: '4', action: 'User registered', user: 'charlie', time: '2 hours ago', icon: UserPlusIcon },
];

const stats: StatItem[] = [
    { label: 'Total Users', value: '1,234', icon: UserGroupIcon },
    { label: 'Active Users', value: '1,089', icon: UserPlusIcon },
    { label: 'Admins', value: '12', icon: ShieldCheckIcon },
    { label: 'Recent (7d)', value: '47', icon: CalendarIcon },
];

const quickStats = [
    { label: 'New registrations today', value: '8' },
    { label: 'Pending approvals', value: '3' },
    { label: 'Suspended accounts', value: '1' },
];

export const AdminDashboard: React.FC = () => {
    const [activity, setActivity] = useState<ActivityItem[]>([]);

    useEffect(() => {
        setActivity(mockActivity);
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Admin Dashboard</h1>
                <p className="text-text-secondary mt-1">Overview of platform activity</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <StatCard key={stat.label} item={stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <ClockIcon className="h-5 w-5 text-text-muted" />
                    </CardHeader>
                    <CardContent>
                        {activity.length === 0 ? (
                            <p className="text-text-secondary py-8 text-center">No recent activity</p>
                        ) : (
                            <ul className="space-y-2">
                                {activity.map((item) => (
                                    <ActivityRow key={item.id} item={item} />
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Stats</CardTitle>
                        <ChartBarIcon className="h-5 w-5 text-text-muted" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {quickStats.map((stat) => (
                                <div key={stat.label} className="flex justify-between">
                                    <span className="text-text-secondary">{stat.label}</span>
                                    <span className="font-semibold text-text-primary">{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
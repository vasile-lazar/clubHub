import React, { useState } from 'react';
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
}

const mockActivity: ActivityItem[] = [
  { id: '1', action: 'User created', user: 'alice', time: '2 min ago' },
  { id: '2', action: 'User suspended', user: 'bob', time: '15 min ago' },
  { id: '3', action: 'Role updated', user: 'jane', time: '1 hour ago' },
  { id: '4', action: 'User registered', user: 'charlie', time: '2 hours ago' },
];

const stats = [
  { label: 'Total Users', value: '1,234', icon: UserGroupIcon },
  { label: 'Active Users', value: '1,089', icon: UserPlusIcon },
  { label: 'Admins', value: '12', icon: ShieldCheckIcon },
  { label: 'Recent (7d)', value: '47', icon: CalendarIcon },
];

export const AdminDashboard: React.FC = () => {
  const [activity] = useState<ActivityItem[]>(mockActivity);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Admin Dashboard</h1>
      <p className="text-text-secondary">Overview of platform activity</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-l-4 border-l-admin-accent">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-3 rounded-lg bg-admin-accentLight/50 text-admin-accent">
                <stat.icon className="h-8 w-8" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                <p className="text-sm text-text-secondary">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
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
              <ul className="space-y-4">
                {activity.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center py-2 border-b border-border-default last:border-0"
                  >
                    <div>
                      <p className="font-medium text-text-primary">{item.action}</p>
                      <p className="text-sm text-text-secondary">{item.user}</p>
                    </div>
                    <span className="text-xs text-text-muted">{item.time}</span>
                  </li>
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
              <div className="flex justify-between">
                <span className="text-text-secondary">New registrations today</span>
                <span className="font-semibold text-text-primary">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Pending approvals</span>
                <span className="font-semibold text-text-primary">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Suspended accounts</span>
                <span className="font-semibold text-text-primary">1</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

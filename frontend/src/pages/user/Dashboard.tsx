import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/Button';
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    Badge,
} from '../../components/ui/Card';
import {
    UserGroupIcon,
    CalendarIcon,
    BellIcon,
    ChatBubbleLeftIcon,
    TrophyIcon,
    BoltIcon,
} from '@heroicons/react/24/outline';
import { PATHS } from '../../routes/paths';
import type { Club, Event, Announcement } from '../../types';

interface StatCardProps {
    title: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    value: number;
    subtitle: string;
    colors: {
        bg: string;
        border: string;
        icon: string;
        text: string;
        sub: string;
    };
}

const StatCard: React.FC<StatCardProps> = ({ title, icon: Icon, value, subtitle, colors }) => (
    <Card className={`bg-gradient-to-br ${colors.bg} border ${colors.border}`}>
        <CardHeader>
            <CardTitle className="text-sm">{title}</CardTitle>
            <Icon className={`w-4 h-4 ${colors.icon}`} />
        </CardHeader>
        <CardContent>
            <div className={`text-3xl font-bold ${colors.text}`}>{value}</div>
            <p className={`text-xs mt-1 ${colors.sub}`}>{subtitle}</p>
        </CardContent>
    </Card>
);

const mockClubs: Club[] = [
    { id: 1, name: 'Computer Science Society', description: '', members: 120 },
    { id: 2, name: 'Art & Design Collective', description: '', members: 80 },
    { id: 3, name: 'Environmental Action Team', description: '', members: 60 },
];

const mockEvents: Event[] = [
    { id: 1, title: 'Hackathon', date: '2026-02-20', description: '' },
    { id: 2, title: 'Art Exhibition', date: '2026-02-22', description: '' },
];

const mockAnnouncements: Announcement[] = [
    { id: '1', title: 'New Club Policy', clubName: 'Computer Science Society', date: '2026-02-12', isPinned: true },
    { id: '2', title: 'Event Schedule Updated', clubName: 'Art & Design Collective', date: '2026-02-10', isPinned: false },
];

const activityFeed = [
    { id: 1, club: 'Computer Science Society', action: 'Posted a new event', time: '2 hours ago', icon: CalendarIcon },
    { id: 2, club: 'Environmental Action Team', action: '5 new members joined', time: '5 hours ago', icon: UserGroupIcon },
    { id: 3, club: 'Art & Design Collective', action: 'New announcement posted', time: '1 day ago', icon: ChatBubbleLeftIcon },
];

const tips = [
    { id: 1, icon: BoltIcon, text: 'Join a club to unlock networking opportunities' },
    { id: 2, icon: CalendarIcon, text: 'RSVP to events early to secure your spot' },
    { id: 3, icon: UserGroupIcon, text: 'Connect with club leaders for mentorship' },
];

export const Dashboard: React.FC = () => {
    const [joinedClubs, setJoinedClubs] = useState<Club[]>([]);
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [recentAnnouncements, setRecentAnnouncements] = useState<Announcement[]>([]);

    useEffect(() => {
        setJoinedClubs(mockClubs);
        setUpcomingEvents(mockEvents);
        setRecentAnnouncements(mockAnnouncements);
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Welcome Back!</h1>
                    <p className="text-text-secondary mt-1">Here&apos;s what&apos;s happening with your clubs</p>
                </div>
                <Button variant="primary" size="sm" type="internal" to={PATHS.app.clubs}>
                    Discover Clubs
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="My Clubs"
                    icon={UserGroupIcon}
                    value={joinedClubs.length}
                    subtitle="Active memberships"
                    colors={{
                        bg: 'from-stat-blue/10 to-stat-blue/5',
                        border: 'border-stat-blue/30',
                        icon: 'text-stat-blue',
                        text: 'text-stat-blue',
                        sub: 'text-stat-blue/80',
                    }}
                />
                <StatCard
                    title="Upcoming Events"
                    icon={CalendarIcon}
                    value={upcomingEvents.length}
                    subtitle="This week"
                    colors={{
                        bg: 'from-stat-green/10 to-stat-green/5',
                        border: 'border-stat-green/30',
                        icon: 'text-stat-green',
                        text: 'text-stat-green',
                        sub: 'text-stat-green/80',
                    }}
                />
                <StatCard
                    title="Events Attended"
                    icon={TrophyIcon}
                    value={5}
                    subtitle="Total participation"
                    colors={{
                        bg: 'from-brand-orange/10 to-brand-orange/5',
                        border: 'border-brand-orange/30',
                        icon: 'text-brand-orange',
                        text: 'text-brand-orange',
                        sub: 'text-brand-orange/80',
                    }}
                />
                <StatCard
                    title="Notifications"
                    icon={BellIcon}
                    value={recentAnnouncements.filter((a) => !a.isPinned).length}
                    subtitle="Unread updates"
                    colors={{
                        bg: 'from-stat-amber/10 to-stat-amber/5',
                        border: 'border-stat-amber/30',
                        icon: 'text-stat-amber',
                        text: 'text-stat-amber',
                        sub: 'text-stat-amber/80',
                    }}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Events</CardTitle>
                            <Button variant="ghost" size="sm" type="internal" to={PATHS.app.events}>
                                View all
                            </Button>
                        </CardHeader>
                        <CardContent>
                            {upcomingEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="flex justify-between items-center py-2 border-b border-border-default last:border-0"
                                >
                                    <div>
                                        <p className="font-medium text-text-primary">{event.title}</p>
                                        <p className="text-sm text-text-secondary">{event.date}</p>
                                    </div>
                                    <Badge variant="outline">upcoming</Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {activityFeed.map((act) => (
                                <div key={act.id} className="flex items-center gap-3 py-2">
                                    <act.icon className="h-5 w-5 text-brand-orange flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-text-primary">
                                            <span className="font-medium">{act.club}</span> {act.action}
                                        </p>
                                        <p className="text-xs text-text-secondary">{act.time}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>My Clubs</CardTitle>
                            <Button variant="ghost" size="sm" type="internal" to={PATHS.app.clubs}>
                                View all
                            </Button>
                        </CardHeader>
                        <CardContent>
                            {joinedClubs.map((club) => (
                                <div key={club.id} className="py-2 border-b border-border-default last:border-0">
                                    <p className="font-medium text-text-primary">{club.name}</p>
                                    <p className="text-sm text-text-secondary">{club.members} members</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Announcements</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentAnnouncements.map((a) => (
                                <div key={a.id} className="py-2 border-b border-border-default last:border-0">
                                    <p className="font-medium text-text-primary">{a.title}</p>
                                    <p className="text-xs text-text-secondary">{a.clubName} · {a.date}</p>
                                    {a.isPinned && <Badge>Pinned</Badge>}
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Tips &amp; Resources</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {tips.map((tip) => (
                                <div key={tip.id} className="flex items-start gap-2 py-2">
                                    <tip.icon className="h-5 w-5 text-brand-orange mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-text-secondary">{tip.text}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/Button';
import {EventsList} from "../../components/EventsList.tsx";
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
  TrophyIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';
import { PATHS } from '../../routes/paths';
import type { Club, Event, Announcement } from '../../types';
import {AnnouncementsList} from "../../components/AnnouncementsList.tsx";

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
    {
        id: 1,
        title: `Weekly Meeting`,
        description: 'Regular weekly gathering for all members.',
        date: '2026-03-04',
        time: '5:00 PM',
        location: 'Room 204, Main Building',
        attendees: 24,
        status: 'upcoming',
    },
    {
        id: 2,
        title: 'Spring Semester Kickoff',
        description: 'Kick off the new semester with activities and introductions.',
        date: '2026-03-08',
        time: '2:00 PM',
        location: 'Student Union Hall',
        attendees: 60,
        status: 'upcoming',
    },
    {
        id: 3,
        title: 'End-of-Month Social',
        description: 'Casual social event for members to connect.',
        date: '2026-03-28',
        time: '6:00 PM',
        location: 'Campus Courtyard',
        attendees: 35,
        status: 'upcoming',
    },
];

const mockAnnouncements: Announcement[] = [
    {
        clubId : 1,
        id: 1, title: 'New Club Policy', clubName: 'Computer Science Society', date: '2026-02-12', isPinned: true,
        content: "",
        author: "",
        priority: "high"
    },
    {
        clubId  : 2,
        id: 2,
        title: 'Event Schedule Updated',
        clubName: 'Art & Design Collective',
        date: '2026-02-10',
        isPinned: false,
        content: "",
        author: "",
        priority: "high"
    }
];



const tips = [
  { icon: BoltIcon, text: 'Join a club to unlock networking opportunities' },
  { icon: CalendarIcon, text: 'RSVP to events early to secure your spot' },
  { icon: UserGroupIcon, text: 'Connect with club leaders for mentorship' },
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
            sub: 'text-text-primary',
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
            sub: 'text-text-primary',
          }}
        />
        <StatCard
          title="Events Attended"
          icon={TrophyIcon}
          value={5}
          subtitle="Total participation"
          colors={{
            bg: 'from-admin-accent/10 to-admin-accent/5',
            border: 'border-admin-accent/30',
            icon: 'text-admin-accent',
            text: 'text-admin-accent',
            sub: 'text-text-primary',
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
            sub: 'text-text-primary',
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
      <div className="lg:col-span-2 space-y-6">
        <EventsList events={mockEvents} showViewAll={true} />
        <AnnouncementsList announcements={mockAnnouncements}/>
      </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Clubs</CardTitle>
              <Button variant="ghost" size="sm" type="internal" to={PATHS.app.myClubs}>
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
              {tips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2 py-2">
                  <tip.icon className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
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

import { useEffect, useState } from "react";
import {Button} from "../components/Button.tsx";

import {
    UserGroupIcon,
    CalendarIcon,
    BellIcon,
    ChatBubbleLeftIcon,
    StarIcon,
    BoltIcon,
    TrophyIcon,
} from "@heroicons/react/24/outline";

// ------------------ Mock Components ------------------


const Card = ({ children, className }: any) => (
    <div
        className={`p-4 rounded-lg shadow-md bg-bg-primary  ${className || ""}`}
    >
        {children}
    </div>
);
const CardHeader = ({ children, className }: any) => (
    <div className={`mb-2 flex justify-between items-center ${className || ""}`}>
        {children}
    </div>
);
const CardContent = ({ children, className }: any) => <div className={className || ""}>{children}</div>;
const CardTitle = ({ children, className }: any) => (
    <h3 className={`text-text-primary font-semibold ${className || ""}`}>{children}</h3>
);
const Badge = ({ children, variant, className }: any) => (
    <span
        className={`px-2 py-0.5 text-xs text-text-secondary rounded ${
            variant === "outline" ? "border" : "bg-gray-200"
        } ${className || ""}`}
    >
    {children}
  </span>
);

// ------------------ Types ------------------
type Club = { id: string; name: string; members: number; image: string };
type Event = { id: string; title: string; date: string; time: string; location: string; attendees: number; status: string };
type Announcement = { id: string; title: string; clubName: string; date: string; isPinned: boolean };

// ------------------ StatCard ------------------
const StatCard = ({ title, icon: Icon, value, subtitle, colors }: any) => (
    <Card className={`bg-gradient-to-br ${colors.bg} border ${colors.border}`}>
        <CardHeader>
            <CardTitle className="text-sm">{title}</CardTitle>
            <Icon className={`w-4 h-4 ${colors.icon}`} />
        </CardHeader>
        <CardContent>
            <div className={`text-3xl ${colors.text}`}>{value}</div>
            <p className={`text-xs mt-1 ${colors.sub}`}>{subtitle}</p>
        </CardContent>
    </Card>
);

// ------------------ Main Component ------------------
export default function HomeLoggedView() {
    // ------------------ Mock Data ------------------
    const mockClubs: Club[] = [
        { id: "1", name: "Computer Science Society", members: 120, image: "https://via.placeholder.com/40" },
        { id: "2", name: "Art & Design Collective", members: 80, image: "https://via.placeholder.com/40" },
        { id: "3", name: "Environmental Action Team", members: 60, image: "https://via.placeholder.com/40" },
    ];

    const mockEvents: Event[] = [
        { id: "1", title: "Hackathon", date: "2026-02-20", time: "10:00 AM", location: "Room 101", attendees: 25, status: "upcoming" },
        { id: "2", title: "Art Exhibition", date: "2026-02-22", time: "2:00 PM", location: "Art Hall", attendees: 40, status: "upcoming" },
    ];

    const mockAnnouncements: Announcement[] = [
        { id: "1", title: "New Club Policy", clubName: "Computer Science Society", date: "2026-02-12", isPinned: true },
        { id: "2", title: "Event Schedule Updated", clubName: "Art & Design Collective", date: "2026-02-10", isPinned: false },
    ];

    const activityFeed = [
        { club: "Computer Science Society", action: "Posted a new event", time: "2 hours ago", icon: CalendarIcon },
        { club: "Environmental Action Team", action: "5 new members joined", time: "5 hours ago", icon: UserGroupIcon },
        { club: "Art & Design Collective", action: "New announcement posted", time: "1 day ago", icon: ChatBubbleLeftIcon },
    ];

    const achievements = [
        { icon: UserGroupIcon, label: "Club Leader", count: 2 },
        { icon: CalendarIcon, label: "Events Hosted", count: 12 },
        { icon: TrophyIcon, label: "Recognitions", count: 5 },
        { icon: StarIcon, label: "Top Contributor", count: 3 },
    ];

    const goals = [
        { goal: "Attend 10 events", progress: 7, total: 10, color: "blue" },
        { goal: "Join 5 clubs", progress: 3, total: 5, color: "green" },
        { goal: "Network with 20 members", progress: 15, total: 20, color: "purple" },
    ];

    const tips = [
        { icon: BoltIcon, text: "Join a club to unlock networking opportunities" },
        { icon: CalendarIcon, text: "RSVP to events early to secure your spot" },
        { icon: UserGroupIcon, text: "Connect with club leaders for mentorship" },
    ];

    // ------------------ State ------------------
    const [joinedClubs, setJoinedClubs] = useState<Club[]>([]);
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [recentAnnouncements, setRecentAnnouncements] = useState<Announcement[]>([]);
    const [stats, setStats] = useState({ clubsJoined: 0, upcomingEvents: 0, eventsAttended: 0, unreadNotifications: 0 });

    useEffect(() => {
        setJoinedClubs(mockClubs);
        setUpcomingEvents(mockEvents);
        setRecentAnnouncements(mockAnnouncements);
        setStats({
            clubsJoined: mockClubs.length,
            upcomingEvents: mockEvents.length,
            eventsAttended: 5,
            unreadNotifications: mockAnnouncements.filter(a => !a.isPinned).length,
        });
    }, []);

    // ------------------ Render ------------------
    return (
        <div className="space-y-6 p-6 bg-bg-secondary">

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl text-text-primary mb-2">Welcome Back!</h1>
                    <p className="text-text-secondary">Here's what's happening with your clubs and events</p>
                </div>
                <Button variant= "primary" size ="sm" type="internal" to="/clubs" >
                    Discover Clubs
                </Button>
                
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard title="My Clubs" icon={UserGroupIcon} value={stats.clubsJoined} subtitle="Active memberships" colors={{ bg:"from-blue-50 to-blue-100", border:"border-blue-200", icon:"text-blue-600", text:"text-blue-700", sub:"text-blue-600" }} />
                <StatCard title="Upcoming Events" icon={CalendarIcon} value={stats.upcomingEvents} subtitle="This week" colors={{ bg:"from-green-50 to-green-100", border:"border-green-200", icon:"text-green-600", text:"text-green-700", sub:"text-green-600" }} />
                <StatCard title="Events Attended" icon={TrophyIcon} value={stats.eventsAttended} subtitle="Total participation" colors={{ bg:"from-purple-50 to-purple-100", border:"border-purple-200", icon:"text-purple-600", text:"text-purple-700", sub:"text-purple-600" }} />
                <StatCard title="Notifications" icon={BellIcon} value={stats.unreadNotifications} subtitle="Unread updates" colors={{ bg:"from-orange-50 to-orange-100", border:"border-orange-200", icon:"text-orange-600", text:"text-orange-700", sub:"text-orange-600" }} />
            </div>

            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                   
            {/* Upcoming Events */}
            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <Button className = "border-none" variant= "ghost" size ="sm" type="internal" to="/events" >
                        View all
                    </Button>
                </CardHeader>
                <CardContent>
                    {upcomingEvents.map(event => (
                        <div key={event.id} className="flex justify-between items-center mb-2 p-2 border rounded">
                            <div>
                                <p className="text-text-primary font-medium">{event.title}</p>
                                <p className="text-sm text-text-secondary">{event.date} • {event.time}</p>
                            </div>
                            <Badge variant="outline">{event.status}</Badge>
                        </div>
                    ))}
                </CardContent>
            </Card>
                    
            {/* Activity Feed */}
            <Card>
                <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
                <CardContent>
                    {activityFeed.map((act, idx) => (
                        <div key={idx} className="flex items-center gap-3 mb-2">
                            <act.icon className="w-5 h-5 text-blue-600" />
                            <div>
                                <p className="text-sm text-text-primary"><span className="font-medium">{act.club}</span> {act.action}</p>
                                <p className="text-xs text-text-secondary">{act.time}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
                <CardHeader><CardTitle>Achievements</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    {achievements.map((ach, idx) => (
                        <div key={idx} className="flex flex-col items-center p-2 bg-bg-secondary rounded">
                            <ach.icon className="w-8 h-8 text-yellow-500 mb-1" />
                            <p className="text-xl text-text-primary font-bold">{ach.count}</p>
                            <p className="text-xs text-text-secondary">{ach.label}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Goals */}
            <Card>
                <CardHeader><CardTitle>Goals</CardTitle></CardHeader>
                <CardContent>
                    {goals.map((g, idx) => (
                        <div key={idx} className="mb-2">
                            <div className="flex justify-between mb-1">
                                <span className="text-sm text-text-primary">{g.goal}</span>
                                <span className="text-xs text-text-secondary">{g.progress}/{g.total}</span>
                            </div>
                            <div className="w-full bg-gray-200 h-2 rounded">
                                <div className={`h-2 rounded bg-brand-orange`} style={{ width: `${(g.progress / g.total) * 100}%` }} />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
                </div>
            <div className="space-y-6">
                {/* My Clubs */}
                <Card>
                    <CardHeader>
                        <CardTitle>My Clubs</CardTitle>
                        <Button className = "border-none" variant= "ghost" size ="sm" type="internal" to="/clubs" >
                            View all
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {joinedClubs.map(club => (
                            <div key={club.id} className="flex items-center gap-3 mb-2">

                                <div>
                                    <p className="text-text-primary font-medium">{club.name}</p>
                                    <p className="text-sm text-text-secondary">{club.members} members</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                {/* Announcements */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Announcements</CardTitle>
                        <Button className = "border-none" variant= "ghost" size ="sm" type="internal" to="/events" >
                            View all
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {recentAnnouncements.map(a => (
                            <div key={a.id} className="mb-2 p-2 border-b last:border-0">
                                <p className=" text-text-primary font-medium">{a.title}</p>
                                <p className="text-xs text-text-secondary">{a.clubName} • {a.date}</p>
                                {a.isPinned && <Badge>Pinned</Badge>}
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Tips */}
            <Card>
                <CardHeader><CardTitle>Tips & Resources</CardTitle></CardHeader>
                <CardContent>
                    {tips.map((tip, idx) => (
                        <div key={idx} className="flex items-start gap-2 mb-2">
                            <tip.icon className="w-5 h-5 text-indigo-600 mt-1" />
                            <p className="text-sm text-text-secondary">{tip.text}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
            </div>
        </div>
        </div>
    );
}

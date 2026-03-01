import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import {
    UserGroupIcon,
    CalendarIcon,
    MapPinIcon,
    EnvelopeIcon,
    FireIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';
import { EventsList } from '../../components/EventsList';
import {AnnouncementsList} from "../../components/AnnouncementsList";

import clubsDataJson  from '../../_mock/ClubInfo.json';

import eventsJson from '../../_mock/ClubEvents.json';
import announcementsJson from '../../_mock/ClubAnnouncements.json';

import type {Club,Announcement, Event} from '../../types';

const clubsData: Club[] = clubsDataJson;



// ── Inline UI components ──────────────────────────────────────────────────

const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({
                                                                                children,
                                                                                className = '',
                                                                            }) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${className}`}>
        {children}
    </span>
);

const Separator: React.FC<{ className?: string }> = ({ className = '' }) => (
    <hr className={`border-t border-border-default ${className}`} />
);



// ── Main component ────────────────────────────────────────────────────────

export const ClubPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [club, setClub]                   = useState<Club | null>(null);


    const [events, setEvents] = useState<Event[]>([]);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading]             = useState(true);
    const [isJoined, setIsJoined]           = useState(false);

    useEffect(() => {
        if (id) loadClubData(id);
    }, [id]);

    const loadClubData = (clubId: string) => {
        setLoading(true);

        const found = clubsData.find((c) => String(c.id) === clubId);
        setClub(found ?? null);

        if (found) {
            const clubEvents = eventsJson
                .filter((e) => String(e.clubId) === clubId )
                .slice(0, 5);

            const clubAnnouncements = announcementsJson
                .filter((a) => String(a.clubId) === clubId)
                .slice(0, 5);

            setEvents(clubEvents);
            setAnnouncements(clubAnnouncements);
        }

        setLoading(false);
    };

    const handleJoinToggle = () => {
        setIsJoined((prev) => !prev);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <p className="text-text-secondary">Loading club details...</p>
            </div>
        );
    }

    if (!club) {
        return (
            <div className="text-center py-12">
                <p className="text-text-secondary mb-4">Club not found</p>
                <Button variant="primary" onClick={() => navigate('/clubs')}>
                    Back to Clubs
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            
            {/* Hero Header */}
            <div className="relative h-80 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/40 via-bg-secondary to-bg-secondary" />
                <img
                    src={club.imageUrl}
                    alt="Cover"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                    <div className="p-6 w-full">
                        <div className="flex items-start justify-between flex-wrap gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                    <h1 className="text-4xl font-bold text-white">{club.name}</h1>
                                    <Badge className="bg-brand-orange text-white border-0 text-sm">
                                        club category need to add
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-white/80 text-sm flex-wrap">
                                    <div className="flex items-center gap-1">
                                        <UserGroupIcon className="w-4 h-4" />
                                        <span>{club.members} members</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <CalendarIcon className="w-4 h-4" />
                                        <span>Every Tuesday, 5 PM</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FireIcon className="w-4 h-4 text-brand-orange" />
                                        <span className="text-brand-orange">
                                            {club.members >= 100 ? 'Very Active' : club.members >= 50 ? 'Active' : 'Growing'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant={isJoined ? 'secondary' : 'primary'}
                                    onClick={handleJoinToggle}
                                >
                                    {isJoined ? 'Leave Club' : 'Join Club'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="about" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="events">Events</TabsTrigger>
                    <TabsTrigger value="announcements">Announcements</TabsTrigger>
                    <TabsTrigger value="members">Members</TabsTrigger>
                </TabsList>

                {/* About */}
                <TabsContent value="about" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>About This Club</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p className="text-text-secondary leading-relaxed">
                                {club.description}
                            </p>
                            <Separator />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-text-primary mb-3">
                                        Meeting Information
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <CalendarIcon className="w-5 h-5 text-text-secondary mt-0.5 shrink-0" />
                                            <div>
                                                <p className="text-sm font-medium text-text-primary">Schedule</p>
                                                <p className="text-sm text-text-secondary">Every Tuesday, 5:00 PM</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <MapPinIcon className="w-5 h-5 text-text-secondary mt-0.5 shrink-0" />
                                            <div>
                                                <p className="text-sm font-medium text-text-primary">Location</p>
                                                <p className="text-sm text-text-secondary">Room 204, Main Building</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-text-primary mb-3">
                                        Contact Information
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <EnvelopeIcon className="w-5 h-5 text-text-secondary mt-0.5 shrink-0" />
                                            <div>
                                                <p className="text-sm font-medium text-text-primary">Email</p>
                                                <p className="text-sm text-text-secondary">
                                                    {club.name.toLowerCase().replace(/\s+/g, '.')}@campus.edu
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <UserGroupIcon className="w-5 h-5 text-text-secondary mt-0.5 shrink-0" />
                                            <div>
                                                <p className="text-sm font-medium text-text-primary">Category</p>
                                                <p className="text-sm text-text-secondary">{club.category}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Events */}
                <TabsContent value="events" className="space-y-4">
                    <EventsList events={events} showViewAll={false} />
                </TabsContent>

                {/* Announcements */}
                <TabsContent value="announcements" className="space-y-4">
                    <AnnouncementsList announcements={announcements}/>
                </TabsContent>

                {/* Members */}
                <TabsContent value="members">
                    <Card>
                        <CardHeader>
                            <CardTitle>Club Members</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8">
                                <UserGroupIcon className="w-12 h-12 text-text-secondary mx-auto mb-3" />
                                <p className="text-text-secondary mb-4">
                                    {club.members} members in this club
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};
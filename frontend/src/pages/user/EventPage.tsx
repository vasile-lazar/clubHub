import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    CalendarIcon,
    MapPinIcon,
    ClockIcon,
    UserGroupIcon,
    ShareIcon,
    ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/Card';

import eventsJson from '../../_mock/ClubEvents.json';
import type { Event } from '../../types';

const Separator: React.FC<{ className?: string }> = ({ className = '' }) => (
    <hr className={`border-t border-border-default ${className}`} />
);

export const EventPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [joined, setJoined] = useState(false);

    useEffect(() => {
        if (id) loadEventData(id);
    }, [id]);

    const loadEventData = (eventId: string) => {
        setLoading(true);
        const found = (eventsJson as Event[]).find((e) => String(e.id) === eventId);
        setEvent(found ?? null);
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <p className="text-text-secondary">Loading event details...</p>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="text-center py-12">
                <p className="text-text-secondary mb-4">Event not found</p>
                <Button variant="primary" onClick={() => navigate('/events')}>
                    Back to Events
                </Button>
            </div>
        );
    }

    const eventDate = new Date(event.date);
    const fullDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const attendeeCount = event.attendees ?? 0;

    return (
        <div className="space-y-6 p-4 lg:p-9">
            
            {/* Hero Header */}
            <div className="relative h-72 rounded-xl overflow-hidden">
                <img
                    src={event.imageUrl}
                    alt="Cover"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-end">
                    <div className="p-6 w-full">
                        <div className="flex items-start justify-between flex-wrap gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">{event.title}</h1>
                            </div>
                            <Button
                                variant={joined ? 'secondary' : 'primary'}
                                className="flex-2"
                                onClick={() => setJoined((prev) => !prev)}
                            >
                                {joined ? 'Leave Event' : 'Join Event'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Card */}
            <Card>
                <CardHeader>
                    <CardTitle>About This Event</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-text-secondary leading-relaxed">
                        {event.description}
                    </p>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <CalendarIcon className="w-5 h-5 text-text-secondary mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-text-primary">Date</p>
                                    <p className="text-sm text-text-secondary">{fullDate}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <ClockIcon className="w-5 h-5 text-text-secondary mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-text-primary">Time</p>
                                    <p className="text-sm text-text-secondary">{event.time ?? 'TBD'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPinIcon className="w-5 h-5 text-text-secondary mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-text-primary">Location</p>
                                    <p className="text-sm text-text-secondary">{event.location ?? 'TBD'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <UserGroupIcon className="w-5 h-5 text-text-secondary mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-text-primary">Attendees</p>
                                    <p className="text-sm text-text-secondary">
                                        {attendeeCount} people attending
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border-default text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors text-sm">
                            <ShareIcon className="w-4 h-4" />
                            Share
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border-default text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors text-sm">
                            <ArrowDownTrayIcon className="w-4 h-4" />
                            Add to Calendar
                        </button>
                    </div>
                </CardContent>
            </Card>

            {/* Attendees Card */}
            {attendeeCount > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Attendees ({attendeeCount})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-3">
                            {Array.from({ length: Math.min(attendeeCount, 12) }).map((_, i) => (
                                <div
                                    key={i}
                                    className="w-10 h-10 rounded-full bg-brand-orange/20 border-2 border-brand-orange/40 flex items-center justify-center text-sm font-semibold text-brand-orange overflow-hidden"
                                >
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=attendee-${i}`}
                                        alt="attendee"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                            {attendeeCount > 12 && (
                                <div className="w-10 h-10 rounded-full bg-bg-secondary border-2 border-border-default flex items-center justify-center text-xs text-text-secondary font-medium">
                                    +{attendeeCount - 12}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
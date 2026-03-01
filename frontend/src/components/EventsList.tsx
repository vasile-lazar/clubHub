import React from 'react';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { Button } from './ui/Button';
import { Card, CardHeader, CardContent, CardTitle } from './ui/Card';
import { EventItem } from './ui/EventItem';
import type {Event} from '../types'


interface EventsListProps {
    events: Event[];
    showViewAll?: boolean;
}

export const EventsList: React.FC<EventsListProps> = ({ events, showViewAll }) => (
    <Card>
            <CardHeader>
                <div className="flex items-center justify-between w-full">
                    <CardTitle className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-brand-orange" />
                        Upcoming Events
                    </CardTitle>
                    {showViewAll && (
                        <Button type="internal" to="/events" variant="ghost" size="sm">
                            View All Events
                        </Button>
                    )}
                </div>
            </CardHeader>
        <CardContent>
            {events.length > 0 ? (
                <div className="space-y-4">
                    {events.map((event) => (
                        <EventItem key={event.id} event={event} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <CalendarIcon className="w-10 h-10 text-text-secondary mx-auto mb-3" />
                    <p className="text-text-secondary">No upcoming events</p>
                </div>
            )}
        </CardContent>
    </Card>
);
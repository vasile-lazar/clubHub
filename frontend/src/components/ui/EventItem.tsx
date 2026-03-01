import React from 'react';
import { Button } from '../ui/Button';
import type { Event } from '../../types';

interface EventItemProps {
    event: Event;
}

export const EventItem: React.FC<EventItemProps> = ({ event }) => (
    <div className="flex items-start gap-4 p-4 rounded-lg  hover:bg-bg-secondary border border-border-default transition-colors cursor-pointer group">
        <div className="w-16 h-16 rounded-lg border-2 border-border-default flex flex-col items-center justify-center shrink-0">
            <p className="text-xs text-text-primary">
                {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
            </p>
            <p className="text-xl font-bold text-text-primary">
                {new Date(event.date).getDate()}
            </p>
        </div>
        <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-text-primary mb-1 group-hover:text-brand-orange transition">
                {event.title}
            </h4>
            <p className="text-sm text-text-secondary mb-2">{event.description}</p>
            <div className="flex items-center gap-3 text-xs text-text-secondary flex-wrap">
                <span>{event.time ?? 'TBD'}</span>
                <span>·</span>
                <span>{event.location ?? 'TBD'}</span>
                <span>·</span>
                <span>{event.attendees ?? 0} attending</span>
            </div>
        </div>
        <Button variant="primary">RSVP</Button>
    </div>
);
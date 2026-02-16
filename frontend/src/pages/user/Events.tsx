import React from 'react';
import rawEvents from '../../_mock/EventsAnnouncements.json';
import type { Event } from '../../types';

const eventsData = rawEvents as Event[];

export const Events: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Events</h1>
    <div className="py-8 overflow-x-auto">
      <div className="flex gap-6 pb-4">
        {eventsData.map((event) => (
          <div
            key={event.id}
            className="flex-shrink-0 w-80 max-w-[90vw] rounded-2xl shadow-lg overflow-hidden bg-bg-primary border border-border-default hover:shadow-xl transition"
          >
            {event.imageUrl && (
              <div
                className="h-48 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${event.imageUrl})` }}
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-bold text-text-primary mb-2">{event.title}</h2>
              {event.description && (
                <p className="text-sm text-text-secondary line-clamp-2 mb-2">{event.description}</p>
              )}
              <span className="text-xs text-text-muted">{event.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

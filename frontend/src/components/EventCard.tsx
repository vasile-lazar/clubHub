// EventCard.tsx
import React from "react";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { Card, CardContent } from "./Card";
import type {Event} from "../types/Event.ts";

interface EventCardProps {
    event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    return (
        <Card className={`overflow-hidden relative border-2 ${event.color}`}>
            {/* Top Image */}
            <div className="group relative h-48 w-full overflow-hidden border-b-2 border-border-default">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-white/80"
                >
                    {event.category}
                </span>
            </div>

            {/* Body: Title + Info */}
            
            <CardContent className="p-5">
                <h3 className="text-lg font-bold text-text-primary mb-3 line-clamp-1">{event.title}</h3>

                <div className="space-y-2">
                    <div className="flex items-center text-text-secondary text-sm">
                        <CalendarIcon className="w-4 h-4 mr-2 text-text-secondary" />
                        {event.date}
                    </div>
                    <div className="flex items-center text-text-secondary text-sm">
                        <MapPinIcon className="w-4 h-4 mr-2 text-text-secondary" />
                        {event.location}
                    </div>
                </div>

                {/* Footer: Attendees */}
                <div className="mt-5 pt-4 border-t border-border-default flex justify-between items-center">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="w-6 h-6 rounded-full bg-bg-primary flex items-center justify-center text-[8px] overflow-hidden"
                            >
                                <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${event.id}-${i}`}
                                    alt="attendee"
                                />
                            </div>
                        ))}
                        <div className="w-6 h-6 rounded-full bg-bg-primary flex items-center justify-center text-[9px] font-bold text-text-secondary">
                            +50
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default EventCard;

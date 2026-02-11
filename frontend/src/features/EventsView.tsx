import React, { useState } from "react";
import { Link } from "react-router-dom";

// Import announcements JSON
import clubsAnnouncements from "../_mock/ClubAnnouncements.json";
import eventsAnnouncements from "../_mock/EventsAnnouncements.json";
import systemAnnouncements from "../_mock/SystemAnnouncements.json";

export type Announcement = {
    id: number;
    title: string;
    description: string;
    date: string;
    imageUrl?: string; // optional, useful for events
};

const AnnouncementsPage: React.FC = () => {
    // Track which announcement is expanded
    const [expandedIds, setExpandedIds] = useState<{ [key: string]: boolean }>({});

    const toggleExpand = (section: string, id: number) => {
        setExpandedIds((prev) => ({
            ...prev,
            [`${section}-${id}`]: !prev[`${section}-${id}`],
        }));
    };

    return (
        <div
            className="min-h-screen p-6 text-text-primary relative bg-cover bg-center"
            style={{
                backgroundImage: "url('https://i.pinimg.com/1200x/ae/72/36/ae72360755cf813f1358c529af7b2965.jpg')"
            }}
        >

            <div className="grid gap-6 lg:grid-cols-3 mt-16">
                {/* Clubs Announcements */}
                <div className="bg-white/90 backdrop-blur-sm border border-card-border rounded-2xl p-4 shadow-lg flex flex-col max-h-[80vh] overflow-y-auto">
                    <h2 className="text-xl font-semibold mb-4 flex justify-between items-center text-blue-800">
                        Clubs
                        <Link
                            to="/announcements/new?type=club"
                            className="px-2 py-1 rounded-full bg-button-orange text-text-inverse text-sm hover:bg-button-orangeHover transition"
                        >
                            +
                        </Link>
                    </h2>
                    <ul className="space-y-4">
                        {clubsAnnouncements.map((ann: Announcement) => {
                            const isExpanded = expandedIds[`club-${ann.id}`];
                            return (
                                <li
                                    key={ann.id}
                                    className="border-b border-input-border pb-2 cursor-pointer rounded hover:bg-blue-50 transition p-2"
                                    onClick={() => toggleExpand("club", ann.id)}
                                >
                                    <h3 className="font-medium text-blue-900">{ann.title}</h3>
                                    {isExpanded && (
                                        <>
                                            <p className="text-sm text-text-secondary mt-1">{ann.description}</p>
                                            <span className="text-xs text-text-secondary">{ann.date}</span>
                                        </>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Events Announcements */}
                <div className="bg-white/90 backdrop-blur-sm border border-card-border rounded-2xl p-4 shadow-lg flex flex-col max-h-[80vh] overflow-y-auto">
                    <h2 className="text-xl font-semibold mb-4 flex justify-between items-center text-green-800">
                        Events
                        <Link
                            to="/announcements/new?type=event"
                            className="px-2 py-1 rounded-full bg-button-orange text-text-inverse text-sm hover:bg-button-orangeHover transition"
                        >
                            +
                        </Link>
                    </h2>
                    <ul className="space-y-4">
                        {eventsAnnouncements.map((ann: Announcement) => {
                            const isExpanded = expandedIds[`event-${ann.id}`];
                            return (
                                <li
                                    key={ann.id}
                                    className="border-b border-input-border pb-2 cursor-pointer rounded hover:shadow-md transition overflow-hidden"
                                    onClick={() => toggleExpand("event", ann.id)}
                                >
                                    {ann.imageUrl && (
                                        <div
                                            className="h-40 w-full bg-cover bg-center rounded-t-xl"
                                            style={{ backgroundImage: `url(${ann.imageUrl})` }}
                                        />
                                    )}
                                    <div className="p-2">
                                        <h3 className="font-medium text-green-900">{ann.title}</h3>
                                        {isExpanded && (
                                            <>
                                                <p className="text-sm text-text-secondary mt-1">{ann.description}</p>
                                                <span className="text-xs text-text-secondary">{ann.date}</span>
                                            </>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* System Announcements */}
                <div className="bg-white/90 backdrop-blur-sm border border-card-border rounded-2xl p-4 shadow-lg flex flex-col max-h-[80vh] overflow-y-auto">
                    <h2 className="text-xl font-semibold mb-4 flex justify-between items-center text-red-800">
                        System
                        <Link
                            to="/announcements/new?type=system"
                            className="px-2 py-1 rounded-full bg-button-orange text-text-inverse text-sm hover:bg-button-orangeHover transition"
                        >
                            +
                        </Link>
                    </h2>
                    <ul className="space-y-4">
                        {systemAnnouncements.map((ann: Announcement) => {
                            const isExpanded = expandedIds[`system-${ann.id}`];
                            return (
                                <li
                                    key={ann.id}
                                    className="border-b border-input-border pb-2 cursor-pointer rounded hover:bg-red-50 transition p-2"
                                    onClick={() => toggleExpand("system", ann.id)}
                                >
                                    <h3 className="font-medium text-red-900">{ann.title}</h3>
                                    {isExpanded && (
                                        <>
                                            <p className="text-sm text-text-secondary mt-1">{ann.description}</p>
                                            <span className="text-xs text-text-secondary">{ann.date}</span>
                                        </>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementsPage;

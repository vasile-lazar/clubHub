import React, { useState } from 'react';
import rawEvents from '../../_mock/EventsAnnouncements.json';
import type { Event } from '../../types';
import { SearchInput } from '../../components/ui/SearchInput';
import { BarsArrowUpIcon, FunnelIcon } from '@heroicons/react/24/outline';
import EventCard from '../../components/EventCard';
import { Button } from '../../components/ui/Button';

const eventsData = rawEvents as Event[];

export const Events: React.FC = () => {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<'date-asc' | 'date-desc' | 'title-asc' | 'title-desc'>('date-asc');
    const [filterBy, setFilterBy] = useState('all');
    const [visibleCount, setVisibleCount] = useState(6);

    const categories = Array.from(new Set(eventsData.map((e) => e.category).filter(Boolean)));

    const filtered = eventsData
        .filter((e) => {
            const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase());
            const matchesFilter = filterBy === 'all' || e.category === filterBy;
            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => {
            if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
            if (sortBy === 'title-desc') return b.title.localeCompare(a.title);
            if (sortBy === 'date-asc') return new Date(a.date).getTime() - new Date(b.date).getTime();
            if (sortBy === 'date-desc') return new Date(b.date).getTime() - new Date(a.date).getTime();
            return 0;
        });

    const visible = filtered.slice(0, visibleCount);

    return (
        <div className="space-y-6 p-4 lg:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Events</h1>

            <div className="space-y-4">
                <SearchInput
                    value={search}
                    onChange={setSearch}
                    onSearch={() => {}}
                    placeholder="Search events..."
                    autoSearch={true}
                    className="flex-1"
                />

                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                        <FunnelIcon className="h-5 w-5 text-text-secondary" />
                        <span className="text-sm font-medium text-text-secondary">Filter:</span>
                        <select
                            value={filterBy}
                            onChange={(e) => setFilterBy(e.target.value)}
                            className="px-3 py-1.5 rounded-lg border border-input-border bg-bg-secondary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-input-focus"
                        >
                            <option value="all">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <BarsArrowUpIcon className="h-5 w-5 text-text-secondary" />
                        <span className="text-sm font-medium text-text-secondary">Sort:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                            className="px-3 py-1.5 rounded-lg border border-input-border bg-bg-secondary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-input-focus"
                        >
                            <option value="date-asc">Date (Earliest)</option>
                            <option value="date-desc">Date (Latest)</option>
                            <option value="title-asc">Title (A–Z)</option>
                            <option value="title-desc">Title (Z–A)</option>
                        </select>
                    </div>
                </div>
            </div>

            {visible.length > 0 ? (
                <>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {visible.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                    {visibleCount < filtered.length && (
                        <div className="text-center pt-4">
                            <Button variant="outline" size="md" onClick={() => setVisibleCount((c) => c + 6)}>
                                See More Events
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                                </svg>
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <p className="text-text-secondary text-center py-12">
                    {search || filterBy !== 'all'
                        ? 'No events found matching your filters.'
                        : 'No events found.'}
                </p>
            )}
        </div>
    );
};
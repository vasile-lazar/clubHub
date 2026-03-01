import React, { useState } from 'react';
import rawEvents from '../../_mock/EventsAnnouncements.json';
import type { Event } from '../../types';

const eventsData = rawEvents as Event[];

interface EventCardProps {
    event: Event;
}

function EventCard({ event }: EventCardProps) {
    return (
        <div
            style={{
                background: 'var(--bg-primary, #fff)',
                border: '1px solid var(--border-default, #e5e7eb)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                transition: 'box-shadow 0.2s, transform 0.2s',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
            }}
            onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(99,45,255,0.13)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
        >
            {/* Image */}
            <div
                style={{
                    height: '180px',
                    width: '100%',
                    backgroundImage: event.imageUrl
                        ? `url(${event.imageUrl})`
                        : 'linear-gradient(135deg, #7c2d00 0%, #c2410c 40%, #ea580c 80%, #fb923c 100%)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                }}
            >
                {/* Overlay tint for missing images */}
                {!event.imageUrl && (
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(135deg, rgba(108,60,225,0.85), rgba(59,130,246,0.85))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <span style={{ fontSize: '2rem' }}>🎪</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div style={{ padding: '16px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h3 style={{
                    fontSize: '15px',
                    fontWeight: '700',
                    color: 'var(--text-primary, #111)',
                    lineHeight: '1.35',
                    margin: 0,
                }}>
                    {event.title}
                </h3>

                {event.date && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted, #6b7280)' }}>{event.date}</span>
                    </div>
                )}

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 'auto',
                    paddingTop: '10px',
                    borderTop: '1px solid var(--border-default, #f0f0f0)',
                }}>
                    <div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted, #9ca3af)', marginBottom: '1px' }}>Organized By</div>
                        <div style={{ fontSize: '12px', fontWeight: '600', color: 'text-text-primary' }}>
                            {(event as any).organizer || 'Student name'}
                        </div>
                    </div>
                    <button style={{
                        background: 'transparent',
                        border: '1.5px solid #1a1a2e',
                        borderRadius: '8px',
                        padding: '6px 14px',
                        fontSize: '12px',
                        fontWeight: '700',
                        color: '#1a1a2e',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        letterSpacing: '0.3px',
                    }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.background = '#1a1a2e';
                                (e.currentTarget as HTMLElement).style.color = '#fff';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.background = 'transparent';
                                (e.currentTarget as HTMLElement).style.color = '#1a1a2e';
                            }}
                    >
                         View
                    </button>
                </div>
            </div>
        </div>
    );
}

export const Events: React.FC = () => {
    const [search, setSearch] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [visibleCount, setVisibleCount] = useState(6);

    const filtered = eventsData.filter(e =>
        e.title.toLowerCase().includes(search.toLowerCase())
    );
    const visible = filtered.slice(0, visibleCount);

    return (
        <div style={{ fontFamily: "'Segoe UI', sans-serif" }}>
            {/* Hero Banner */}
            <div style={{
                background: 'linear-gradient(135deg, #7c2d00 0%, #c2410c 40%, #ea580c 80%, #fb923c 100%)',
                borderRadius: '20px',
                padding: '56px 48px 72px',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '40px',
            }}>
                {/* Decorative blobs */}
                <div style={{
                    position: 'absolute', top: '-40px', right: '-40px',
                    width: '280px', height: '280px', borderRadius: '50%',
                    background: '#d46d06', filter: 'blur(40px)',
                }} />
                <div style={{
                    position: 'absolute', bottom: '-60px', left: '30%',
                    width: '200px', height: '200px', borderRadius: '50%',
                    background: '#fd942c', filter: 'blur(50px)',
                }} />

                <div style={{ position: 'relative', zIndex: 1, maxWidth: '520px' }}>
                    <p style={{
                        fontStyle: 'italic', color: 'white',
                        fontSize: '18px', margin: '0 0 10px',
                        fontWeight: '500',
                    }}>Find Your Next Experience</p>
                    <h1 style={{
                        color: '#fff',
                        fontSize: 'clamp(28px, 5vw, 46px)',
                        fontWeight: '900',
                        lineHeight: '1.15',
                        margin: '0 0 36px',
                        letterSpacing: '-0.5px',
                    }}>
                        Discover &amp; Promote<br />Upcoming Events
                    </h1>

                    {/* Search bar */}
                    <div style={{
                        background: '#fff',
                        borderRadius: '12px',
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        boxShadow: '0 4px 30px rgba(0,0,0,0.2)',
                        flexWrap: 'wrap',
                    }}>
                        <div style={{ display: 'flex ', alignItems: 'center', gap: '8px', flex: '1', minWidth: '120px' }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            </svg>
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search Event"
                                style={{
                                    border: 'none', outline: 'none', fontSize: '13px',
                                    color: '#374151', background: 'transparent', width: '100%',
                                }}
                            />
                        </div>
                        <div style={{ width: '1px', height: '20px', background: '#e5e7eb' }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '1', minWidth: '120px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                            </svg>
                            <input
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                                placeholder="Search Location"
                                style={{
                                    border: 'none', outline: 'none', fontSize: '13px',
                                    color: '#374151', background: 'transparent', width: '100%',
                                }}
                            />
                        </div>
                        <div style={{ width: '1px', height: '20px', background: '#e5e7eb' }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '1', minWidth: '100px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 6h16M4 12h10M4 18h6"/>
                            </svg>
                            <select
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                style={{
                                    border: 'none', outline: 'none', fontSize: '13px',
                                    color: category ? '#374151' : '#9ca3af', background: 'transparent', cursor: 'pointer',
                                }}
                            >
                                <option value="">Category</option>
                                <option value="conference">Conference</option>
                                <option value="workshop">Workshop</option>
                                <option value="concert">Concert</option>
                                <option value="career">Career</option>
                            </select>
                        </div>
                        <button style={{
                            background: 'linear-gradient(135deg, #7c2d00 0%, #c2410c 40%, #ea580c 80%, #fb923c 100%)',
                            border: 'none',
                            borderRadius: '8px',
                            width: '38px', height: '38px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer',
                            flexShrink: 0,
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Featured Events Section */}
            <div>
                {/* Section header */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <p style={{
                        fontStyle: 'italic',
                        color: '#d46d06',
                        fontSize: '16px',
                        fontWeight: '600',
                        margin: '0 0 6px',
                    }}>Upcoming Event</p>
                    <h2 style={{
                        fontSize: 'clamp(22px, 4vw, 32px)',
                        fontWeight: '900',
                        color: 'var(--text-primary, #111)',
                        margin: 0,
                        letterSpacing: '-0.3px',
                    }}>Featured Events</h2>
                </div>

                {/* Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '24px',
                }}>
                    {visible.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>

                {/* See more */}
                {visibleCount < filtered.length && (
                    <div style={{ textAlign: 'center', marginTop: '40px' }}>
                        <button
                            onClick={() => setVisibleCount(c => c + 6)}
                            style={{
                                background: 'transparent',
                                border: '1.5px solid #1a1a2e',
                                borderRadius: '10px',
                                padding: '12px 32px',
                                fontSize: '14px',
                                fontWeight: '700',
                                color: '#1a1a2e',
                                cursor: 'pointer',
                                letterSpacing: '0.5px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'all 0.15s',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.background = '#1a1a2e';
                                (e.currentTarget as HTMLElement).style.color = '#fff';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.background = 'transparent';
                                (e.currentTarget as HTMLElement).style.color = '#1a1a2e';
                            }}
                        >
                            SEE MORE EVENTS
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
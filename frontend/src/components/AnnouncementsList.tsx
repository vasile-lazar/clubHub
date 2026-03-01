import React from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { Card, CardHeader, CardContent, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { AnnouncementItem } from './ui/AnnoucementItem'
import type { Announcement } from '../types';

interface AnnouncementsListProps {
    announcements: Announcement[];
    showViewAll?: boolean;
}

export const AnnouncementsList: React.FC<AnnouncementsListProps> = ({
                                                                        announcements,
                                                                        showViewAll,
                                                                    }) => (
    <Card>
        <CardHeader>
            <div className="flex items-center justify-between w-full">
                <CardTitle className="flex items-center gap-2">
                    <BellIcon className="h-5 w-5 text-brand-orange" />
                    Announcements
                </CardTitle>

                {showViewAll && (
                    <Button type="internal" to="/announcements" variant="secondary" size="sm">
                        View All
                    </Button>
                )}
            </div>
        </CardHeader>

        <CardContent>
            {announcements.length > 0 ? (
                <div className="space-y-4">
                    {announcements.map((announcement) => (
                        <AnnouncementItem
                            key={announcement.id}
                            announcement={announcement}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <BellIcon className="w-10 h-10 text-text-secondary mx-auto mb-3" />
                    <p className="text-text-secondary">No announcements available</p>
                </div>
            )}
        </CardContent>
    </Card>
);
import React from 'react';
import { BellIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Badge } from '../ui/Card';
import type { Announcement } from '../../types';

interface AnnouncementItemProps {
    announcement: Announcement;
}

export const AnnouncementItem: React.FC<AnnouncementItemProps> = ({
                                                                      announcement,
                                                                  }) => {
    const isHigh = announcement.priority === 'high';

    return (
        <div className="flex items-start gap-4 p-4 rounded-lg border border-border-default hover:bg-bg-secondary transition-colors group cursor-pointer">

            {/* Icon */}
            <div className="mt-1">
                {isHigh ? (
                    <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                ) : (
                    <BellIcon className="w-5 h-5 text-brand-orange" />
                )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-semibold text-text-primary group-hover:text-brand-orange transition">
                        {announcement.title}
                    </h4>

                    {announcement.isPinned && <Badge>Pinned</Badge>}
                    {isHigh && <Badge >High</Badge>}
                </div>

                <p className="text-sm text-text-secondary mt-2">
                    {announcement.content}
                </p>

                <div className="text-xs text-text-secondary mt-3 flex flex-wrap gap-1">
                    {announcement.clubName && (
                        <>
                            <span className="font-medium">{announcement.clubName}</span>
                            <span>·</span>
                        </>
                    )}
                    <span>{announcement.author}</span>
                    <span>·</span>
                    <span>{announcement.date}</span>
                </div>
            </div>
        </div>
    );
};
import React from 'react';
import { Link } from 'react-router-dom';
import type { MyClubCardData } from '../types';
import { Card, CardContent, Badge } from './ui/Card';
import { Button } from './ui/Button';
import {
  CalendarIcon,
  TrophyIcon,
  XMarkIcon,
  ArrowRightIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

interface MyClubCardProps {
  club: MyClubCardData;
  onLeave?: (clubId: string) => void;
}

export const MyClubCard: React.FC<MyClubCardProps> = ({ club, onLeave }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getDaysUntil = (dateString: string) => {
    const diffTime = new Date(dateString).getTime() - Date.now();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/5">
      {club.imageUrl && (
        <div className="relative h-44 w-full overflow-hidden">
          <img
            src={club.imageUrl}
            alt={club.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute top-3 right-3">
            {club.userRole && (
              <Badge className="bg-white/90 text-black backdrop-blur-sm">{club.userRole}</Badge>
            )}
          </div>
          {club.badges && club.badges.length > 0 && (
            <div className="absolute top-3 left-3 flex gap-1">
              {club.badges.slice(0, 2).map((badge, idx) => (
                <Badge key={idx} className="bg-brand-orange text-white backdrop-blur-sm text-xs">
                  🏆 {badge}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}

      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        <div className="min-h-0 flex-1">
          {!club.imageUrl && club.userRole && (
            <Badge variant="outline" className="mb-2">
              {club.userRole}
            </Badge>
          )}
          <h3 className="text-lg font-semibold leading-tight text-text-primary line-clamp-2 mb-2">
            {club.name}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-text-secondary">
            {club.description}
          </p>
        </div>

        {club.nextEvent && (
          <div className="rounded-lg border border-border-default bg-bg-secondary/50 p-3">
            <div className="flex items-start gap-2">
              <CalendarIcon className="h-4 w-4 text-brand-orange flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-text-secondary mb-1">Next Event</p>
                <p className="text-sm font-semibold text-text-primary truncate">
                  {club.nextEvent.title}
                </p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-xs text-text-secondary">
                    {formatDate(club.nextEvent.date)}
                  </span>
                  {club.nextEvent.time && (
                    <span className="text-xs text-text-secondary">{club.nextEvent.time}</span>
                  )}
                  {getDaysUntil(club.nextEvent.date) >= 0 && (
                    <span className="text-xs font-medium text-brand-orange">
                      {getDaysUntil(club.nextEvent.date) === 0
                        ? 'Today'
                        : `${getDaysUntil(club.nextEvent.date)} days`}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {club.stats && (
          <div className="grid grid-cols-2 gap-2 rounded-lg border border-border-default bg-bg-secondary/30 p-3">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-stat-green" />
              <div>
                <p className="text-xs text-text-secondary">Attended</p>
                <p className="text-sm font-semibold text-text-primary">{club.stats.eventsAttended}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrophyIcon className="h-4 w-4 text-stat-amber" />
              <div>
                <p className="text-xs text-text-secondary">Points</p>
                <p className="text-sm font-semibold text-text-primary">
                  {club.stats.contributionPoints}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ChartBarIcon className="h-4 w-4 text-stat-blue" />
              <div>
                <p className="text-xs text-text-secondary">Attendance</p>
                <p className="text-sm font-semibold text-text-primary">
                  {club.stats.attendanceRate}%
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrophyIcon className="h-4 w-4 text-admin-accent" />
              <div>
                <p className="text-xs text-text-secondary">Certificates</p>
                <p className="text-sm font-semibold text-text-primary">
                  {club.stats.certificates}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border-default pt-4">
          <Link
            to={`/clubs/${club.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-orange transition-colors hover:text-brand-orange/80"
          >
            View Club
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          {onLeave && (
            <Button variant="secondary" size="sm" onClick={() => onLeave(String(club.id))}>
              <XMarkIcon className="h-4 w-4" />
              Leave
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

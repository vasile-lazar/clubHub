import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Club } from '../types';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { XMarkIcon, CheckCircleIcon, UserGroupIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface ClubCardProps {
  club: Club;
  isMember?: boolean;
  onLeave?: (clubId: number) => void;
  onJoin?: (clubId: number) => void;
}

export const ClubCard: React.FC<ClubCardProps> = ({ club, isMember = false, onLeave, onJoin }) => {
  const [isLeaving, setIsLeaving] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const clubId = club.id;

  const handleLeave = () => {
    if (window.confirm(`Are you sure you want to leave ${club.name}?`)) {
      setIsLeaving(true);
      onLeave?.(clubId);
      setTimeout(() => setIsLeaving(false), 500);
    }
  };

  const handleJoin = () => {
    setIsJoining(true);
    onJoin?.(clubId);
    setTimeout(() => setIsJoining(false), 500);
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
          <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-800 backdrop-blur-sm">
              <UserGroupIcon className="h-3.5 w-3.5" />
              {club.members} members
            </span>
          </div>
        </div>
      )}

      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        <div className="min-h-0 flex-1">
          {!club.imageUrl && (
            <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary">
              <UserGroupIcon className="h-3.5 w-3.5" />
              {club.members} members
            </span>
          )}
          <h3 className="text-lg font-semibold leading-tight text-text-primary line-clamp-2">
            {club.name}
          </h3>
          <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-text-secondary">
            {club.description}
          </p>
        </div>

        <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border-default pt-4">
          <Link
            to={`/clubs/${clubId}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-orange transition-colors hover:text-brand-orange/80"
          >
            View Club
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          {isMember ? (
            onLeave && (
              <Button variant="secondary" size="sm" onClick={handleLeave} disabled={isLeaving}>
                <XMarkIcon className="h-4 w-4" />
                {isLeaving ? 'Leaving...' : 'Leave'}
              </Button>
            )
          ) : (
            onJoin && (
              <Button variant="primary" size="sm" onClick={handleJoin} disabled={isJoining}>
                <CheckCircleIcon className="h-4 w-4" />
                {isJoining ? 'Joining...' : 'Join'}
              </Button>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

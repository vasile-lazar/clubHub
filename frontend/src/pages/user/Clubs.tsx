import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { SearchInput } from '../../components/ui/SearchInput';
import { ClubCard } from '../../components/ClubCard';
import { useClubsFilterSort } from '../../hooks/useClubsFilterSort';
import clubsDataJson from '../../_mock/ClubInfo.json';
import type { Club } from '../../types';
import { FunnelIcon, BarsArrowUpIcon } from '@heroicons/react/24/outline';

const raw = clubsDataJson as Array<Club & { id: number }>;

const clubsData: Club[] = raw.map((c) => ({
  ...c,
  id: c.id,
  category:
    c.category ||
    (c.name.toLowerCase().includes('coding') || c.name.toLowerCase().includes('science')
      ? 'Technology'
      : c.name.toLowerCase().includes('art') ||
          c.name.toLowerCase().includes('music') ||
          c.name.toLowerCase().includes('drama') ||
          c.name.toLowerCase().includes('photography')
        ? 'Arts'
        : c.name.toLowerCase().includes('book')
          ? 'Literature'
          : c.name.toLowerCase().includes('game') || c.name.toLowerCase().includes('chess')
            ? 'Games'
            : c.name.toLowerCase().includes('environmental')
              ? 'Environment'
              : 'Other'),
}));

export const Clubs: React.FC = () => {
  const {
    search,
    setSearch,
    sortBy,
    setSortBy,
    filterBy,
    setFilterBy,
    filteredClubs,
    categories,
  } = useClubsFilterSort(clubsData);

  const [joinedClubIds, setJoinedClubIds] = useState<Set<string>>(new Set());
  const [memberCountDeltas, setMemberCountDeltas] = useState<Record<string, number>>({});

  const handleSearch = () => {
    // Filtering is driven by state; no extra action needed when using useClubsFilterSort
  };

  const handleJoin = (clubId: string) => {
    setJoinedClubIds((prev) => new Set(prev).add(clubId));
    setMemberCountDeltas((prev) => ({ ...prev, [clubId]: (prev[clubId] || 0) + 1 }));
  };

  const handleLeave = (clubId: string) => {
    setJoinedClubIds((prev) => {
      const next = new Set(prev);
      next.delete(clubId);
      return next;
    });
    setMemberCountDeltas((prev) => ({ ...prev, [clubId]: (prev[clubId] || 0) - 1 }));
  };

  const clubsToShow = filteredClubs.map((c) => ({
    ...c,
    id: c.id,
    members: c.members + (memberCountDeltas[String(c.id)] || 0),
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Clubs</h1>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            onSearch={handleSearch}
            placeholder="Search clubs..."
            autoSearch={true}
            className="flex-1"
          />
          <Link to="/clubs/new">
            <Button variant="primary">Add New Club</Button>
          </Link>
        </div>

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
                <option key={cat} value={cat}>
                  {cat}
                </option>
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
              <option value="name-asc">Name (A–Z)</option>
              <option value="name-desc">Name (Z–A)</option>
              <option value="members-desc">Most Members</option>
              <option value="members-asc">Fewest Members</option>
            </select>
          </div>
        </div>
      </div>

      {clubsToShow.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {clubsToShow.map((club) => {
            const clubId = String(club.id);
            const isMember = joinedClubIds.has(clubId);
            return (
              <ClubCard
                key={clubId}
                club={{ ...club, id: clubId }}
                isMember={isMember}
                onJoin={handleJoin}
                onLeave={handleLeave}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-text-secondary text-center py-12">
          {search || filterBy !== 'all'
            ? 'No clubs found matching your filters.'
            : 'No clubs found.'}
        </p>
      )}
    </div>
  );
};

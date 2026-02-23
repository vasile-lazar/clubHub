import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { SearchInput } from '../../components/ui/SearchInput';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/Card';
import { MyClubCard } from '../../components/MyClubCard';
import { PATHS } from '../../routes/paths';
import { useMyClubsFilterSort } from '../../hooks/useMyClubsFilterSort';
import { mockJoinedClubs, mockNotifications } from '../../_mock/myClubs';
import {
  BellIcon,
  FunnelIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';

export const MyClubs: React.FC = () => {
  const [joinedClubs, setJoinedClubs] = useState<typeof mockJoinedClubs>([]);
  const [notifications] = useState(mockNotifications);

  const {
    search,
    setSearch,
    sortBy,
    setSortBy,
    filterBy,
    setFilterBy,
    filteredClubs,
    categories,
  } = useMyClubsFilterSort(joinedClubs);

  useEffect(() => {
    setJoinedClubs(mockJoinedClubs);
  }, []);

  const handleSearch = () => {};

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">My Clubs</h1>
          <p className="text-text-secondary mt-1">
            Manage and explore the clubs you&apos;ve joined
          </p>
        </div>
        <Link to={PATHS.app.clubs}>
          <Button variant="primary">Discover More Clubs</Button>
        </Link>
      </div>

      {notifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BellIcon className="h-5 w-5 text-brand-orange" />
              Recent Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.slice(0, 3).map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-3 p-3 rounded-lg border border-border-default hover:bg-bg-secondary transition"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-primary">
                      <span className="font-semibold">{notification.clubName}</span>{' '}
                      {notification.message}
                    </p>
                    <p className="text-xs text-text-secondary mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            onSearch={handleSearch}
            placeholder="Search my clubs..."
            autoSearch={true}
            className="flex-1"
          />
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
              <option value="recent">Recently Joined</option>
              <option value="active">Most Active</option>
              <option value="upcoming">Upcoming Event</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {filteredClubs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredClubs.map((club) => (
            <MyClubCard
              key={club.id}
              club={club}
              onLeave={(clubId) => {
                setJoinedClubs((prev) => prev.filter((c) => String(c.id) !== clubId));
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-text-secondary mb-4">
            {search || filterBy !== 'all'
              ? 'No clubs found matching your filters.'
              : "You haven't joined any clubs yet."}
          </p>
          {!search && filterBy === 'all' && (
            <Link to={PATHS.app.clubs}>
              <Button variant="primary">Browse All Clubs</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

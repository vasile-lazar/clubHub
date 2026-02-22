import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import clubsDataJson from '../../_mock/ClubInfo.json';
import type { Club } from '../../types';

const clubsData = clubsDataJson as Club[];

// ClubCard component
interface ClubCardProps {
    club: Club;
}

function ClubCard({ club }: ClubCardProps) {
    return (
        <div className="rounded-2xl overflow-hidden bg-bg-primary border border-border-default shadow-sm hover:shadow-lg transition flex flex-col">
            {club.imageUrl && (
                <img
                    src={club.imageUrl}
                    alt={club.name}
                    className="h-40 w-full object-cover"
                />
            )}
            <div className="p-4 flex flex-col flex-1">
                <h2 className="text-lg font-semibold text-text-primary">{club.name}</h2>
                <p className="text-sm text-text-secondary mt-1 line-clamp-2">{club.description}</p>
                <div className="flex justify-between items-center mt-auto">
                    <span className="text-xs text-text-secondary">{club.members} members</span>
                    <Link to={`/clubs/${club.id}`}>
                        <Button variant="primary" size="sm">View</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export const Clubs: React.FC = () => {
    const [search, setSearch] = useState('');
    const [filteredClubs, setFilteredClubs] = useState<Club[]>(clubsData);

    const handleSearch = () => {
        const q = search.toLowerCase().trim();
        const results = q
            ? clubsData.filter((club) => club.name.toLowerCase().includes(q))
            : clubsData;
        setFilteredClubs(results);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Clubs</h1>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-1 max-w-md">
                    <input
                        type="text"
                        placeholder="Search clubs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        className="flex-1 p-3 rounded-l-xl border border-input-border bg-bg-secondary text-text-primary focus:outline-none focus:border-input-focus"
                    />
                    <Button onClick={handleSearch} className="rounded-l-none rounded-r-xl">
                        Search
                    </Button>
                </div>
                <Link to="/add/new">
                    <Button variant="primary">Add New Club</Button>
                </Link>
            </div>

            {filteredClubs.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredClubs.map((club) => (
                        <ClubCard key={club.id} club={club} />
                    ))}
                </div>
            ) : (
                <p className="text-text-secondary text-center py-12">No clubs found.</p>
            )}
        </div>
    );
};
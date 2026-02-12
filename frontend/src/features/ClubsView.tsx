import React, { useState } from "react";
import { Link } from "react-router-dom";
import clubsDataJson from "../_mock/clubinfo.json";

export type Club = {
    id: number;
    name: string;
    description: string;
    members: number;
    imageUrl?: string;
};

const clubsData: Club[] = clubsDataJson;

const ClubsPage: React.FC = () => {
    const [search, setSearch] = useState("");
    const [filteredClubs, setFilteredClubs] = useState<Club[]>(clubsData);

    // Handle search button click
    const handleSearch = () => {
        const results = clubsData.filter((club) =>
            club.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredClubs(results);
    };

    return (
        <div className="p-6 bg-bg-primary text-text-primary min-h-screen">
            {/* Search + Add button wrapper */}
            <div className="flex justify-center items-center mt-10 mb-8 space-x-4">
                {/* Search bar with button */}
                <div className="flex w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search clubs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 p-3 rounded-l-xl border border-input-border bg-bg-secondary text-text-primary focus:outline-none focus:border-input-focus transition"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-4 rounded-r-xl bg-button-primary hover:bg-button-primaryHover text-text-inverse font-medium hover:bg-button-orangeHover transition"
                    >
                        Search
                    </button>
                </div>

                {/* Add New Club button (separate) */}
                <Link
                    to="/clubs/new"
                    className="px-4 py-4 rounded-xl bg-button-primary hover:bg-button-primaryHover text-text-inverse text-sm font-medium hover:bg-button-orangeHover transition"
                >
                    Add New Club
                </Link>
            </div>



            {/* Clubs grid */}
            {filteredClubs.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredClubs.map((club) => (
                        <div
                            key={club.id}
                            className="rounded-2xl overflow-hidden bg-bg-secondary border-none shadow-sm hover:shadow-lg transition flex flex-col"
                        >
                            {club.imageUrl && (
                                <img
                                    src={club.imageUrl}
                                    alt={club.name}
                                    className="h-40 w-full object-cover"
                                />
                            )}

                            <div className="p-4 flex flex-col flex-1 justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold">{club.name}</h2>
                                    <p className="text-sm text-text-secondary mt-1">
                                        {club.description}
                                    </p>
                                </div>

                                {/* Members + View button aligned */}
                                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-text-secondary">
                    {club.members} members
                  </span>

                                    <Link
                                        to={`/clubs/${club.id}`}
                                        className="px-3 py-1.5 rounded-xl bg-button-primary hover:bg-button-primaryHover text-text-inverse text-sm font-medium hover:bg-button-orangeHover transition"
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-text-secondary mt-4 text-center">No clubs found.</p>
            )}
        </div>
    );
};

export default ClubsPage;

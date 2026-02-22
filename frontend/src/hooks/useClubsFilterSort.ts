import { useState, useMemo } from 'react';
import {
  applyClubsFilters,
  getCategoriesFromClubs,
  type Club,
  type ClubsSortOption,
  type FilterOption,
} from '../utils/clubSearchFilter';

export function useClubsFilterSort(clubs: Club[]) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<ClubsSortOption>('name-asc');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  const filteredClubs = useMemo(
    () => applyClubsFilters(clubs, search, filterBy, sortBy),
    [clubs, search, filterBy, sortBy]
  );

  const categories = useMemo(() => getCategoriesFromClubs(clubs), [clubs]);

  return {
    search,
    setSearch,
    sortBy,
    setSortBy,
    filterBy,
    setFilterBy,
    filteredClubs,
    categories,
  };
}

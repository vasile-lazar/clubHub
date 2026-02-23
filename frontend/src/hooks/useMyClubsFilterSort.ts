import { useState, useMemo } from 'react';
import type { MyClubCardData } from '../types';
import {
  applyMyClubsFilters,
  getCategoriesFromClubs,
  type MyClubsSortOption,
  type FilterOption,
} from '../utils/clubSearchFilter';

export function useMyClubsFilterSort(joinedClubs: MyClubCardData[]) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<MyClubsSortOption>('recent');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  const filteredClubs = useMemo(
    () => applyMyClubsFilters(joinedClubs, search, filterBy, sortBy),
    [joinedClubs, search, filterBy, sortBy]
  );

  const categories = useMemo(
    () => getCategoriesFromClubs(joinedClubs),
    [joinedClubs]
  );

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

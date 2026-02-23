import type { Club } from '../types';
import type { MyClubCardData } from '../types';

export type ClubsSortOption = 'name-asc' | 'name-desc' | 'members-desc' | 'members-asc';
export type MyClubsSortOption = 'recent' | 'active' | 'upcoming' | 'name';
export type FilterOption = 'all' | string;

export interface ClubFilterState {
  search: string;
  filterBy: FilterOption;
}

/** Filter clubs by search query (name, description, category) */
export function filterBySearch<T extends Club>(clubs: T[], query: string): T[] {
  const q = query.toLowerCase().trim();
  if (!q) return clubs;
  return clubs.filter(
    (club) =>
      club.name.toLowerCase().includes(q) ||
      (club.description?.toLowerCase().includes(q) ?? false) ||
      (club.category?.toLowerCase().includes(q) ?? false)
  );
}

/** Filter clubs by category */
export function filterByCategory<T extends Club>(
  clubs: T[],
  category: FilterOption
): T[] {
  if (category === 'all') return clubs;
  return clubs.filter((club) => club.category === category);
}

/** Sort clubs for the main Clubs page */
export function sortClubsList<T extends Club>(
  clubs: T[],
  sortBy: ClubsSortOption
): T[] {
  const result = [...clubs];
  switch (sortBy) {
    case 'name-asc':
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'members-desc':
      result.sort((a, b) => b.members - a.members);
      break;
    case 'members-asc':
      result.sort((a, b) => a.members - b.members);
      break;
  }
  return result;
}

/** Sort clubs for the My Clubs page */
export function sortMyClubsList(
  clubs: MyClubCardData[],
  sortBy: MyClubsSortOption
): MyClubCardData[] {
  const result = [...clubs];
  switch (sortBy) {
    case 'recent':
      result.sort(
        (a, b) =>
          new Date(b.joinedDate || 0).getTime() -
          new Date(a.joinedDate || 0).getTime()
      );
      break;
    case 'active':
      result.sort(
        (a, b) =>
          (b.stats?.eventsAttended || 0) - (a.stats?.eventsAttended || 0)
      );
      break;
    case 'upcoming':
      result.sort((a, b) => {
        if (!a.nextEvent && !b.nextEvent) return 0;
        if (!a.nextEvent) return 1;
        if (!b.nextEvent) return -1;
        return (
          new Date(a.nextEvent.date).getTime() -
          new Date(b.nextEvent.date).getTime()
        );
      });
      break;
    case 'name':
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }
  return result;
}

/** Get unique categories from a list of clubs */
export function getCategoriesFromClubs(clubs: Club[]): string[] {
  return Array.from(
    new Set(clubs.map((c) => c.category).filter(Boolean))
  ) as string[];
}

/** Apply full filter + sort for the Clubs page */
export function applyClubsFilters<T extends Club>(
  clubs: T[],
  search: string,
  filterBy: FilterOption,
  sortBy: ClubsSortOption
): T[] {
  let result = filterBySearch(clubs, search);
  result = filterByCategory(result, filterBy);
  return sortClubsList(result, sortBy);
}

/** Apply full filter + sort for the My Clubs page */
export function applyMyClubsFilters(
  clubs: MyClubCardData[],
  search: string,
  filterBy: FilterOption,
  sortBy: MyClubsSortOption
): MyClubCardData[] {
  let result = filterBySearch(clubs, search);
  result = filterByCategory(result, filterBy);
  return sortMyClubsList(result, sortBy);
}

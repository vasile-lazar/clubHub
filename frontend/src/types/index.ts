// ========== User & Auth ==========
export type UserRole = 'guest' | 'user' | 'admin';

export interface User {
  id?: string;
  username: string;
  email?: string;
  password?: string;
  role: UserRole;
  pfp?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// ========== Club ==========
export interface Club {
  id: number;
  name: string;
  description: string;
  members: number;
  imageUrl?: string;
  category?: string;
  isActive?: boolean;
}

/** Extended club data for "My Clubs" cards (role, next event, stats, badges) */
export interface MyClubCardData extends Club {
  userRole?: 'Member' | 'Lead' | 'Admin';
  nextEvent?: {
    title: string;
    date: string;
    time?: string;
  };
  stats?: {
    eventsAttended: number;
    attendanceRate: number;
    contributionPoints: number;
    certificates: number;
  };
  badges?: string[];
  joinedDate?: string;
}

// ========== Event ==========
export interface Event {
  id: number;
  title: string;
  description?: string;
  category?: string;
  date: string;
  time?: string;
  location?: string;
  image?: string;
  imageUrl?: string;
  attendees?: number;
  status?: string;
  color?: string;
}

// ========== Announcement ==========
export interface Announcement {
  id: string;
  title: string;
  clubName: string;
  date: string;
  isPinned: boolean;
}

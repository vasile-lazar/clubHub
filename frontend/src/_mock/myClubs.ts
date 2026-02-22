import type { MyClubCardData } from '../types';
import myClubsJson from './myClubs.json';

export const mockJoinedClubs: MyClubCardData[] = myClubsJson.joinedClubs as MyClubCardData[];

export interface MyClubsNotification {
  id: string;
  clubName: string;
  message: string;
  time: string;
  type: 'announcement' | 'event' | 'achievement';
}

export const mockNotifications: MyClubsNotification[] =
  myClubsJson.notifications as MyClubsNotification[];

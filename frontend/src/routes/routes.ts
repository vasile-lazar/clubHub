export const ROUTES = {
  // Public (guest)
  landing: '/',
  login: '/login',
  register: '/register',

  // User (authenticated)
  dashboard: '/dashboard',
  profile: '/profile',
  clubs: '/clubs',
  events: '/events',
  myClubs: '/myclubs',

  // Admin
  admin: '/admin',
  adminUsers: '/admin/users',
  adminSettings: '/admin/settings',

  // Error pages
  forbidden: '/403',
  notFound: '/404',
} as const;

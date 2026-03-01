export const PATHS = {
  public: {
    home: '/',
    login: '/login',
    register: '/register',
    forbidden: '/403',
    notFound: '/404',
  },
  app: {
    root: '/dashboard',
    dashboard: '/dashboard',
    profile: '/profile',
    clubs: '/clubs',
    events: '/events',
    myClubs: '/myclubs',
    clubDetail: '/clubs/:id',
    eventDetail: '/events/:id'
  },
  admin: {
    root: '/admin',
    dashboard: '/admin',
    users: '/admin/users',
    clubs: '/admin/clubs',
    events: '/admin/events',
    settings: '/admin/settings',
  },
} as const;
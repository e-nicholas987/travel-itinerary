const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  WALLET: '/wallet',
  PLAN_TRIP: '/trip-planner',
  COMMISSION_FOR_LIFE: '/commission-for-life',
  SUBSCRIBE: '/subscribe',
  NOTIFICATIONS: '/notifications',
  CARTS: '/carts',
  CREATE: '/create',
  PROFILE: '/profile',
} as const;

type RouteKey = keyof typeof ROUTES;
type RouteValue = (typeof ROUTES)[RouteKey];

export { ROUTES, type RouteKey, type RouteValue };

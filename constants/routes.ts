const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  WALLET: "/wallet",
  PLAN_TRIP: "/trips",
  COMMISSION_FOR_LIFE: "/commission-for-life",
  SUBSCRIBE: "/subscribe",
  NOTIFICATIONS: "/notifications",
  CARTS: "/carts",
  CREATE: "/create",
  PROFILE: "/profile",
  ACTIVITIES: "/activities",
  HOTELS: "/hotels",
  FLIGHTS: "/flights",
  STUDY: "/study",
  VISA: "/visa",
  IMMIGRATION: "/immigration",
  MEDICAL: "/medical",
  VACATION_PACKAGES: "/vacation-packages",
} as const;

type RouteKey = keyof typeof ROUTES;
type RouteValue = (typeof ROUTES)[RouteKey];

export { ROUTES, type RouteKey, type RouteValue };

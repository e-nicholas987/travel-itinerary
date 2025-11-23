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
  ACTIVITIES: "/trips/search/activities",
  HOTELS: "/trips/search/hotels",
  FLIGHTS: "/trips/search/flights",
  STUDY: "/trips/study",
  VISA: "/trips/visa",
  IMMIGRATION: "/trips/immigration",
  MEDICAL: "/trips/medical",
  VACATION_PACKAGES: "/trips/vacation-packages",
} as const;

type RouteKey = keyof typeof ROUTES;
type RouteValue = (typeof ROUTES)[RouteKey];

export { ROUTES, type RouteKey, type RouteValue };

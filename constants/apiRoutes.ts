export const API_ROUTES = {
  attraction: {
    searchAttractions: "/attraction/searchAttractions",
    searchAttractionLocation: "/attraction/searchLocation",
  },

  hotels: {
    searchHotelDestinations: "/hotel/searchDestinations",
    getSortBy: "/hotels/getSortBy",
  },

  flights: {
    searchFlights: "/flight/searchFlights",
    searchFlightLocation: "/flight/searchLocation",
    search: "/search/flights",
  },

  meta: {
    getCurrency: "meta/getCurrency",
    getLanguages: "meta/getLanguages",
  },
} as const;

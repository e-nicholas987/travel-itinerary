export const API_ROUTES = {
  attraction: {
    searchAttractions: "/attraction/searchAttractions",
    searchAttractionLocation: "/attraction/searchLocation",
  },

  hotels: {
    searchHotelDestinations: "/hotels/searchDestination",
    getSortBy: "/hotels/getSortBy",
    getFilter: "/hotels/getFilter",
    searchHotels: "/hotel/searchHotels",
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

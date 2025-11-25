export const API_ROUTES = {
  attraction: {
    searchAttractions: "/attraction/searchAttractions",
    searchAttractionLocation: "/attraction/searchLocation",
  },

  hotels: {
    searchHotelDestinations: "/hotels/searchDestination",
    getSortBy: "/hotels/getSortBy",
    getFilter: "/hotels/getFilter",
    searchHotels: "/hotels/searchHotels",
  },

  flights: {
    searchFlights: "/flights/searchFlights",
    searchFlightDestination: "/flights/searchDestination",
  },

  meta: {
    getCurrency: "meta/getCurrency",
    getLanguages: "meta/getLanguages",
    getLocations: "meta/getLocations",
  },
} as const;

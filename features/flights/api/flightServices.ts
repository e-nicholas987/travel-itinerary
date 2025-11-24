import { API_ROUTES } from "@/constants/apiRoutes";
import { apiClient } from "@/lib/apiClient";
import buildQueryString from "@/lib/utils/buildQueryString";

import type {
  SearchFlightsParams,
  SearchFlightsResponse,
  SearchFlightDestinationsResponse,
} from "../types";

export const searchFlights = async (
  params: SearchFlightsParams
): Promise<SearchFlightsResponse> => {
  const { data } = await apiClient.get(
    buildQueryString(API_ROUTES.flights.searchFlights, params)
  );

  return data;
};

export const searchFlightDestinations = async (
  query: string
): Promise<SearchFlightDestinationsResponse> => {
  const { data } = await apiClient.get(
    API_ROUTES.flights.searchFlightDestination,
    { params: { query } }
  );

  return data;
};

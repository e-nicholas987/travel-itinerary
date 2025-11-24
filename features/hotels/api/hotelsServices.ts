import { API_ROUTES } from "@/constants/apiRoutes";
import { apiClient } from "@/lib/apiClient";
import type {
  SearchHotelsParams,
  SearchHotelsResponse,
  SearchHotelDestinationsResponse,
  GetHotelSortByParams,
  GetHotelSortByResponse,
  GetHotelFilterParams,
  GetHotelFilterResponse,
} from "@/features/hotels/types";
import buildQueryString from "@/lib/utils/buildQueryString";

export const searchHotels = async (
  params?: SearchHotelsParams
): Promise<SearchHotelsResponse> => {
  const { data } = await apiClient.get(
    buildQueryString(API_ROUTES.hotels.searchHotels, params ?? {})
  );

  return data;
};

export const searchHotelDestinations = async (
  query: string
): Promise<SearchHotelDestinationsResponse> => {
  const { data } = await apiClient.get(
    API_ROUTES.hotels.searchHotelDestinations,
    { params: { query } }
  );

  return data;
};

export const getHotelSortBy = async (
  params: GetHotelSortByParams
): Promise<GetHotelSortByResponse> => {
  const { data } = await apiClient.get(API_ROUTES.hotels.getSortBy, {
    params,
  });

  return data;
};

export const getHotelFilter = async (
  params: GetHotelFilterParams
): Promise<GetHotelFilterResponse> => {
  const { data } = await apiClient.get(API_ROUTES.hotels.getFilter, {
    params,
  });

  return data;
};

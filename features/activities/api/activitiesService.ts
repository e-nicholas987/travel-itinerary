import { API_ROUTES } from "@/constants/apiRoutes";
import { apiClient } from "@/lib/apiClient";
import type {
  SearchAttractionsParams,
  SearchAttractionsResponse,
  SearchAttractionLocationResponse,
} from "../types";

export const searchAttractionLocations = async (
  query: string
): Promise<SearchAttractionLocationResponse> => {
  const { data } = await apiClient.get(
    API_ROUTES.attraction.searchAttractionLocation,
    { params: { query } }
  );

  return data;
};

export const searchAttractions = async (
  params: SearchAttractionsParams
): Promise<SearchAttractionsResponse> => {
  const { data } = await apiClient.get(
    API_ROUTES.attraction.searchAttractions,
    { params }
  );

  return data;
};

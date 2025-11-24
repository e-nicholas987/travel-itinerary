import { useQuery } from "@tanstack/react-query";
import { searchFlightDestinations } from "../api/flightServices";

export const useSearchFlightDestinations = (query: string) =>
  useQuery({
    queryKey: ["flights", "search-destinations", query],
    queryFn: () => searchFlightDestinations(query),
    enabled: !!query,
  });

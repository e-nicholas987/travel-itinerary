import { useQuery } from "@tanstack/react-query";

import type { SearchFlightsParams } from "../types";
import { searchFlights } from "../api/flightServices";

export const useSearchFlights = ({
  params,
  enabled,
}: {
  params: SearchFlightsParams;
  enabled: boolean;
}) =>
  useQuery({
    queryKey: ["flights", "search", params],
    queryFn: () => searchFlights(params),
    enabled,
  });



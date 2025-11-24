import { useQuery } from "@tanstack/react-query";

import { searchHotelDestinations } from "@/features/hotels/api/hotelsServices";

export const useSearchHotelDestinations = (query: string) =>
  useQuery({
    queryKey: ["hotels", "search-destinations", query],
    queryFn: () => searchHotelDestinations(query),
    enabled: !!query,
  });

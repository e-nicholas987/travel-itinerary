import { useQuery } from "@tanstack/react-query";

import type { SearchHotelsParams } from "@/features/hotels/types";
import { searchHotels } from "@/features/hotels/api/hotelsServices";

export const useSearchHotels = ({
  params,
  enabled,
}: {
  params: SearchHotelsParams;
  enabled: boolean;
}) =>
  useQuery({
    queryKey: ["hotels", "search", params],
    queryFn: () => searchHotels(params),
    enabled,
  });

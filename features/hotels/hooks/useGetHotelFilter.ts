import { useQuery } from "@tanstack/react-query";

import type { GetHotelFilterParams } from "@/features/hotels/types";
import { getHotelFilter } from "@/features/hotels/api/hotelsServices";

export const useGetHotelFilter = ({
  params,
  enabled,
}: {
  params: GetHotelFilterParams;
  enabled: boolean;
}) =>
  useQuery({
    queryKey: ["hotels", "filter", params],
    queryFn: () => getHotelFilter(params),
    enabled,
  });



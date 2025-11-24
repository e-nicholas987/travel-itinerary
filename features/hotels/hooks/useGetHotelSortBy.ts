import { useQuery } from "@tanstack/react-query";

import type { GetHotelSortByParams } from "@/features/hotels/types";
import { getHotelSortBy } from "@/features/hotels/api/hotelsServices";

export const useGetHotelSortBy = ({
  params,
  enabled,
}: {
  params: GetHotelSortByParams;
  enabled: boolean;
}) =>
  useQuery({
    queryKey: ["hotels", "sort-by", params],
    queryFn: () => getHotelSortBy(params),
    enabled,
  });



import { useQuery } from "@tanstack/react-query";

import { fetchLocations } from "@/services/metaServices";

export const useLocations = () =>
  useQuery({
    queryKey: ["meta", "locations"],
    queryFn: fetchLocations,
  });

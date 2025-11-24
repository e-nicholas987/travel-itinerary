"use client";

import { useMemo, useState } from "react";

import { SelectField } from "@/components/ui";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouteQueryParams } from "@/hooks/useRouteQueryParams";
import { useSearchHotelDestinations } from "../hooks/useSearchHotelDestinations";
import type { SelectOption } from "@/types/common";
import { SearchHotelDestinationsResponse } from "../types";

interface DestinationFieldProps {
  destionationResponse: SearchHotelDestinationsResponse | undefined;
}

export default function DestinationField() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { getParam, setParams } = useRouteQueryParams();
  const debouncedLocation = useDebounce(searchTerm, 500);

  const { data: destinations, isLoading: isLoadingDestinations } =
    useSearchHotelDestinations(debouncedLocation);

  const options: SelectOption[] = useMemo(
    () =>
      destinations?.data?.map((destination) => ({
        label: destination.name,
        value: destination.dest_id,
      })) ?? [],
    [destinations]
  );

  return (
    <div className="w-full md:flex-2">
      <SelectField
        id="activities-location"
        label="Where are you going?"
        placeholder="Search city, landmark, or attraction"
        isRequired
        enableSearch
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        options={options}
        value={getParam("id")}
        onChange={(value) => setParams({ dest_id: value })}
        isLoading={isLoadingDestinations}
        emptyStateText={
          !searchTerm ? "Please enter a location" : "No locations found."
        }
      />
    </div>
  );
}

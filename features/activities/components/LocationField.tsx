"use client";

import { useMemo, useState } from "react";

import { SelectField } from "@/components/ui";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouteQueryParams } from "@/hooks/useRouteQueryParams";
import { useSearchAttractionLocation } from "../hooks/useSearchAttractionLocation";
import type { SelectOption } from "@/types/common";

export default function LocationField() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const { setParams } = useRouteQueryParams();
  const debouncedLocation = useDebounce(searchTerm, 500);

  const { data: locations, isLoading: isLoadingLocations } =
    useSearchAttractionLocation(debouncedLocation);

  const destinations = useMemo(
    () => locations?.data?.destinations ?? [],
    [locations]
  );

  const options: SelectOption[] = useMemo(
    () =>
      destinations.map((destination) => ({
        label: `${destination.cityName}, ${destination.country}`,
        value: destination.id,
      })),
    [destinations]
  );

  const handleSelectLocation = (value: string) => {
    const destination = destinations.find((d) => d.id === value);
    if (!destination) return;

    setSelectedId(value);
    setParams({
      locationId: destination.id,
    });
  };

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
        value={selectedId}
        onChange={handleSelectLocation}
        isLoading={isLoadingLocations}
        emptyStateText={
          !searchTerm ? "Please enter a location" : "No locations found."
        }
      />
    </div>
  );
}

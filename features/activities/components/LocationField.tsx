 "use client";

import { useMemo, useState } from "react";
import { SelectField } from "@/components/ui";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchAttractionLocation } from "../hooks/useSearchAttractionLocation";
import type { SelectOption } from "@/types/common";

type LocationFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function LocationField({ value, onChange }: LocationFieldProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedLocation = useDebounce(searchTerm, 500);

  const { data: locations, isLoading: isLoadingLocations } =
    useSearchAttractionLocation(debouncedLocation);

  const options: SelectOption[] = useMemo(
    () =>
      locations?.data?.destinations?.map((destination) => ({
        label: `${destination.cityName}, ${destination.country}`,
        value: destination.id,
      })) ?? [],
    [locations]
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
        value={value}
        onChange={onChange}
        isLoading={isLoadingLocations}
        emptyStateText={
          !searchTerm ? "Please enter a location" : "No locations found."
        }
      />
    </div>
  );
}

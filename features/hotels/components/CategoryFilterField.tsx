import { useMemo } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import { SelectField } from "@/components/ui";
import type { HotelFilterAndSortParams } from "@/features/hotels/types";
import { useGetHotelSortBy } from "../hooks/useGetHotelSortBy";
import type { HotelsSearchFormValues } from "../validation/hotelsSearchSchema";

export default function CategoryFilterField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<HotelsSearchFormValues>();

  const [
    destId,
    searchType,
    arrivalDate,
    departureDate,
    adults,
    childrenAge,
    roomQty,
  ] = useWatch({
    control,
    name: [
      "dest_id",
      "search_type",
      "arrival_date",
      "departure_date",
      "adults",
      "children_age",
      "room_qty",
    ],
  });

  const sortByParams: HotelFilterAndSortParams = {
    dest_id: destId,
    search_type: searchType,
    arrival_date: arrivalDate,
    departure_date: departureDate,
    adults: adults ? Number(adults) : undefined,
    children_age: childrenAge,
    room_qty: roomQty ? Number(roomQty) : undefined,
  };

  const sortByEnabled =
    !!destId && !!searchType && !!arrivalDate && !!departureDate;

  const { data: sortByOptions, isLoading: isLoadingSortBy } = useGetHotelSortBy(
    {
      params: sortByParams,
      enabled: sortByEnabled,
    }
  );

  const categoryFilterOptions = useMemo(
    () =>
      sortByOptions?.data?.map((option) => ({
        label: option.title,
        value: option.id,
      })) ?? [],
    [sortByOptions]
  );

  return (
    <Controller
      name="categories_filter"
      control={control}
      render={({ field }) => (
        <SelectField
          id="hotels-categories-filter"
          label="Category filter"
          placeholder="Select category"
          value={field.value}
          onChange={field.onChange}
          options={categoryFilterOptions}
          isLoading={isLoadingSortBy}
          error={errors.categories_filter?.message}
          emptyStateText={
            !sortByEnabled
              ? "Please select a destination, search type, and dates to see options"
              : "No categories found."
          }
        />
      )}
    />
  );
}

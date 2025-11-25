"use client";

import { useMemo, useState } from "react";

import { Button, InputField, SelectField } from "@/components/ui";
import FormSection from "@/components/shared/FormSection";
import { useCurrencies, useLanguages } from "@/queries";
import type { SearchHotelsParams } from "@/features/hotels/types";
import { useSearchHotelDestinations } from "../hooks/useSearchHotelDestinations";
import { useDebounce } from "@/hooks";
import {
  HotelsSearchFormValues,
  hotelsSearchSchema,
} from "../validation/hotelsSearchSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { capitalizeFirstLetter } from "@/lib/utils/stringHelper";
import {
  HOTELS_TEMPERATURE_UNIT_OPTIONS,
  HOTELS_UNIT_OPTIONS,
} from "../constants/selectOptions";

type HotelsSearchFormProps = {
  onSearch: (params: SearchHotelsParams) => void;
  isLoadingHotels: boolean;
};

export default function HotelsSearchForm({
  onSearch,
  isLoadingHotels,
}: HotelsSearchFormProps) {
  const [destinationSearchTerm, setDestinationSearchTerm] =
    useState<string>("");
  const debouncedDestinationSearchTerm = useDebounce(
    destinationSearchTerm,
    500
  );
  const { data: languages, isLoading: isLoadingLanguages } = useLanguages();
  const { data: currencies, isLoading: isLoadingCurrencies } = useCurrencies();
  const { data: destinations, isLoading: isLoadingDestinations } =
    useSearchHotelDestinations(debouncedDestinationSearchTerm);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<HotelsSearchFormValues>({
    resolver: zodResolver(hotelsSearchSchema),
    defaultValues: {
      dest_id: "",
      search_type: "",
      arrival_date: "",
      departure_date: "",
      children_age: "",
      adults: "",
      room_qty: "",
      categories_filter: "",
      languagecode: "",
      currency_code: "",
      units: "metric",
      temperature_unit: "c",
      location: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    const params: SearchHotelsParams = {
      dest_id: Number(values.dest_id),
      search_type: values.search_type,
      arrival_date: values.arrival_date,
      departure_date: values.departure_date,
      adults: values.adults ? Number(values.adults) : undefined,
      children_age: values.children_age,
      room_qty: values.room_qty ? Number(values.room_qty) : undefined,
      categories_filter: values.categories_filter,
      languagecode: values.languagecode,
      currency_code: values.currency_code,
      units: (values.units as "metric" | "imperial") || "metric",
      temperature_unit: (values.temperature_unit as "c" | "f") || "c",
      location: values.location,
    };
    onSearch(params);
  });

  const handleReset = () => {
    reset({
      dest_id: "",
      search_type: "",
      arrival_date: "",
      departure_date: "",
      children_age: "",
      adults: "",
      room_qty: "",
      categories_filter: "",
      languagecode: "",
      currency_code: "",
      units: "metric",
      temperature_unit: "c",
      location: "",
    });
    setDestinationSearchTerm("");
  };

  const destinationOptions = useMemo(() => {
    return (
      destinations?.data?.map((destination) => ({
        label: destination.name,
        value: destination.dest_id,
      })) ?? []
    );
  }, [destinations]);

  const languageOptions = useMemo(
    () =>
      languages?.data
        ? languages.data.map((language) => ({
            label: language.name,
            value: language.code,
          }))
        : [],
    [languages]
  );

  const currencyOptions = useMemo(
    () =>
      currencies?.data
        ? currencies.data.map((currency) => ({
            label: `${currency.name} (${currency.code})`,
            value: currency.code,
          }))
        : [],
    [currencies]
  );

  const searchTypeOptions = useMemo(() => {
    const seen = new Set<string>();
    const options: { label: string; value: string }[] = [];

    destinations?.data?.forEach((destination) => {
      const type = destination.search_type;
      if (type && !seen.has(type)) {
        seen.add(type);
        options.push({ label: capitalizeFirstLetter(type), value: type });
      }
    });

    return options;
  }, [destinations]);

  return (
    <form
      onSubmit={onSubmit}
      className="mb-8 rounded-sm bg-white sm:bg-neutral-300 sm:p-5 lg:p-6"
    >
      <div className="sm:space-y-6">
        <FormSection
          title="Destination & dates"
          description="Choose where you're going and when you'd like to stay."
        >
          <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <Controller
              name="dest_id"
              control={control}
              render={({ field }) => (
                <SelectField
                  id="hotels-destination"
                  label="Where are you going?"
                  isRequired
                  placeholder="Search city, landmark, or attraction"
                  value={field.value}
                  onChange={field.onChange}
                  options={destinationOptions}
                  enableSearch
                  searchValue={destinationSearchTerm}
                  onSearchChange={setDestinationSearchTerm}
                  isLoading={isLoadingDestinations}
                  error={errors.dest_id?.message}
                  emptyStateText={
                    !destinationSearchTerm
                      ? "Please enter a destination"
                      : "No destinations found."
                  }
                  containerClassName="w-full"
                />
              )}
            />

            <Controller
              name="search_type"
              control={control}
              render={({ field }) => (
                <SelectField
                  id="hotels-search-type"
                  label="Search type"
                  isRequired
                  placeholder="Select search type"
                  value={field.value}
                  containerClassName="w-full"
                  onChange={field.onChange}
                  options={searchTypeOptions}
                  error={errors.search_type?.message}
                />
              )}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InputField
              id="hotels-arrival-date"
              label="Check-in"
              type="date"
              placeholder="dd/mm/yyyy"
              {...register("arrival_date")}
              isRequired
              error={errors.arrival_date?.message}
            />
            <InputField
              id="hotels-departure-date"
              label="Check-out"
              type="date"
              placeholder="dd/mm/yyyy"
              {...register("departure_date")}
              isRequired
              error={errors.departure_date?.message}
            />
          </div>
        </FormSection>

        <FormSection
          title="Guests & rooms"
          description="Tell us who's travelling so we can match the right stay."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <InputField
              id="hotels-adults"
              label="Adults"
              type="number"
              inputMode="tel"
              min={1}
              placeholder="Number of adults"
              {...register("adults")}
              error={errors.adults?.message}
            />

            <InputField
              id="hotels-children-age"
              label="Children ages"
              type="number"
              inputMode="tel"
              placeholder="e.g. 0-17"
              {...register("children_age")}
              error={errors.children_age?.message}
            />

            <InputField
              id="hotels-room-qty"
              label="Rooms"
              type="number"
              inputMode="tel"
              min={1}
              placeholder="Number of rooms"
              {...register("room_qty")}
              error={errors.room_qty?.message}
            />
          </div>
        </FormSection>

        <FormSection
          title="Preferences & filters"
          description="Optional settings to tailor results to your needs."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <Controller
              name="currency_code"
              control={control}
              render={({ field }) => (
                <SelectField
                  id="hotels-currency"
                  label="Currency"
                  placeholder="Select currency"
                  value={field.value}
                  onChange={field.onChange}
                  options={currencyOptions}
                  isLoading={isLoadingCurrencies}
                  error={errors.currency_code?.message}
                />
              )}
            />

            <Controller
              name="languagecode"
              control={control}
              render={({ field }) => (
                <SelectField
                  id="hotels-language"
                  label="Language"
                  placeholder="Select language"
                  value={field.value}
                  onChange={field.onChange}
                  options={languageOptions}
                  isLoading={isLoadingLanguages}
                  error={errors.languagecode?.message}
                />
              )}
            />

            <InputField
              id="hotels-location"
              label="Location (country code)"
              placeholder="e.g. US"
              {...register("location")}
              error={errors.location?.message}
            />
          </div>

          <div className="grid gap-4 border-t border-neutral-500/40 pt-4 md:grid-cols-3">
            <Controller
              name="units"
              control={control}
              render={({ field }) => (
                <SelectField
                  id="hotels-units"
                  label="Units"
                  placeholder="Select units"
                  value={field.value}
                  onChange={field.onChange}
                  options={HOTELS_UNIT_OPTIONS}
                  error={errors.units?.message}
                />
              )}
            />

            <Controller
              name="temperature_unit"
              control={control}
              render={({ field }) => (
                <SelectField
                  id="hotels-temperature-unit"
                  label="Temperature unit"
                  placeholder="Select temperature unit"
                  value={field.value}
                  onChange={field.onChange}
                  options={HOTELS_TEMPERATURE_UNIT_OPTIONS}
                  error={errors.temperature_unit?.message}
                />
              )}
            />

            <InputField
              id="hotels-categories-filter"
              label="Category filter"
              placeholder="Optional filter tag"
              {...register("categories_filter")}
              error={errors.categories_filter?.message}
            />
          </div>
        </FormSection>
      </div>

      <div className="mt-4 flex items-center justify-end gap-3 border-t border-neutral-500/40 pt-4">
        <Button
          type="reset"
          variant="tertiary"
          size="md"
          onClick={handleReset}
          className="w-full sm:w-auto"
        >
          Reset
        </Button>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoadingHotels}
          className="w-full sm:w-auto"
        >
          Search hotels
        </Button>
      </div>
    </form>
  );
}

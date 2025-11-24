import type React from "react";
import { useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";

import { Button, InputField, SelectField } from "@/components/ui";
import { CaretUpDownIcon } from "@/components/ui/icons";
import CurrencyField from "@/components/shared/CurrencyField";
import { useDebounce } from "@/hooks/useDebounce";
import { useLanguages } from "@/queries";
import type { SelectOption } from "@/types/common";

import AdvancedFilters from "./AdvancedFilters";
import {
  activitiesSearchSchema,
  type ActivitiesSearchFormValues,
} from "../validation/activitiesSearchSchema";
import { useSearchAttractionLocation } from "../hooks/useSearchAttractionLocation";
import type {
  SearchAttractionsParams,
  SearchAttractionsResponse,
  SortBy,
} from "../types";
import { ACTIVITIES_SORT_OPTIONS } from "../constants/selectOptions";

type ActivitiesSearchFormProps = {
  onSearch: (params: SearchAttractionsParams) => void;
  isLoadingLocations: boolean;
  locations?: SearchAttractionsResponse;
};

const defaultValues: ActivitiesSearchFormValues = {
  id: "",
  startDate: "",
  endDate: "",
  sortBy: "",
  currency_code: "",
  languagecode: "",
  typeFilters: [],
  priceFilters: [],
  ufiFilters: [],
  labelFilters: [],
};

export default function ActivitiesSearchForm({
  onSearch,
  isLoadingLocations,
  locations,
}: ActivitiesSearchFormProps) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(true);
  const [locationSearch, setLocationSearch] = useState<string>("");

  const { data: languages, isLoading: isLoadingLanguages } = useLanguages();

  const form = useForm<ActivitiesSearchFormValues>({
    resolver: zodResolver(activitiesSearchSchema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = form;

  const debouncedLocation = useDebounce(locationSearch, 500);

  const { data: locationResults, isLoading: isLoadingLocationsSearch } =
    useSearchAttractionLocation(debouncedLocation);

  const locationOptions: SelectOption[] = useMemo(
    () =>
      locationResults?.data?.destinations?.map((destination) => ({
        label: `${destination.cityName}, ${destination.country}`,
        value: destination.id,
      })) ?? [],
    [locationResults]
  );

  const onSubmit = handleSubmit((values) => {
    const params: SearchAttractionsParams = {
      id: values.id,
      startDate: values.startDate || undefined,
      endDate: values.endDate || undefined,
      sortBy: (values.sortBy || undefined) as SortBy | undefined,
      currency_code: values.currency_code || undefined,
      languagecode: values.languagecode || undefined,
      typeFilters: values.typeFilters.length
        ? values.typeFilters.join(",")
        : undefined,
      priceFilters: values.priceFilters.length
        ? values.priceFilters.join(",")
        : undefined,
      ufiFilters: values.ufiFilters.length
        ? values.ufiFilters.join(",")
        : undefined,
      labelFilters: values.labelFilters.length
        ? values.labelFilters.join(",")
        : undefined,
    };

    onSearch(params);
  });

  const clearAdvancedFilters = () => {
    form.setValue("typeFilters", []);
    form.setValue("priceFilters", []);
    form.setValue("ufiFilters", []);
    form.setValue("labelFilters", []);
    setShowAdvancedFilters(false);
  };

  const handleReset = () => {
    reset(defaultValues);
    setShowAdvancedFilters(true);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit}
        className="mb-8 rounded-sm bg-white sm:bg-neutral-300 sm:p-5 lg:p-6"
      >
        <div className="sm:space-y-6">
          <section className="space-y-4 rounded-sm bg-white p-4 sm:p-5">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-sm font-semibold text-black-primary">
                Location & dates
              </h3>
              <p className="text-xs font-medium text-black-secondary">
                Search for attractions in a city and when you&apos;d like to
                visit.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <Controller
                name="id"
                control={control}
                render={({ field }) => (
                  <SelectField
                    id="activities-location"
                    label="Where are you going?"
                    placeholder="Search city, landmark, or attraction"
                    isRequired
                    value={field.value}
                    onChange={field.onChange}
                    options={locationOptions}
                    enableSearch
                    searchValue={locationSearch}
                    onSearchChange={setLocationSearch}
                    isLoading={isLoadingLocationsSearch}
                    emptyStateText={
                      !locationSearch
                        ? "Please enter a location"
                        : "No locations found."
                    }
                    error={errors.id?.message}
                    containerClassName="w-full"
                  />
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <InputField
                  id="activities-start-date"
                  label="Start date"
                  containerClassName="h-full"
                  type="date"
                  {...register("startDate")}
                  error={errors.startDate?.message}
                />
                <InputField
                  id="activities-end-date"
                  label="End date"
                  containerClassName="h-full"
                  type="date"
                  {...register("endDate")}
                  error={errors.endDate?.message}
                />
              </div>
            </div>
          </section>

          <section className="space-y-4 rounded-sm bg-white p-4 sm:p-5">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-sm font-semibold text-black-primary">
                Sorting & language
              </h3>
              <p className="text-xs font-medium text-black-secondary">
                Control how results are ordered and which language/prices you
                see.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Controller
                name="sortBy"
                control={control}
                render={({ field }) => (
                  <SelectField
                    id="activities-sort-by"
                    label="Sort by"
                    placeholder="Select sort by"
                    value={field.value}
                    onChange={field.onChange}
                    options={ACTIVITIES_SORT_OPTIONS}
                    containerClassName="w-full"
                  />
                )}
              />

              <Controller
                name="currency_code"
                control={control}
                render={({ field }) => (
                  <CurrencyField
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

              <Controller
                name="languagecode"
                control={control}
                render={({ field }) => (
                  <SelectField
                    id="activities-language"
                    label="Language"
                    value={field.value}
                    placeholder="Select language"
                    onChange={field.onChange}
                    options={
                      languages?.data
                        ? languages.data.map((language) => ({
                            label: language.name,
                            value: language.code,
                          }))
                        : []
                    }
                    isLoading={isLoadingLanguages}
                  />
                )}
              />
            </div>
          </section>

          {locations?.data && (
            <div className="space-y-4 rounded-sm bg-white p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black-secondary"
                  onClick={() => setShowAdvancedFilters((prev) => !prev)}
                  aria-expanded={showAdvancedFilters}
                  aria-controls="activities-advanced-filters"
                >
                  <CaretUpDownIcon className="size-4" />
                  Advanced filters
                </button>
              </div>

              {showAdvancedFilters && <AdvancedFilters response={locations} />}
            </div>
          )}
        </div>
        <div className="mt-4 flex items-center justify-end gap-3 border-t border-neutral-500/40 pt-4">
          <Button
            type="button"
            variant="tertiary"
            size="md"
            onClick={() => {
              clearAdvancedFilters();
              handleReset();
            }}
            className="hover:underline"
          >
            Reset
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isLoadingLocations}
          >
            Search activities
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

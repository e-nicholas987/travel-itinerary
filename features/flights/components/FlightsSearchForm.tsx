"use client";

import { useMemo, useState } from "react";

import CurrencyField from "@/components/shared/CurrencyField";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import FormSection from "@/components/shared/FormSection";
import { Button, InputField, SelectField } from "@/components/ui";
import { FormProvider } from "react-hook-form";
import { useDebounce } from "@/hooks/useDebounce";
import type { SelectOption } from "@/types/common";

import type { SearchFlightsParams } from "../types";
import { useSearchFlightDestinations } from "../hooks/useSearchFlightDestinations";
import {
  FLIGHTS_CABIN_CLASS_OPTIONS,
  FLIGHTS_SORT_OPTIONS,
  FLIGHTS_STOPS_OPTIONS,
} from "../constants/selectOptions";
import {
  flightsSearchSchema,
  type FlightsSearchFormValues,
} from "../validation/flightsSearchSchema";

type FlightsSearchFormProps = {
  onSearch: (params: SearchFlightsParams) => void;
  isLoadingFlights: boolean;
};

const defaultValues: FlightsSearchFormValues = {
  fromId: "",
  toId: "",
  departDate: "",
  returnDate: "",
  adults: "",
  children: "",
  cabinClass: "",
  sort: "",
  stops: "",
  currency_code: "",
};

export default function FlightsSearchForm({
  onSearch,
  isLoadingFlights,
}: FlightsSearchFormProps) {
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");

  const debouncedFromQuery = useDebounce(fromQuery, 500);
  const debouncedToQuery = useDebounce(toQuery, 500);

  const { data: fromResults, isLoading: isLoadingFrom } =
    useSearchFlightDestinations(debouncedFromQuery);
  const { data: toResults, isLoading: isLoadingTo } =
    useSearchFlightDestinations(debouncedToQuery);

  const form = useForm<FlightsSearchFormValues>({
    resolver: zodResolver(flightsSearchSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = form;

  const fromOptions: SelectOption[] = useMemo(
    () =>
      fromResults?.data?.map((item) => ({
        label: `${item.name} (${item.code})`,
        value: item.id,
      })) ?? [],
    [fromResults]
  );

  const toOptions: SelectOption[] = useMemo(
    () =>
      toResults?.data?.map((item) => ({
        label: `${item.name} (${item.code})`,
        value: item.id,
      })) ?? [],
    [toResults]
  );

  const onSubmit = handleSubmit((values) => {
    const params: SearchFlightsParams = {
      fromId: values.fromId,
      toId: values.toId,
      departDate: values.departDate,
      returnDate: values.returnDate || undefined,
      adults: values.adults ? Number(values.adults) : undefined,
      children: values.children || undefined,
      sort: (values.sort || undefined) as SearchFlightsParams["sort"],
      cabinClass: (values.cabinClass ||
        undefined) as SearchFlightsParams["cabinClass"],
      stops: (values.stops || undefined) as SearchFlightsParams["stops"],
      currency_code: values.currency_code || undefined,
    };

    onSearch(params);
  });

  const handleReset = () => {
    reset(defaultValues);
    setFromQuery("");
    setToQuery("");
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit}
        className="mb-8 rounded-sm bg-white sm:bg-neutral-300 sm:p-5 lg:p-6"
      >
        <div className="sm:space-y-6">
          <FormSection
            title="Route & dates"
            description="Pick your departure, arrival and travel dates."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Controller
                name="fromId"
                control={control}
                render={({ field }) => (
                  <SelectField
                    id="flights-from"
                    label="From"
                    isRequired
                    placeholder="Departure airport or city"
                    value={field.value}
                    onChange={field.onChange}
                    ref={field.ref}
                    options={fromOptions}
                    enableSearch
                    searchValue={fromQuery}
                    onSearchChange={setFromQuery}
                    isLoading={isLoadingFrom}
                    error={errors.fromId?.message}
                    emptyStateText={
                      !fromQuery
                        ? "Please enter a departure airport or city"
                        : "No departure airports or cities found."
                    }
                    containerClassName="w-full"
                  />
                )}
              />

              <Controller
                name="toId"
                control={control}
                render={({ field }) => (
                  <SelectField
                    id="flights-to"
                    label="To"
                    isRequired
                    placeholder="Arrival airport or city"
                    ref={field.ref}
                    value={field.value}
                    onChange={field.onChange}
                    options={toOptions}
                    enableSearch
                    searchValue={toQuery}
                    onSearchChange={setToQuery}
                    isLoading={isLoadingTo}
                    error={errors.toId?.message}
                    emptyStateText={
                      !toQuery
                        ? "Please enter an arrival airport or city"
                        : "No arrival airports or cities found."
                    }
                    containerClassName="w-full"
                  />
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <InputField
                id="flights-depart-date"
                label="Departure date"
                type="date"
                placeholder="dd/mm/yyyy"
                isRequired
                {...form.register("departDate")}
                error={errors.departDate?.message}
              />
              <InputField
                id="flights-return-date"
                label="Return date"
                type="date"
                placeholder="dd/mm/yyyy"
                {...form.register("returnDate")}
                error={errors.returnDate?.message}
              />
            </div>
          </FormSection>

          <FormSection
            title="Passengers & cabin"
            description="Tell us who's flying and which cabin you prefer."
          >
            <div className="grid gap-4 md:grid-cols-3">
              <InputField
                id="flights-adults"
                label="Adults"
                type="number"
                inputMode="tel"
                min={1}
                placeholder="Number of adults"
                {...form.register("adults")}
                error={errors.adults?.message}
              />
              <InputField
                id="flights-children"
                label="Children"
                type="number"
                inputMode="tel"
                placeholder="e.g. 0-17"
                {...form.register("children")}
                error={errors.children?.message}
              />
              <Controller
                name="cabinClass"
                control={control}
                render={({ field }) => (
                  <SelectField
                    id="flights-cabin-class"
                    label="Cabin class"
                    placeholder="Any cabin"
                    value={field.value}
                    onChange={field.onChange}
                    options={FLIGHTS_CABIN_CLASS_OPTIONS}
                    error={errors.cabinClass?.message}
                    containerClassName="w-full"
                  />
                )}
              />
            </div>
          </FormSection>

          <FormSection
            title="Sorting & filters"
            description="Optional settings to fine-tune your search results."
          >
            <div className="grid gap-4 md:grid-cols-3 border-t border-neutral-500/40 pt-4 md:pt-4">
              <Controller
                name="sort"
                control={control}
                render={({ field }) => (
                  <SelectField
                    id="flights-sort"
                    label="Sort by"
                    placeholder="Best"
                    value={field.value}
                    onChange={field.onChange}
                    options={FLIGHTS_SORT_OPTIONS}
                    error={errors.sort?.message}
                    containerClassName="w-full"
                  />
                )}
              />
              <Controller
                name="stops"
                control={control}
                render={({ field }) => (
                  <SelectField
                    id="flights-stops"
                    label="Stops"
                    placeholder="No preference"
                    value={field.value}
                    onChange={field.onChange}
                    options={FLIGHTS_STOPS_OPTIONS}
                    error={errors.stops?.message}
                    containerClassName="w-full"
                  />
                )}
              />
              <Controller
                name="currency_code"
                control={control}
                render={({ field }) => (
                  <CurrencyField
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                )}
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
            isLoading={isLoadingFlights}
            className="w-full sm:w-auto"
          >
            Search flights
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

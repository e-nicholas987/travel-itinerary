"use client";

import { useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button, InputField, SelectField } from "@/components/ui";
import { Form } from "@/components/ui/form";
import { useDebounce } from "@/hooks/useDebounce";
import type { SelectOption } from "@/types/common";

import type { SearchFlightsParams } from "../types";
import { useSearchFlightDestinations } from "../hooks/useSearchFlightDestinations";
import {
  flightsSearchSchema,
  type FlightsSearchFormValues,
} from "../validation/flightsSearchSchema";
import CurrencyField from "@/components/shared/CurrencyField";
import {
  FLIGHTS_CABIN_CLASS_OPTIONS,
  FLIGHTS_SORT_OPTIONS,
  FLIGHTS_STOPS_OPTIONS,
} from "../constants/selectOptions";

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
  sort: "BEST",
  stops: "none",
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
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="mb-8 space-y-5 rounded-sm bg-neutral-300 p-5"
      >
        <div className="flex flex-col gap-4 md:flex-row">
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
                options={fromOptions}
                enableSearch
                searchValue={fromQuery}
                onSearchChange={setFromQuery}
                isLoading={isLoadingFrom}
                error={errors.fromId?.message}
                containerClassName="w-full md:flex-1"
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
                value={field.value}
                onChange={field.onChange}
                options={toOptions}
                enableSearch
                searchValue={toQuery}
                onSearchChange={setToQuery}
                isLoading={isLoadingTo}
                error={errors.toId?.message}
                containerClassName="w-full md:flex-1"
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <InputField
            id="flights-depart-date"
            label="Departure date"
            type="date"
            isRequired
            {...form.register("departDate")}
            error={errors.departDate?.message}
          />
          <InputField
            id="flights-return-date"
            label="Return date"
            type="date"
            {...form.register("returnDate")}
            error={errors.returnDate?.message}
          />
        </div>

        <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
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
            placeholder="e.g. 0,5,12"
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

        <div className="flex flex-col gap-4 border-t border-neutral-500/40 pt-4 md:grid md:grid-cols-3">
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

        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="tertiary"
            size="md"
            onClick={handleReset}
            className="hover:underline"
          >
            Reset
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isLoadingFlights}
          >
            Search flights
          </Button>
        </div>
      </form>
    </Form>
  );
}

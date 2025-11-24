"use client";

import { useState } from "react";
import Link from "next/link";

import { Button, InputField, SelectField } from "@/components/ui";

import {
  ArrowLeftIcon,
  CaretUpDownIcon,
  ListChecksIcon,
} from "@/components/ui/icons";
import { ROUTES } from "@/constants/routes";
import type { SortBy } from "@/features/activities/types";

import LocationField from "./LocationField";
import { useRouteQueryParams } from "@/hooks";
import CurrencyField from "@/components/shared/CurrencyField";
import { useLanguages } from "@/queries";
import { useSearchAttractions } from "../hooks/useSearchAttractions";
import AdvancedFilters from "./AdvancedFilters";
import ActivitiesCard from "./ActivitiesCard";
import { SORT_OPTIONS } from "../constants/selectOptions";

export default function ActivitiesSearchPage() {
  const { setParams, getParam, getAllParams, clearAllParams } =
    useRouteQueryParams();
  const { data: languages, isLoading: isLoadingLanguages } = useLanguages();
  const { data: locations, isLoading: isLoadingLocations } =
    useSearchAttractions({
      params: {
        id: getParam("locationId") || "",
        startDate: getParam("startDate") || "",
        endDate: getParam("endDate") || "",
        sortBy: getParam<SortBy>("sortBy"),
        currency_code: getParam("currencyCode"),
        languagecode: getParam("languagecode"),
        typeFilters: getAllParams("type").join(","),
        priceFilters: getAllParams("price").join(","),
        ufiFilters: getAllParams("ufi").join(","),
        labelFilters: getAllParams("label").join(","),
      },
      enabled: Boolean(getParam("locationId")),
    });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(true);

  const clearAdvancedFilters = () => {
    clearAllParams();
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  return (
    <section className="flex-1 rounded-sm bg-white p-8">
      <header className="mb-8 flex flex-col gap-4 border-b border-neutral-300 pb-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            href={ROUTES.PLAN_TRIP}
            className="inline-flex items-center gap-2 text-sm font-medium text-black-secondary transition-colors hover:text-primary-600"
          >
            <ArrowLeftIcon className="size-5" />
            Back to trip itineraries
          </Link>
        </div>

        <h1 className="flex items-center gap-2 text-xl font-semibold leading-7 tracking-[-0.02em] md:text-2xl">
          <ListChecksIcon className="size-6 text-primary-600" />
          Search activities
        </h1>
        <p className="mt-1 text-sm font-medium text-black-secondary">
          Find tours and attractions for your trip and add them to your
          itinerary.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mb-8 space-y-5 rounded-sm bg-neutral-300 p-5"
      >
        <div className="flex flex-col gap-4 md:flex-row">
          <LocationField />

          <div className="flex flex-1 gap-4">
            <InputField
              id="activities-start-date"
              label="Start date"
              type="date"
              value={getParam("startDate")}
              onChange={(event) => setParams({ startDate: event.target.value })}
            />
            <InputField
              id="activities-end-date"
              label="End date"
              type="date"
              value={getParam("endDate")}
              onChange={(event) => setParams({ endDate: event.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <SelectField
            id="activities-sort-by"
            label="Sort by"
            placeholder="Select sort by"
            value={getParam("sortBy")}
            onChange={(value) => setParams({ sortBy: value })}
            options={SORT_OPTIONS}
            containerClassName="md:flex-[2]"
          />

          <div className="flex flex-1 gap-4">
            <CurrencyField />

            <SelectField
              id="activities-language"
              label="Language"
              value={getParam("languageCode")}
              placeholder="Select language"
              onChange={(value) => setParams({ languageCode: value })}
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
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-neutral-500/40 pt-4">
          {locations?.data && (
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
          )}

          <div className="flex gap-3 ml-auto">
            <Button
              type="button"
              variant="tertiary"
              size="md"
              onClick={clearAdvancedFilters}
              className="hover:bg-neutral-300/80"
            >
              Reset
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoadingLocations}
              disabled={!getParam("locationId")}
            >
              Search activities
            </Button>
          </div>
        </div>

        {showAdvancedFilters && <AdvancedFilters response={locations} />}
      </form>

      {locations?.data && (
        <section className="space-y-4">
          <header className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
            <div>
              <h2 className="text-base font-semibold leading-6 tracking-[-0.02em]">
                Available activities
              </h2>
              <p className="text-xs font-medium text-black-secondary">
                Showing {locations.data.products.length} experiences
              </p>
            </div>
          </header>

          <div className="space-y-3">
            {locations.data.products.map((item) => (
              <ActivitiesCard key={item.id} activity={item} isSearchResult />
            ))}
          </div>
        </section>
      )}
    </section>
  );
}

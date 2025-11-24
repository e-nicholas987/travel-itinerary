"use client";

import { useState } from "react";
import Link from "next/link";

import { ArrowLeftIcon, ListChecksIcon } from "@/components/ui/icons";
import { ROUTES } from "@/constants/routes";
import type { SearchAttractionsParams } from "@/features/activities/types";
import { useSearchAttractions } from "../hooks/useSearchAttractions";
import ActivitiesCard from "./ActivitiesCard";
import AddActivitiesForm from "./AddActivitiesForm";
import { getApiError } from "@/lib/utils/getApiError";
import ErrorBanner from "@/components/shared/ErrorBanner";

export default function ActivitiesSearchPage() {
  const [searchParams, setSearchParams] =
    useState<SearchAttractionsParams | null>(null);
  const {
    data: locations,
    isLoading: isLoadingLocations,
    error: searchAttractionsError,
  } = useSearchAttractions({
    params: searchParams ?? {
      id: "",
    },
    enabled: !!searchParams,
  });

  const handleSearch = (params: SearchAttractionsParams) => {
    setSearchParams(params);
  };

  const errorMessage =
    searchAttractionsError && getApiError(searchAttractionsError);

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

      {errorMessage && <ErrorBanner message={errorMessage} />}

      <AddActivitiesForm
        onSearch={handleSearch}
        isLoadingLocations={isLoadingLocations}
        locations={locations}
      />

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

          {locations.data.products.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-neutral-300 bg-neutral-100 px-6 py-10 text-center">
              <p className="text-sm font-semibold text-black-primary">
                No activities found for your current filters.
              </p>
              <p className="mt-1 text-xs font-medium text-black-secondary">
                Try adjusting your dates, location, or filters to see more
                options.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {locations.data.products.map((item) => (
                <ActivitiesCard key={item.id} activity={item} isSearchResult />
              ))}
            </div>
          )}
        </section>
      )}
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";

import { ListChecksIcon } from "@/components/ui/icons";
import { ROUTES } from "@/constants/routes";
import type { SearchAttractionsParams } from "@/features/activities/types";
import { useSearchAttractions } from "../hooks/useSearchAttractions";
import ErrorBanner from "@/components/shared/ErrorBanner";
import PageHeaderWithBack from "@/components/shared/PageHeader";
import ResultsHeader from "@/components/shared/ResultsHeader";
import ActivitiesCard from "./ActivitiesCard";
import ActivitiesSearchForm from "./ActivitiesSearchForm";
import { getApiError } from "@/lib/utils/getApiError";

export default function ActivitiesSearchPage() {
  const [searchParams, setSearchParams] =
    useState<SearchAttractionsParams | null>(null);
  const {
    data: locations,
    isFetching: isFetchingLocations,
    error: searchAttractionsError,
    refetch,
  } = useSearchAttractions({
    params: searchParams ?? {
      id: "",
    },
    enabled: !!searchParams,
  });

  const handleSearch = (params: SearchAttractionsParams) => {
    setSearchParams(params);
    if (JSON.stringify(params) === JSON.stringify(searchParams)) refetch();
  };

  const errorMessage = useMemo(() => {
    if (locations?.message.includes("error")) {
      return locations?.message;
    }
    return searchAttractionsError && getApiError(searchAttractionsError);
  }, [locations?.message, searchAttractionsError]);

  return (
    <section className="flex-1 rounded-sm bg-white p-8">
      <PageHeaderWithBack
        backHref={ROUTES.PLAN_TRIP}
        backLabel="Back to trip itineraries"
        title="Search activities"
        description="Find tours and attractions for your trip and add them to your itinerary."
        icon={ListChecksIcon}
      />

      {errorMessage && <ErrorBanner message={errorMessage} />}

      <ActivitiesSearchForm
        onSearch={handleSearch}
        isLoadingLocations={isFetchingLocations}
        locations={locations}
      />

      {locations?.data && (
        <section className="space-y-4">
          <ResultsHeader
            title="Available activities"
            count={locations.data.products.length}
            label="experiences"
          />

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

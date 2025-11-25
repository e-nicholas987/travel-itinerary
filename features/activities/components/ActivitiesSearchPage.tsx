"use client";

import { useMemo, useState } from "react";

import { ListChecksIcon } from "@/components/ui/icons";
import { ROUTES } from "@/constants/routes";
import type {
  SearchAttractionsData,
  SearchAttractionsParams,
} from "@/features/activities/types";
import ErrorBanner from "@/components/shared/ErrorBanner";
import PageHeaderWithBack from "@/components/shared/PageHeader";
import ResultsHeader from "@/components/shared/ResultsHeader";
import EmptyResultsState from "@/components/shared/EmptyResultsState";
import ResultsLoader from "@/components/shared/ResultsLoader";
import ActivitiesCard from "./ActivitiesCard";
import ActivitiesSearchForm from "./ActivitiesSearchForm";
import { getApiError } from "@/lib/utils/getApiError";
import useScrollIntoView from "@/hooks/useScrollIntoView";
import { searchAttractions } from "../api/activitiesService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function ActivitiesSearchPage() {
  const [searchedAttractions, setSearchedAttractions] = useState<
    SearchAttractionsData | undefined
  >();
  const [scrollTrigger, setScrollTrigger] = useState<number>(0);
  const {
    mutate: searchAttractionsMutation,
    isPending: isLoadingActivities,
    error: searchAttractionsError,
  } = useMutation({
    mutationFn: searchAttractions,
  });
  const scrollIntoViewRef = useScrollIntoView<HTMLDivElement>(scrollTrigger);

  const handleSearch = (params: SearchAttractionsParams) => {
    searchAttractionsMutation(params, {
      onSuccess: (data) => {
        setSearchedAttractions(data.data);
        setScrollTrigger((t) => t + 1);
      },
      onError: (error) => {
        toast.error(getApiError(error));
      },
    });
  };

  const errorMessage = useMemo(() => {
    if (searchAttractionsError?.message.includes("error")) {
      return searchAttractionsError?.message;
    }
    return searchAttractionsError && getApiError(searchAttractionsError);
  }, [searchAttractionsError]);

  return (
    <section className="flex-1 rounded-sm bg-white p-4 sm:p-6 lg:p-8">
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
        isLoadingAttractions={isLoadingActivities}
        attractions={searchedAttractions}
      />

      {isLoadingActivities && !searchedAttractions && (
        <div className="mt-4">
          <ResultsLoader message="Searching for activities..." />
        </div>
      )}

      {searchedAttractions && (
        <section
          ref={scrollIntoViewRef}
          className="space-y-4 scroll-mt-(--layout-offset)"
        >
          <ResultsHeader
            title="Available activities"
            count={searchedAttractions.products.length}
            label="experiences"
          />

          {searchedAttractions.products.length === 0 ? (
            <EmptyResultsState
              title="No activities found for your current filters."
              description="Try adjusting your dates, location, or filters to see more options."
            />
          ) : (
            <div className="space-y-3">
              {searchedAttractions.products.map((item) => (
                <ActivitiesCard key={item.id} activity={item} isSearchResult />
              ))}
            </div>
          )}
        </section>
      )}
    </section>
  );
}

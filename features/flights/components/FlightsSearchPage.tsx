"use client";

import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import EmptyResultsState from "@/components/shared/EmptyResultsState";
import ErrorBanner from "@/components/shared/ErrorBanner";
import PageHeaderWithBack from "@/components/shared/PageHeader";
import ResultsHeader from "@/components/shared/ResultsHeader";
import ResultsLoader from "@/components/shared/ResultsLoader";
import { AirplaneInFlightIcon } from "@/components/ui/icons";
import { ROUTES } from "@/constants/routes";
import useScrollIntoView from "@/hooks/useScrollIntoView";
import { getApiError } from "@/lib/utils/getApiError";

import { searchFlights } from "../api/flightServices";
import FlightCard from "./FlightCard";
import FlightsSearchForm from "./FlightsSearchForm";
import type { SearchFlightsData, SearchFlightsParams } from "../types";
import { useGetApiError } from "@/hooks";

export default function FlightsSearchPage() {
  const [searchedFlights, setSearchedFlights] = useState<
    SearchFlightsData | undefined
  >();
  const [scrollTrigger, setScrollTrigger] = useState<number>(0);

  const {
    mutate: searchFlightsMutation,
    isPending: isLoadingFlights,
    error: searchFlightsError,
    data: searchFlightsData,
  } = useMutation({
    mutationFn: searchFlights,
  });

  const scrollIntoViewRef = useScrollIntoView<HTMLDivElement>(scrollTrigger);

  const handleSearch = (params: SearchFlightsParams) => {
    searchFlightsMutation(params, {
      onSuccess: (data) => {
        setSearchedFlights(data?.data);
        setScrollTrigger((t) => t + 1);
      },
      onError: (error) => {
        toast.error(getApiError(error));
      },
    });
  };

  const errorMessage = useGetApiError({
    message: searchFlightsData?.message,
    error: searchFlightsError,
  });

  return (
    <section className="flex-1 rounded-sm bg-white p-4 sm:p-6 lg:p-8">
      <PageHeaderWithBack
        backHref={ROUTES.PLAN_TRIP}
        backLabel="Back to trip itineraries"
        title="Search flights"
        description="Search for flights for your trip and add them to your itinerary."
        icon={AirplaneInFlightIcon}
      />

      {errorMessage && <ErrorBanner message={errorMessage} />}

      <FlightsSearchForm
        onSearch={handleSearch}
        isLoadingFlights={isLoadingFlights}
      />

      {isLoadingFlights && (
        <div className="mt-4">
          <ResultsLoader message="Searching for flights..." />
        </div>
      )}

      {searchedFlights && !isLoadingFlights && (
        <section
          ref={scrollIntoViewRef}
          className="space-y-4 scroll-mt-(--layout-offset)"
        >
          <ResultsHeader
            title="Available flights"
            count={searchedFlights.flightOffers?.length}
            label="options"
          />

          {!searchedFlights.flightOffers?.length ? (
            <EmptyResultsState
              title="No flights found for your current filters."
              description="Try adjusting your dates, route, or filters to see more options."
            />
          ) : (
            <div className="space-y-3">
              {searchedFlights.flightOffers.map((offer) => (
                <FlightCard key={offer.token} offer={offer} isSearchResult />
              ))}
            </div>
          )}
        </section>
      )}
    </section>
  );
}

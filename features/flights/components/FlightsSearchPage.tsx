"use client";

import { useMemo, useState } from "react";

import { AirplaneInFlightIcon } from "@/components/ui/icons";
import { ROUTES } from "@/constants/routes";
import ErrorBanner from "@/components/shared/ErrorBanner";
import PageHeaderWithBack from "@/components/shared/PageHeader";
import ResultsHeader from "@/components/shared/ResultsHeader";
import { getApiError } from "@/lib/utils/getApiError";

import type { SearchFlightsParams, SearchFlightsResponse } from "../types";
import { useSearchFlights } from "../hooks/useSearchFlights";
import FlightsSearchForm from "./FlightsSearchForm";
import FlightCard from "./FlightCard";

export default function FlightsSearchPage() {
  const [searchParams, setSearchParams] = useState<SearchFlightsParams | null>(
    null
  );

  const {
    data: flightsResponse,
    isLoading: isLoadingFlights,
    error: searchFlightsError,
  } = useSearchFlights({
    params: searchParams ?? {
      fromId: "",
      toId: "",
      departDate: "",
    },
    enabled: !!searchParams,
  });

  const handleSearch = (params: SearchFlightsParams) => {
    setSearchParams(params);
  };

  const errorMessage = useMemo(() => {
    if (
      (
        flightsResponse as SearchFlightsResponse | undefined
      )?.message?.includes?.("error")
    ) {
      return flightsResponse?.message;
    }

    return searchFlightsError && getApiError(searchFlightsError);
  }, [flightsResponse, searchFlightsError]);

  return (
    <section className="flex-1 rounded-sm bg-white p-8">
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

      {flightsResponse?.data && (
        <section className="space-y-4">
          <ResultsHeader
            title="Available flights"
            count={flightsResponse.data.flightOffers.length}
            label="options"
          />

          {flightsResponse.data.flightOffers.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-neutral-300 bg-neutral-100 px-6 py-10 text-center">
              <p className="text-sm font-semibold text-black-primary">
                No flights found for your current filters.
              </p>
              <p className="mt-1 text-xs font-medium text-black-secondary">
                Try adjusting your dates, route, or filters to see more options.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {flightsResponse.data.flightOffers.map((offer) => (
                <FlightCard key={offer.token} />
              ))}
            </div>
          )}
        </section>
      )}
    </section>
  );
}

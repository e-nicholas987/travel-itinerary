"use client";

import { useMemo, useState } from "react";

import { BuildingsIcon } from "@/components/ui/icons";
import { ROUTES } from "@/constants/routes";
import type { SearchHotelsParams } from "@/features/hotels/types";
import { useSearchHotels } from "@/features/hotels/hooks/useSearchHotels";
import ErrorBanner from "@/components/shared/ErrorBanner";
import PageHeaderWithBack from "@/components/shared/PageHeader";
import ResultsHeader from "@/components/shared/ResultsHeader";
import EmptyResultsState from "@/components/shared/EmptyResultsState";
import ResultsLoader from "@/components/shared/ResultsLoader";
import HotelCard from "@/features/hotels/components/HotelCard";
import HotelsSearchForm from "@/features/hotels/components/HotelsSearchForm";
import { getApiError } from "@/lib/utils/getApiError";
import useScrollIntoView from "@/hooks/useScrollIntoView";

export default function HotelsSearchPage() {
  const [searchParams, setSearchParams] = useState<
    SearchHotelsParams | undefined
  >(undefined);

  const {
    data: hotelsResponse,
    isLoading: isLoadingHotels,
    error: searchHotelsError,
    refetch,
  } = useSearchHotels({
    params: searchParams,
    enabled: !!searchParams?.dest_id,
  });
  const scrollIntoViewRef = useScrollIntoView<HTMLDivElement>(
    hotelsResponse?.data?.hotels?.length ?? 0
  );

  const handleSearch = (params: SearchHotelsParams) => {
    setSearchParams(params);
    if (JSON.stringify(params) === JSON.stringify(searchParams)) refetch();
  };

  const errorMessage = useMemo(() => {
    if (hotelsResponse?.message.includes("error")) {
      return hotelsResponse?.message;
    }
    return searchHotelsError && getApiError(searchHotelsError as unknown);
  }, [hotelsResponse?.message, searchHotelsError]);

  return (
    <section className="flex-1 rounded-sm bg-white p-4 sm:p-6 lg:p-8">
      <PageHeaderWithBack
        backHref={ROUTES.PLAN_TRIP}
        backLabel="Back to trip itineraries"
        title="Search hotels"
        description="Find hotels for your trip and add them to your itinerary."
        icon={BuildingsIcon}
      />

      {errorMessage && <ErrorBanner message={errorMessage} />}

      <HotelsSearchForm
        onSearch={handleSearch}
        isLoadingHotels={isLoadingHotels}
      />

      {isLoadingHotels && !hotelsResponse?.data && (
        <div className="mt-4">
          <ResultsLoader message="Searching for hotels..." />
        </div>
      )}

      {hotelsResponse?.data && (
        <section ref={scrollIntoViewRef} className="space-y-4">
          <ResultsHeader
            title="Available hotels"
            count={hotelsResponse.data.hotels.length}
            label="properties"
          />

          {hotelsResponse.data.hotels.length === 0 ? (
            <EmptyResultsState
              title="No hotels found for your current filters."
              description="Try adjusting your dates, destination, or filters to see more options."
            />
          ) : (
            <div className="space-y-3">
              {hotelsResponse.data.hotels.map((hotel) => (
                <HotelCard key={hotel.hotel_id} hotel={hotel} isSearchResult />
              ))}
            </div>
          )}
        </section>
      )}
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";

import { BuildingsIcon } from "@/components/ui/icons";
import { ROUTES } from "@/constants/routes";
import type {
  SearchHotelsHotel,
  SearchHotelsParams,
} from "@/features/hotels/types";
import ErrorBanner from "@/components/shared/ErrorBanner";
import PageHeaderWithBack from "@/components/shared/PageHeader";
import ResultsHeader from "@/components/shared/ResultsHeader";
import EmptyResultsState from "@/components/shared/EmptyResultsState";
import ResultsLoader from "@/components/shared/ResultsLoader";
import HotelCard from "@/features/hotels/components/HotelCard";
import HotelsSearchForm from "@/features/hotels/components/HotelsSearchForm";
import { getApiError } from "@/lib/utils/getApiError";
import useScrollIntoView from "@/hooks/useScrollIntoView";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { searchHotels } from "../api/hotelsServices";

export default function HotelsSearchPage() {
  const [searchedHotels, setSearchedHotels] = useState<SearchHotelsHotel[]>([]);
  const [scrollTrigger, setScrollTrigger] = useState<number>(0);
  const {
    mutate: searchHotelsMutation,
    isPending: isLoadingHotels,
    error: searchHotelsError,
  } = useMutation({
    mutationFn: searchHotels,
  });

  const scrollIntoViewRef = useScrollIntoView<HTMLDivElement>(scrollTrigger);

  const handleSearch = (params: SearchHotelsParams) => {
    searchHotelsMutation(params, {
      onSuccess: (data) => {
        setSearchedHotels(data.data?.hotels ?? []);
        setScrollTrigger((t) => t + 1);
      },
      onError: (error) => {
        toast.error(getApiError(error));
      },
    });
  };

  const errorMessage = useMemo(() => {
    if (searchHotelsError?.message.includes("error")) {
      return searchHotelsError?.message;
    }
    return searchHotelsError && getApiError(searchHotelsError as unknown);
  }, [searchHotelsError]);

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

      {!searchedHotels?.length && isLoadingHotels && (
        <div className="mt-4">
          <ResultsLoader message="Searching for hotels..." />
        </div>
      )}

      {searchedHotels?.length && (
        <section
          ref={scrollIntoViewRef}
          className="space-y-4 scroll-mt-(--layout-offset)"
        >
          <ResultsHeader
            title="Available hotels"
            count={searchedHotels.length}
            label="properties"
          />

          {searchedHotels.length === 0 ? (
            <EmptyResultsState
              title="No hotels found for your current filters."
              description="Try adjusting your dates, destination, or filters to see more options."
            />
          ) : (
            <div className="space-y-3">
              {searchedHotels.map((hotel) => (
                <HotelCard key={hotel.hotel_id} hotel={hotel} isSearchResult />
              ))}
            </div>
          )}
        </section>
      )}
    </section>
  );
}

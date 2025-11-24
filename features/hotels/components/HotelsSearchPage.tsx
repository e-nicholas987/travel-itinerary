"use client";

import { useMemo, useState } from "react";

import { BuildingsIcon } from "@/components/ui/icons";
import { ROUTES } from "@/constants/routes";
import type { SearchHotelsParams } from "@/features/hotels/types";
import { useSearchHotels } from "@/features/hotels/hooks/useSearchHotels";
import HotelCard from "@/features/hotels/components/HotelCard";
import HotelsSearchForm from "@/features/hotels/components/HotelsSearchForm";
import { getApiError } from "@/lib/utils/getApiError";
import ErrorBanner from "@/components/shared/ErrorBanner";
import PageHeaderWithBack from "@/components/shared/PageHeader";
import { useRouteQueryParams } from "@/hooks";

export default function HotelsSearchPage() {
  const [searchParams, setSearchParams] = useState<
    SearchHotelsParams | undefined
  >(undefined);
  const { setParams } = useRouteQueryParams();

  const {
    data: hotelsResponse,
    isLoading: isLoadingHotels,
    error: searchHotelsError,
  } = useSearchHotels({
    params: searchParams,
    enabled: !!searchParams?.dest_id,
  });

  const handleSearch = (params: SearchHotelsParams) => {
    setSearchParams(params);
    setParams(params);
  };

  const errorMessage = useMemo(() => {
    if (hotelsResponse?.message.includes("error")) {
      return hotelsResponse?.message;
    }
    return searchHotelsError && getApiError(searchHotelsError as unknown);
  }, [hotelsResponse?.message, searchHotelsError]);

  return (
    <section className="flex-1 rounded-sm bg-white p-8">
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

      {hotelsResponse?.data && (
        <section className="space-y-4">
          <header className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
            <div>
              <h2 className="text-base font-semibold leading-6 tracking-[-0.02em]">
                Available hotels
              </h2>
              <p className="text-xs font-medium text-black-secondary">
                Showing {hotelsResponse.data.hotels.length} properties
              </p>
            </div>
          </header>

          {hotelsResponse.data.hotels.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-neutral-300 bg-neutral-100 px-6 py-10 text-center">
              <p className="text-sm font-semibold text-black-primary">
                No hotels found for your current filters.
              </p>
              <p className="mt-1 text-xs font-medium text-black-secondary">
                Try adjusting your dates, destination, or filters to see more
                options.
              </p>
            </div>
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

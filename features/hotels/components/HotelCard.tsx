import { Button, StarIcon } from "@/components/ui";
import ImageCarousel from "@/components/shared/ImageCarousel";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import type { SearchHotelsHotel } from "../types";
import RemoveItineraryButton from "@/components/shared/RemoveItineraryButton";
import { HOTELS_ITINERARY_STORAGE_KEY } from "@/constants/storageKeys";
import { cn } from "@/lib/utils/cn";
import { Calendar, MapPin } from "lucide-react";
import { useItineraryItem } from "@/features/activities/hooks/useItenaryItem";

type HotelCardProps = {
  hotel: SearchHotelsHotel;
  isSearchResult?: boolean;
  onRemoveFromItinerary?: () => void;
};

export default function HotelCard({
  hotel,
  isSearchResult = false,
  onRemoveFromItinerary,
}: HotelCardProps) {
  const { accessibilityLabel, property } = hotel;
  const {
    name,
    wishlistName,
    countryCode,
    reviewScore,
    reviewScoreWord,
    reviewCount,
    photoUrls,
    priceBreakdown,
    checkinDate,
    checkoutDate,
  } = property;

  const { isInItinerary, toggleItinerary } =
    useItineraryItem<SearchHotelsHotel>({
      storageKey: HOTELS_ITINERARY_STORAGE_KEY,
      item: hotel,
      getId: (hotel) => hotel.hotel_id,
    });

  const formattedPrice = priceBreakdown
    ? formatCurrency({
        amount: priceBreakdown.grossPrice.value,
        currency: priceBreakdown.grossPrice.currency,
      })
    : null;

  const locationLine =
    wishlistName && countryCode
      ? `${wishlistName}, ${countryCode.toUpperCase()}`
      : wishlistName || countryCode?.toUpperCase() || "";

  const shortLabel = accessibilityLabel?.split("\n")[0] ?? "";

  return (
    <article
      className={cn(
        "rounded-sm overflow-hidden border border-neutral-200 shadow-sm",
        !isSearchResult && "grid sm:grid-cols-[1fr_auto]"
      )}
    >
      <div className="flex flex-col gap-4 bg-white p-4 sm:flex-row sm:gap-6 sm:p-6 sm:pr-0">
        <ImageCarousel images={photoUrls || []} />
        <div className="flex flex-1 flex-col gap-2">
          <header className="flex flex-col gap-3 pl-0 sm:pl-4 sm:pr-6 md:flex-row md:items-start md:justify-between md:gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold leading-5 line-clamp-2">
                {name}
              </h3>
              {locationLine && (
                <p className="mt-0.5 text-xs sm:text-sm font-medium text-black-secondary line-clamp-2">
                  {locationLine}
                </p>
              )}
              {shortLabel && (
                <p className="mt-0.5 text-xs font-medium text-black-secondary line-clamp-2">
                  {shortLabel}
                </p>
              )}

              <div className="mt-1 flex flex-wrap items-center gap-3 font-medium text-black-secondary">
                <div className="flex gap-1 text-primary-600">
                  <MapPin size={18} />
                  <span className="leading-tight">Directions</span>
                </div>
                <span className="inline-flex items-center gap-1">
                  <StarIcon className="text-[#F4B93E]" />
                  {typeof reviewScore === "number"
                    ? reviewScore.toFixed(1)
                    : "N/A"}
                  {reviewScoreWord && (
                    <span className="leading-none">{reviewScoreWord}</span>
                  )}
                  {typeof reviewCount === "number" && (
                    <span className="leading-none">
                      ({reviewCount.toLocaleString()} reviews)
                    </span>
                  )}
                </span>
              </div>
            </div>

            <div className="mt-2 md:mt-0 text-right min-w-[120px]">
              {formattedPrice && (
                <p className="text-xl sm:text-[1.75rem] font-semibold text-black-primary">
                  {formattedPrice}
                </p>
              )}
              {priceBreakdown && (
                <p className="mt-1 text-xs font-medium text-black-secondary">
                  Total price:{" "}
                  {formatCurrency({
                    amount: priceBreakdown.grossPrice.value,
                    currency: priceBreakdown.grossPrice.currency,
                  })}
                </p>
              )}
            </div>
          </header>

          <section className="mt-2 flex flex-col gap-3 border-y border-neutral-200 py-3.5 text-xs sm:text-sm font-medium text-black-secondary sm:flex-row sm:items-center sm:justify-between sm:pl-4 sm:pr-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="text-xs sm:text-sm 2xl:text-[1.125rem]">
                <span className="text-black-secondary">Facilities:</span>{" "}
                <span className="text-black-primary">Pool</span>
                <span className="mx-1">•</span>
                <span className="text-black-primary">Bar</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs">
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-neutral-800" />
                <span className="text-black-secondary text-sm 2xl:text-[1.125rem] font-medium">
                  Check-in: {checkinDate || "-"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-neutral-800" />
                <span className="text-black-secondary text-sm 2xl:text-[1.125rem] font-medium">
                  Check-out: {checkoutDate || "-"}
                </span>
              </div>
            </div>
          </section>

          <footer className="mt-2 flex flex-col gap-3 pl-0 sm:flex-row sm:items-center sm:justify-between sm:pl-4 sm:pr-6">
            {!isSearchResult && (
              <div className="flex flex-wrap gap-3 text-sm 2xl:text-[1.125rem] font-semibold text-primary-600">
                <button type="button" className="hover:underline">
                  Hotel details
                </button>
                <button type="button" className="hover:underline">
                  Price details
                </button>
              </div>
            )}

            {isSearchResult && (
              <Button
                className={cn(
                  "w-full sm:w-auto sm:ml-auto",
                  isInItinerary &&
                    "bg-error-100 text-error-900 hover:bg-error-100/90"
                )}
                type="button"
                onClick={toggleItinerary}
              >
                {isInItinerary ? "Remove from itinerary" : "Add to itinerary"}
              </Button>
            )}
          </footer>
        </div>
      </div>

      {!isSearchResult && (
        <RemoveItineraryButton
          onClick={onRemoveFromItinerary ? onRemoveFromItinerary : () => {}}
        />
      )}
    </article>
  );
}

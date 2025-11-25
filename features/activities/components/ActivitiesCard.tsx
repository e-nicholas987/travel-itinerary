import {
  CircleChevronDown,
  CircleChevronUp,
  Clock,
  MapPin,
} from "lucide-react";

import ImageCarousel from "@/components/shared/ImageCarousel";
import RemoveItineraryButton from "@/components/shared/RemoveItineraryButton";
import { Button, StarIcon } from "@/components/ui";
import { useItineraryItem } from "@/features/activities/hooks/useItenaryItem";
import { ACTIVITIES_ITINERARY_STORAGE_KEY } from "@/constants/storageKeys";
import { cn } from "@/lib/utils/cn";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import type { AttractionsProduct } from "../types";

type ActivitiesCardProps = {
  activity: AttractionsProduct;
  isSearchResult?: boolean;
  onRemoveFromItinerary?: () => void;
};

export default function ActivitiesCard({
  activity,
  isSearchResult = false,
  onRemoveFromItinerary,
}: ActivitiesCardProps) {
  const {
    name,
    shortDescription,
    representativePrice,
    primaryPhoto,
    reviewsStats,
  } = activity;

  const { isInItinerary, toggleItinerary } =
    useItineraryItem<AttractionsProduct>({
      storageKey: ACTIVITIES_ITINERARY_STORAGE_KEY,
      item: activity,
      getId: (activity) => activity.id,
    });

  const rating = reviewsStats?.combinedNumericStats.average ?? null;
  const reviewCount = reviewsStats?.combinedNumericStats.total ?? null;

  const formattedPrice = formatCurrency({
    amount:
      representativePrice.publicAmount ?? representativePrice.chargeAmount,
    currency: representativePrice.currency,
  });

  return (
    <article
      className={cn(
        "rounded-sm overflow-hidden border border-neutral-200 shadow-sm",
        !isSearchResult && "grid sm:grid-cols-[1fr_auto]"
      )}
    >
      <div className="flex flex-col gap-4 bg-white p-4 sm:flex-row sm:gap-6 sm:p-6 sm:pr-0">
        <ImageCarousel
          images={primaryPhoto?.small ? [primaryPhoto.small] : []}
        />
        <div className="flex flex-1 flex-col gap-2">
          <header className="flex flex-col gap-3 pl-0 sm:pl-4 sm:pr-6 md:flex-row md:items-start md:justify-between md:gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold leading-5 line-clamp-2">
                {name}
              </h3>
              <p className="mt-0.5 text-xs sm:text-sm font-medium line-clamp-2">
                {shortDescription || "Description not available."}
              </p>

              <div className="mt-1 flex flex-wrap items-center gap-3 font-medium text-black-secondary">
                <div className="flex gap-1 text-primary-600">
                  <MapPin size={18} />
                  <span className="leading-tight">Directions</span>
                </div>
                <span className="inline-flex items-center gap-1">
                  <StarIcon className="text-[#F4B93E]" />
                  {rating ? rating.toFixed(1) : "N/A"}
                  {typeof reviewCount === "number" && (
                    <span className="text-black-secondary leading-none">
                      ({reviewCount} reviews)
                    </span>
                  )}
                </span>

                <div className="flex gap-1 items-center">
                  <Clock size={18} />
                  <span className="text-xs sm:text-sm">1 hour</span>
                </div>
              </div>
            </div>

            <div className="mt-2 md:mt-0 text-right min-w-[120px]">
              <p className="text-xl sm:text-[1.75rem] text-black-primary font-semibold">
                {formattedPrice}
              </p>
              <p className="mt-1 text-xs sm:text-sm font-medium text-black-primary">
                10:30 AM on Mar 19
              </p>
            </div>
          </header>

          <section className="mt-2 flex flex-col gap-3 border-y border-neutral-200 py-3.5 text-xs sm:text-sm font-medium text-secondary-black sm:flex-row sm:items-center sm:justify-between sm:pl-4 sm:pr-6">
            <p className="font-medium">
              What&apos;s included: Admission to the Empire State Building{" "}
              <span className="text-primary-600">See more</span>
            </p>

            <div className="flex items-center gap-3.5">
              <div className="bg-[#0A369D] whitespace-nowrap text-xs h-7.5 px-2 grid place-items-center rounded-sm text-white">
                {" "}
                Day 1
              </div>
              <div className="space-y-2.5 text-neutral-600">
                <CircleChevronUp size={16} />
                <CircleChevronDown size={16} />
              </div>
            </div>
          </section>

          <footer className="mt-2 flex flex-col gap-3 pl-0 sm:flex-row sm:items-center sm:justify-between sm:pl-4 sm:pr-6">
            {!isSearchResult && (
              <>
                <div className="flex flex-wrap gap-3 text-sm 2xl:text-[1.125rem] font-semibold text-primary-600">
                  <button type="button" className="hover:underline">
                    Activity details
                  </button>
                  <button type="button" className="hover:underline">
                    Price details
                  </button>
                </div>

                <button
                  type="button"
                  className="text-primary-600 hover:underline text-sm 2xl:text-[1.125rem] font-medium"
                >
                  Edit details
                </button>
              </>
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

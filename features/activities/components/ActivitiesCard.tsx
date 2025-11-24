import type { AttractionsProduct } from "../types";

import { Button, StarIcon } from "@/components/ui";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import ImageCarousel from "@/components/shared/ImageCarousel";
import {
  CircleChevronDown,
  CircleChevronUp,
  Clock,
  MapPin,
} from "lucide-react";

type ActivitiesCardProps = {
  activity: AttractionsProduct;
  isSearchResult?: boolean;
};

export default function ActivitiesCard({
  activity,
  isSearchResult = false,
}: ActivitiesCardProps) {
  const {
    name,
    shortDescription,
    representativePrice,
    primaryPhoto,
    reviewsStats,
  } = activity;

  const rating = reviewsStats?.combinedNumericStats.average ?? null;
  const reviewCount = reviewsStats?.combinedNumericStats.total ?? null;

  const formattedPrice = formatCurrency({
    amount:
      representativePrice.publicAmount ?? representativePrice.chargeAmount,
    currency: representativePrice.currency,
  });

  return (
    <article className="flex rounded-sm  bg-white p-6 pr-0 shadow-sm">
      <ImageCarousel
        images={primaryPhoto?.small ? [primaryPhoto.small] : []}
        alt={name}
      />
      <div className="flex flex-1 flex-col gap-2">
        <header className="flex flex-col pl-4 pr-10 gap-2 md:flex-row md:items-start md:justify-between">
          <div>
            <h3 className="text-xl font-semibold leading-5">{name}</h3>
            <p className="font-medium mt-0.5 line-clamp-2">
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
                <span>1 hour</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[1.75rem] text-black-primary font-semibold">
              {formattedPrice}
            </p>
            <p className="mt-1  font-medium text-black-primary">
              10:30 AM on Mar 19
            </p>
          </div>
        </header>

        <section className="mt-2 border-y  pl-4 pr-10 flex items-center justify-between border-neutral-200 py-3.5">
          <p className="font-medium text-secondary-black">
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

        <footer className="mt-2 pl-4 pr-10 flex items-center justify-between">
          {!isSearchResult && (
            <>
              <div className="flex gap-4 text-[1.125rem] font-semibold text-primary-600">
                <button type="button" className="hover:underline">
                  Activity details
                </button>
                <button type="button" className="hover:underline">
                  Price details
                </button>
              </div>

              <button
                type="button"
                className="text-primary-600 hover:underline text-[1.125rem] font-medium"
              >
                Edit details
              </button>
            </>
          )}
          {isSearchResult && (
            <Button className="ml-auto" type="button">
              Add to itinerary
            </Button>
          )}
        </footer>
      </div>
    </article>
  );
}

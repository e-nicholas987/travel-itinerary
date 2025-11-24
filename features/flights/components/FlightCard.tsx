import { useState } from "react";
import Image from "next/image";
import {
  PlaneIcon,
  LuggageIcon,
  TvIcon,
  UtensilsIcon,
  PlugIcon,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { useLocalStorage } from "@/hooks";
import { FLIGHTS_ITINERARY_STORAGE_KEY } from "@/constants/storageKeys";
import RemoveItineraryButton from "@/components/shared/RemoveItineraryButton";
import { cn } from "@/lib/utils";
import type { FlightOffer } from "../types";
import {
  AirplaneTakeOffIcon,
  AirplaneLandingIcon,
} from "@/components/ui/icons";
import { formatDuration } from "../utils/formateDuration";

const FACILITIES: ReadonlyArray<{ icon: LucideIcon; label: string }> = [
  { icon: LuggageIcon, label: "Baggage: 20kg, Cabin Baggage: 8kg" },
  { icon: TvIcon, label: "In flight entertainment" },
  { icon: UtensilsIcon, label: "In flight meal" },
  { icon: PlugIcon, label: "USB Port" },
];

type FlightCardProps = {
  offer: FlightOffer;
  isSearchResult?: boolean;
  onRemoveFromItinerary?: () => void;
};

export default function FlightCard({
  offer,
  isSearchResult = false,
  onRemoveFromItinerary,
}: FlightCardProps) {
  const { getItem, setItem } = useLocalStorage();

  const [isInItinerary, setIsInItinerary] = useState(() => {
    const stored = getItem<FlightOffer[]>(FLIGHTS_ITINERARY_STORAGE_KEY) ?? [];
    if (Array.isArray(stored)) {
      return stored.some((item) => item.token === offer.token);
    }
    return false;
  });

  const firstSegment = offer.segments[0];
  const firstLeg = firstSegment?.legs[0];

  const carrier = firstLeg.carriersData[0];
  const departureAirport = firstSegment.departureAirport;
  const arrivalAirport = firstSegment.arrivalAirport;
  const flightNumber = `${carrier?.code}-${firstLeg.flightInfo.flightNumber}`;

  const cabinClassRaw = firstLeg.cabinClass || "ECONOMY";
  const cabinClass =
    cabinClassRaw.charAt(0) + cabinClassRaw.slice(1).toLowerCase();

  const departureDate = new Date(firstSegment.departureTime);
  const arrivalDate = new Date(firstSegment.arrivalTime);

  const totalPrice = offer.priceBreakdown.total;
  const formattedPrice = formatCurrency({
    amount: totalPrice.units + totalPrice.nanos / 1_000_000_000,
    currency: totalPrice.currencyCode,
  });

  const isDirect = firstSegment.legs.length === 1;
  const stopsLabel = isDirect
    ? "Direct"
    : `${firstSegment.legs.length - 1} Stop${
        firstSegment.legs.length - 1 > 1 ? "s" : ""
      }`;

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

  const handleToggleItinerary = () => {
    const stored = getItem<FlightOffer[]>(FLIGHTS_ITINERARY_STORAGE_KEY) ?? [];
    const exists = stored.some((item) => item.token === offer.token);
    const updated = exists
      ? stored.filter((item) => item.token !== offer.token)
      : [...stored, offer];

    const success = setItem(FLIGHTS_ITINERARY_STORAGE_KEY, updated);
    if (success) {
      setIsInItinerary(!exists);
    }
  };

  return (
    <article
      className={cn("rounded-sm overflow-hidden bg-white", {
        "grid grid-cols-[1fr_auto]": !isSearchResult,
        "border border-neutral-200 shadow-sm": isSearchResult,
      })}
    >
      <div className="flex-1 py-4 sm:py-6">
        <header className="flex flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 md:min-w-[200px]">
            {carrier?.logo ? (
              <Image
                src={carrier.logo}
                alt={carrier.name}
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            ) : (
              <div className="h-10 w-10 bg-neutral-100 rounded-full grid place-items-center">
                <PlaneIcon className="text-neutral-400 size-5" />
              </div>
            )}
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-black-primary leading-tight line-clamp-2">
                {carrier?.name || "Airline"}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-xs sm:text-sm text-black-secondary font-medium">
                  {flightNumber}
                </span>
                <span className="inline-flex items-center rounded-sm bg-[#0A369D] px-2 py-0.5 text-xs font-medium text-white">
                  {cabinClass.replace("_", " ")}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex flex-1 flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-center md:gap-6">
            <div className="text-left md:text-right min-w-[72px]">
              <p className="text-lg sm:text-xl font-bold text-black-primary leading-none">
                {formatTime(departureDate)}
              </p>
              <p className="mt-1 text-xs font-medium text-black-secondary">
                {formatDate(departureDate)}
              </p>
            </div>

            <div className="flex flex-col items-center w-full max-w-full md:max-w-[220px]">
              <div className="mb-1 flex w-full items-center justify-between text-[11px] sm:text-xs font-medium text-black-secondary">
                <AirplaneTakeOffIcon className="text-neutral-800" />
                <span>
                  Duration: {formatDuration(firstSegment.totalTime ?? 0)}
                </span>
                <AirplaneLandingIcon className="text-neutral-800" />
              </div>
              <div className="relative w-full h-1.5 bg-blue-100 rounded-full overflow-hidden">
                <div className="absolute top-0 left-1/4 right-1/4 h-full bg-primary-600 rounded-full" />
              </div>
              <div className="mt-1 flex w-full justify-between text-[11px] sm:text-xs font-semibold text-black-primary">
                <span>{departureAirport.code}</span>
                <span className="text-black-secondary font-normal">
                  {stopsLabel}
                </span>
                <span>{arrivalAirport.code}</span>
              </div>
            </div>

            <div className="text-left min-w-[72px]">
              <p className="text-lg sm:text-xl font-bold text-black-primary leading-none">
                {formatTime(arrivalDate)}
              </p>
              <p className="mt-1 text-xs font-medium text-black-secondary">
                {formatDate(arrivalDate)}
              </p>
            </div>
          </div>

          <div className="mt-4 md:mt-0 text-right min-w-[120px]">
            <p className="text-xl sm:text-2xl font-bold text-black-primary">
              {formattedPrice}
            </p>
          </div>
        </header>

        <div className="my-4 sm:my-6 border-t border-neutral-200" />

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 sm:px-6 text-xs sm:text-sm text-black-secondary">
          <span className="mr-2 font-medium text-black-secondary">
            Facilities:
          </span>
          {FACILITIES.map((facility) => (
            <div key={facility.label} className="flex items-center gap-1.5">
              <facility.icon className="size-4 text-neutral-800" />
              <span className="font-medium">{facility.label}</span>
            </div>
          ))}
        </div>

        <div className="my-4 sm:my-6 border-t border-neutral-200" />

        <footer className="flex flex-col gap-3 px-4 pb-2 sm:px-6 sm:pb-4 sm:flex-row sm:items-center sm:justify-between">
          {!isSearchResult && (
            <>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  className="text-primary-600 text-sm sm:text-base font-semibold hover:underline"
                >
                  Flight details
                </button>
                <button
                  type="button"
                  className="text-primary-600 text-sm sm:text-base font-semibold hover:underline"
                >
                  Price details
                </button>
              </div>
            </>
          )}

          <div className="flex gap-3 sm:gap-4 sm:ml-auto">
            {!isSearchResult && (
              <button
                type="button"
                className="text-primary-600 text-sm sm:text-base font-semibold hover:underline"
              >
                Edit details
              </button>
            )}

            {isSearchResult && (
              <Button
                className={cn(
                  "ml-auto",
                  isInItinerary &&
                    "bg-error-100 text-error-900 hover:bg-error-100/90"
                )}
                type="button"
                onClick={handleToggleItinerary}
              >
                {isInItinerary ? "Remove from itinerary" : "Add to itinerary"}
              </Button>
            )}
          </div>
        </footer>
      </div>

      {!isSearchResult && (
        <RemoveItineraryButton
          onClick={onRemoveFromItinerary ? onRemoveFromItinerary : () => {}}
        />
      )}
    </article>
  );
}

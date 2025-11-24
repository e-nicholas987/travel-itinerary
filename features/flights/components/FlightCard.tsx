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
import { formatDurationMs } from "../utils/formateDurationMs";

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

  const firstSegment = offer.segments[0];
  const firstLeg = firstSegment?.legs[0];

  console.log(firstSegment);

  if (!firstLeg) return null;

  const carrier = firstLeg.carriersData[0];
  const departureAirport = firstSegment.departureAirport;
  const arrivalAirport = firstSegment.arrivalAirport;
  const flightNumber = `${carrier?.code}-${firstLeg.flightInfo.flightNumber}`;

  const cabinClassRaw = firstLeg.cabinClass || "ECONOMY";
  const cabinClass =
    cabinClassRaw.charAt(0) + cabinClassRaw.slice(1).toLowerCase();

  const departureDate = new Date(firstSegment.departureTime);
  const arrivalDate = new Date(firstSegment.arrivalTime);

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

  const totalDurationMinutes = firstSegment.totalTime ?? 0;

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

  return (
    <article
      className={cn("rounded-sm overflow-hidden bg-white", {
        "grid grid-cols-[1fr_auto] shadow-sm border border-neutral-200":
          !isSearchResult,
        "border border-neutral-200 shadow-sm": isSearchResult,
      })}
    >
      <div className="flex-1 py-6">
        <header className="flex pl-6 pr-12 flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4 min-w-[200px]">
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
            <div>
              <h3 className="text-lg font-bold text-black-primary leading-tight">
                {carrier?.name || "Airline"}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-black-secondary font-medium">
                  {flightNumber}
                </span>
                <span className="inline-flex items-center rounded-sm bg-[#0A369D] px-2 py-0.5 text-xs font-medium text-white">
                  {cabinClass.replace("_", " ")}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center gap-6 px-4">
            <div className="text-right min-w-[80px]">
              <p className="text-xl font-bold text-black-primary leading-none">
                {formatTime(departureDate)}
              </p>
              <p className="text-xs font-medium text-black-secondary mt-1">
                {formatDate(departureDate)}
              </p>
            </div>

            <div className="flex flex-col items-center w-full max-w-[200px]">
              <div className="flex justify-between w-full text-xs font-medium text-black-secondary mb-1">
                <AirplaneTakeOffIcon className="text-neutral-800" />
                <span>Duration: {formatDurationMs(totalDurationMinutes)}</span>
                <AirplaneLandingIcon className="text-neutral-800" />
              </div>
              <div className="relative w-full h-1.5 bg-blue-100 rounded-full overflow-hidden">
                <div className="absolute top-0 left-1/4 right-1/4 h-full bg-primary-600 rounded-full" />
              </div>
              <div className="flex justify-between w-full text-xs font-semibold text-black-primary mt-1">
                <span>{departureAirport.code}</span>
                <span className="text-black-secondary font-normal">
                  {stopsLabel}
                </span>
                <span>{arrivalAirport.code}</span>
              </div>
            </div>

            <div className="text-left min-w-[80px]">
              <p className="text-xl font-bold text-black-primary leading-none">
                {formatTime(arrivalDate)}
              </p>
              <p className="text-xs font-medium text-black-secondary mt-1">
                {formatDate(arrivalDate)}
              </p>
            </div>
          </div>

          <div className="text-right min-w-[140px]">
            <p className="text-2xl font-bold text-black-primary">
              {formattedPrice}
            </p>
          </div>
        </header>

        <div className="my-6 border-t border-neutral-200" />

        <div className="flex pl-6 pr-12 flex-wrap items-center gap-x-6 gap-y-2 text-sm text-black-secondary">
          <span className="font-medium text-black-secondary mr-2">
            Facilities:
          </span>
          {FACILITIES.map((facility) => (
            <div key={facility.label} className="flex items-center gap-1.5">
              <facility.icon className="size-4 text-neutral-800" />
              <span className="font-medium">{facility.label}</span>
            </div>
          ))}
        </div>

        <div className="my-6 border-t border-neutral-200" />

        <footer className="flex pl-6 pr-12 items-center justify-between">
          {!isSearchResult && (
            <>
              <div className="flex gap-6">
                <button
                  type="button"
                  className="text-primary-600 font-semibold text-base hover:underline"
                >
                  Flight details
                </button>
                <button
                  type="button"
                  className="text-primary-600 font-semibold text-base hover:underline"
                >
                  Price details
                </button>
              </div>
            </>
          )}

          <div className="flex gap-4 ml-auto">
            {!isSearchResult && (
              <button
                type="button"
                className="text-primary-600 font-semibold text-base hover:underline"
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

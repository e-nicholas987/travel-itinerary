"use client";

import { useEffect, useState } from "react";
import ItineraryCategorySection from "./ItineraryCategorySection";
import ItineraryEmptyState from "./ItineraryEmptyState";
import FlightCard from "@/features/flights/components/FlightCard";
import type { FlightOffer } from "@/features/flights/types";
import { useLocalStorage } from "@/hooks";
import { FLIGHTS_ITINERARY_STORAGE_KEY } from "@/constants/storageKeys";

export default function FlightsItinerary() {
  const { getItem, setItem } = useLocalStorage();
  const [flights, setFlights] = useState<FlightOffer[]>([]);

  useEffect(() => {
    const stored = getItem<FlightOffer[]>(FLIGHTS_ITINERARY_STORAGE_KEY);
    if (Array.isArray(stored)) {
      setTimeout(() => {
        setFlights(stored);
      });
    }
  }, [getItem]);

  const handleRemoveFromItinerary = (token: string) => {
    const updated = flights.filter((flight) => flight.token !== token);

    setFlights(updated);
    setItem(FLIGHTS_ITINERARY_STORAGE_KEY, updated);
  };

  return (
    <ItineraryCategorySection type="flights">
      {flights.length === 0 ? (
        <ItineraryEmptyState type="flights" />
      ) : (
        <div className="space-y-3">
          {flights.map((flight) => (
            <FlightCard
              key={flight.token}
              offer={flight}
              onRemoveFromItinerary={() =>
                handleRemoveFromItinerary(flight.token)
              }
            />
          ))}
        </div>
      )}
    </ItineraryCategorySection>
  );
}

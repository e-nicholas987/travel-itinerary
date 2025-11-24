 "use client";

import { useEffect, useState } from "react";

import ItineraryCategorySection from "./ItineraryCategorySection";
import ItineraryEmptyState from "./ItineraryEmptyState";
import HotelCard from "@/features/hotels/components/HotelCard";
import type { SearchHotelsHotel } from "@/features/hotels/types";
import { useLocalStorage } from "@/hooks";
import { HOTELS_ITINERARY_STORAGE_KEY } from "@/constants/storageKeys";

export default function HotelItinerary() {
  const { getItem, setItem } = useLocalStorage();
  const [hotels, setHotels] = useState<SearchHotelsHotel[]>([]);

  useEffect(() => {
    const stored =
      getItem<SearchHotelsHotel[]>(HOTELS_ITINERARY_STORAGE_KEY);

    if (stored && Array.isArray(stored)) {
      setHotels(stored);
    }
  }, [getItem]);

  const handleRemoveFromItinerary = (id: number) => {
    const updated = hotels.filter((hotel) => hotel.hotel_id !== id);

    setHotels(updated);
    setItem(HOTELS_ITINERARY_STORAGE_KEY, updated);
  };

  return (
    <ItineraryCategorySection type="hotels">
      {hotels.length === 0 ? (
        <ItineraryEmptyState type="hotels" />
      ) : (
        <div className="space-y-3">
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel.hotel_id}
              hotel={hotel}
              onRemoveFromItinerary={() =>
                handleRemoveFromItinerary(hotel.hotel_id)
              }
            />
          ))}
        </div>
      )}
    </ItineraryCategorySection>
  );
}

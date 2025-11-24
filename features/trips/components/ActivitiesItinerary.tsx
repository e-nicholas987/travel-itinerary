"use client";

import { useEffect, useState } from "react";

import ItineraryCategorySection from "./ItineraryCategorySection";
import ItineraryEmptyState from "./ItineraryEmptyState";
import ActivitiesCard from "@/features/activities/components/ActivitiesCard";
import type { AttractionsProduct } from "@/features/activities/types";
import { useLocalStorage } from "@/hooks";
import { ACTIVITIES_ITINERARY_STORAGE_KEY } from "../../../constants/storageKeys";

export default function ActivitiesItinerary() {
  const { getItem, setItem } = useLocalStorage();
  const [activities, setActivities] = useState<AttractionsProduct[]>([]);

  useEffect(() => {
    const stored = getItem<AttractionsProduct[]>(
      ACTIVITIES_ITINERARY_STORAGE_KEY
    );

    if (Array.isArray(stored)) {
      setTimeout(() => {
        setActivities(stored);
      });
    }
  }, [getItem]);

  const handleRemoveFromItinerary = (id: string) => {
    const updated = activities.filter((activity) => activity.id !== id);

    setActivities(updated);
    setItem(ACTIVITIES_ITINERARY_STORAGE_KEY, updated);
  };

  return (
    <ItineraryCategorySection type="activities">
      {activities.length === 0 ? (
        <ItineraryEmptyState type="activities" />
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => (
            <ActivitiesCard
              key={activity.id}
              activity={activity}
              onRemoveFromItinerary={() =>
                handleRemoveFromItinerary(activity.id)
              }
            />
          ))}
        </div>
      )}
    </ItineraryCategorySection>
  );
}

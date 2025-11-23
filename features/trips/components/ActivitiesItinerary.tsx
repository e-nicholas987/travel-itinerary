import ItineraryCategorySection from "./ItineraryCategorySection";
import ItineraryEmptyState from "./ItineraryEmptyState";

export default function ActivitiesItinerary() {
  return (
    <ItineraryCategorySection type="activities">
      <ItineraryEmptyState type="activities" />
    </ItineraryCategorySection>
  );
}

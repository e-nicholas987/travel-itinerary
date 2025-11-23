import ItineraryCategorySection from "./ItineraryCategorySection";
import ItineraryEmptyState from "./ItineraryEmptyState";

export default function FlightsItinerary() {
  return (
    <ItineraryCategorySection type="flights">
      <ItineraryEmptyState type="flights" />
    </ItineraryCategorySection>
  );
}

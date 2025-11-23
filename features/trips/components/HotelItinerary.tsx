import ItineraryCategorySection from "./ItineraryCategorySection";
import ItineraryEmptyState from "./ItineraryEmptyState";

const items = [];

export default function HotelItinerary() {
  return (
    <ItineraryCategorySection type="hotels">
      {items.length === 0 && <ItineraryEmptyState type="hotels" />}
    </ItineraryCategorySection>
  );
}

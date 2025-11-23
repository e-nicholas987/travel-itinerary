import ActivitiesItinerary from "@/features/trips/components/ActivitiesItinerary";
import FlightsItinerary from "@/features/trips/components/FlightsItinerary";
import HotelItinerary from "@/features/trips/components/HotelItinerary";
import TripHero from "@/features/trips/components/TripHero";

export default function TripPlannerPage() {
  return (
    <div className="flex-1 p-8 rounded-sm bg-white">
      <TripHero />
      <h2 className="text-xl tracking-[-2%] font-semibold leading-8 mt-22.5">
        Trip Itineraries
      </h2>
      <p className="mt-0.5 text-sm leading-5.5 font-medium text-black-secondary">
        Your trip itineraries are placed here
      </p>
      <div className="space-y-4 mt-7">
        <FlightsItinerary />
        <HotelItinerary />
        <ActivitiesItinerary />
      </div>
    </div>
  );
}

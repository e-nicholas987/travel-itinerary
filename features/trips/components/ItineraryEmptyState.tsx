import { IMAGES } from "@/constants/images";
import { ItineraryType } from "../types";
import Image from "next/image";
import Link from "next/link";
import { ROUTES, RouteValue } from "@/constants/routes";
import { buttonVariants } from "@/components/ui/Button";

interface ItineraryEmptyStateProps {
  type: ItineraryType;
}

interface EmptyStageConfig {
  image: string;
  href: RouteValue;
}

const EMPTY_STAGE_CONFIG: Record<ItineraryType, EmptyStageConfig> = {
  activities: {
    image: IMAGES.emptyActivities,
    href: ROUTES.ACTIVITIES,
  },
  hotels: {
    image: IMAGES.emptyHotels,
    href: ROUTES.HOTELS,
  },
  flights: {
    image: IMAGES.emptyFlights,
    href: ROUTES.FLIGHTS,
  },
};

export default function ItineraryEmptyState({
  type,
}: ItineraryEmptyStateProps) {
  const { image, href } = EMPTY_STAGE_CONFIG[type];

  return (
    <div className="bg-white h-75 rounded-sm flex flex-col gap-3 items-center justify-center">
      <Image
        src={image}
        alt={type}
        width={100}
        height={100}
        className="size-25 object-contain"
      />
      <p className="font-medium text-sm">No Request yet</p>
      <Link
        href={href}
        className={buttonVariants({
          variant: "primary",
          size: "lg",
          className: "text-sm font-semibold w-38.5",
        })}
      >
        Add {type}
      </Link>
    </div>
  );
}

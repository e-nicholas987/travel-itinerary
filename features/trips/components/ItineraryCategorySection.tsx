import {
  AirplaneInFlight,
  RoadHorizonIcon,
  WarehouseIcon,
} from "@/components/ui/icons";
import { ItineraryType } from "../types";
import { ComponentType } from "react";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { RouteValue } from "@/constants/routes";
import { buttonVariants } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";

interface ItineraryCategorySectionProps {
  type: ItineraryType;
  children: React.ReactNode;
}

type ItineraryCategoryConfig = {
  label: string;
  icon: ComponentType<{ className?: string }>;
  href: RouteValue;
};

type ItineraryCategoryVariant = {
  bg: string;
  text: string;
  cta: string;
};

const ITINERARY_CATEGORY_CONFIG: Record<
  ItineraryType,
  ItineraryCategoryConfig
> = {
  activities: {
    label: "Activities",
    icon: RoadHorizonIcon,
    href: ROUTES.ACTIVITIES,
  },
  hotels: {
    label: "Hotels",
    icon: WarehouseIcon,
    href: ROUTES.HOTELS,
  },
  flights: {
    label: "Flights",
    icon: AirplaneInFlight,
    href: ROUTES.FLIGHTS,
  },
};

const ITINERARY_CATEGORY_VARIANTS: Record<
  ItineraryType,
  ItineraryCategoryVariant
> = {
  activities: {
    bg: "bg-primary-700",
    text: "text-white",
    cta: "text-primary-500",
  },
  hotels: {
    bg: "bg-neutral-900",
    text: "text-white",
    cta: "text-black-primary",
  },
  flights: {
    bg: "bg-neutral-300",
    text: "text-black-primary",
    cta: "text-primary-600",
  },
} as const;

export default function ItineraryCategorySection({
  type,
  children,
}: ItineraryCategorySectionProps) {
  const { label, icon: Icon, href } = ITINERARY_CATEGORY_CONFIG[type];
  const styles = ITINERARY_CATEGORY_VARIANTS[type];

  return (
    <section className={cn("p-6 rounded-sm", styles.bg)}>
      <div className="flex items-center justify-between mb-6">
        <div className={cn("flex items-center gap-2.5", styles.text)}>
          <Icon className="size-6" />
          <p className="text-base font-medium">{label}</p>
        </div>

        <Link
          href={href}
          className={buttonVariants({
            variant: "white",
            size: "lg",
            className: cn("text-sm font-semibold w-38.5", styles.cta),
          })}
        >
          Add {label}
        </Link>
      </div>
      {children}
    </section>
  );
}

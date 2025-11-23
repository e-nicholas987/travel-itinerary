import { cn } from "@/lib/utils/cn";
import type { ItineraryType } from "../types";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { RouteValue } from "@/constants/routes";

type ItineraryActionCardProps = {
  title: ItineraryType;
  href: RouteValue;
};

export default function ItineraryActionCard({
  title,
  href,
}: ItineraryActionCardProps) {
  return (
    <div
      className={cn(
        "max-w-67.5 flex gap-2 flex-col w-full py-4 px-3.5 rounded-sm h-48.25",
        {
          "bg-primary-1100": title === "activities",
          "bg-primary-100": title === "hotels",
          "bg-primary-600": title === "flights",
        }
      )}
    >
      <p
        className={cn(
          "font-semibold capitalize leading-6",
          title === "hotels" ? "text-black" : "text-white"
        )}
      >
        {title}
      </p>
      <p
        className={cn(
          "text-sm leading-5.5",
          title === "hotels" ? "text-black-primary" : "text-white"
        )}
      >
        Build, personalize, and optimize your itineraries with our trip planner.
      </p>
      <Link
        href={href}
        className={buttonVariants({
          variant: title === "flights" ? "white" : "primary",
          className: "capitalize mt-auto text-sm",
          size: "lg",
        })}
      >
        Add {title}
      </Link>
    </div>
  );
}

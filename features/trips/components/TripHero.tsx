import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DotsThreeIcon,
  GearSixIcon,
  UserPlusIcon,
} from "@/components/ui/icons";
import CalendarBlankIcon from "@/components/ui/icons/CalendarBlankIcon";
import { IMAGES } from "@/constants/images";
import Image from "next/image";
import type { ItineraryType } from "../types";
import { ROUTES, RouteValue } from "@/constants/routes";
import ItineraryActionCard from "./ItineraryActionCard";
import Link from "next/link";

interface ItineraryActionCardProps {
  title: ItineraryType;
  href: RouteValue;
}

const ITINERARY_ACTIONS: ItineraryActionCardProps[] = [
  {
    title: "activities",
    href: ROUTES.ACTIVITIES,
  },
  {
    title: "hotels",
    href: ROUTES.HOTELS,
  },
  {
    title: "flights",
    href: ROUTES.FLIGHTS,
  },
];

export default function TripHero() {
  return (
    <section className="space-y-4 sm:space-y-5">
      <div
        style={{ backgroundImage: `url(${IMAGES.tripHeroIllustration})` }}
        className="relative h-40 sm:h-50 p-4 sm:p-6 bg-cover bg-top-left bg-no-repeat rounded-sm"
      >
        <Link
          href={ROUTES.HOME}
          aria-label="back to home"
          className="size-10 sm:size-12 cursor-pointer bg-white/20 rounded-sm hover:bg-primary-600/12 hover:text-primary-600 grid place-items-center"
        >
          <ArrowLeftIcon className="size-6" />
        </Link>
      </div>

      <div className="mt-3 sm:mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2 h-7.5 px-2 text-secondary-900 items-center bg-secondary-100 w-fit">
          <CalendarBlankIcon />
          <span className="text-[10px] sm:text-xs font-medium">
            21 March 2024
          </span>
          <ArrowRightIcon />
          <span className="text-[10px] sm:text-xs font-medium">
            21 April 2024
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            aria-label="add user"
            className="text-primary-600 cursor-pointer hover:bg-primary-600 hover:text-white transition-colors duration-300 grid place-items-center rounded-sm w-full sm:w-40 bg-primary-100 h-10 sm:h-11.5"
          >
            <UserPlusIcon />
          </button>
          <button
            type="button"
            aria-label="open menu"
            className="grid cursor-pointer place-items-center hover:bg-primary-600 hover:text-white transition-colors duration-300 rounded-sm w-10 h-10 sm:w-11.5 sm:h-11.5"
          >
            <DotsThreeIcon />
          </button>
        </div>
      </div>

      <h1 className="text-xl sm:text-2xl font-semibold leading-7 sm:leading-8">
        Bahamas Family Trip
      </h1>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs sm:text-sm text-black-secondary font-medium">
          New York,  United States of America{" "}
          <span className="text-neutral-500"> | </span>Solo Trip
        </p>
        <div className="flex items-center gap-2">
          <Image
            src={IMAGES.tripSummaryAvatar}
            alt="Trip summary avatar"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div className="h-0.5 w-7.75 bg-primary-100" />
          <button
            type="button"
            aria-label="open menu"
            className="border size-10 grid place-items-center rounded-full hover:bg-primary-600 hover:text-white transition-colors duration-300 border-primary-100"
          >
            <GearSixIcon />
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:gap-6 xl:gap-8">
        {ITINERARY_ACTIONS.map((action) => (
          <ItineraryActionCard
            key={action.title}
            title={action.title}
            href={action.href}
          />
        ))}
      </div>
    </section>
  );
}

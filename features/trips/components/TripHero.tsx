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
    <section>
      <div
        style={{ backgroundImage: `url(${IMAGES.tripHeroIllustration})` }}
        className="relative h-50 p-6 bg-cover bg-top-left bg-no-repeat"
      >
        <Link
          href={ROUTES.HOME}
          aria-label="back to home"
          className="size-12 cursor-pointer bg-white/20 rounded-sm hover:bg-primary-600/12 hover:text-primary-600 grid place-items-center"
        >
          <ArrowLeftIcon className="size-6" />
        </Link>
      </div>

      <div className="flex items-center justify-between mt-5">
        <div className="flex mt-2 gap-2 h-7.5 px-2 text-secondary-900 items-center bg-secondary-100 w-fit">
          <CalendarBlankIcon />
          <span className="text-xs font-medium">21 March 2024</span>
          <ArrowRightIcon />
          <span className="text-xs font-medium">21 April 2024</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="add user"
            className="text-primary-600 hover:bg-primary-600 hover:text-white transition-colors duration-300 grid place-items-center rounded-sm w-40 bg-primary-100 h-11.5"
          >
            <UserPlusIcon />
          </button>
          <button
            type="button"
            aria-label="open menu"
            className="grid place-items-center hover:bg-primary-600 hover:text-white transition-colors duration-300 rounded-sm w-11.5 h-11.5"
          >
            <DotsThreeIcon />
          </button>
        </div>
      </div>

      <h1 className="text-2xl font-semibold leading-8">Bahamas Family Trip</h1>

      <div className="flex items-center justify-between">
        <p className="text-black-secondary font-medium">
          New York,  United States of America{" "}
          <span className="text-neutral-500"> | </span>Solo Trip
        </p>
        <div className="flex items-center">
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

      <div className="flex gap-1 mt-5">
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

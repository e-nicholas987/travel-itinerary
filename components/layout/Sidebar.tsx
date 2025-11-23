"use client";

import Link from "next/link";
import type { ComponentType } from "react";

import { cn } from "@/lib/utils/cn";
import {
  AirplaneTiltIcon,
  BuildingsIcon,
  CaretUpDownIcon,
  FirstAidKitIcon,
  PackageIcon,
  RoadHorizonIcon,
  StudentIcon,
  SuitcaseRollingIcon,
} from "@/components/ui/icons";
import NewspaperClippingIcon from "../ui/icons/NewspaperClippingIcon";
import { useActiveRoute } from "@/hooks/useActiveRoute";
import { ROUTES } from "@/constants/routes";

type SidebarItem = {
  label: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
};

const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: "Activities", href: ROUTES.ACTIVITIES, Icon: RoadHorizonIcon },
  { label: "Hotels", href: ROUTES.HOTELS, Icon: BuildingsIcon },
  { label: "Flights", href: ROUTES.FLIGHTS, Icon: AirplaneTiltIcon },
  { label: "Study", href: ROUTES.STUDY, Icon: StudentIcon },
  { label: "Visa", href: ROUTES.VISA, Icon: NewspaperClippingIcon },
  { label: "Immigration", href: ROUTES.IMMIGRATION, Icon: SuitcaseRollingIcon },
  { label: "Medical", href: ROUTES.MEDICAL, Icon: FirstAidKitIcon },
  {
    label: "Vacation Packages",
    href: ROUTES.VACATION_PACKAGES,
    Icon: PackageIcon,
  },
];

export default function Sidebar() {
  const isActiveRoute = useActiveRoute();

  return (
    <div className="pb-23.5 overflow-y-hidden flex flex-col space-y-16 rounded-sm bg-white px-2 pt-6">
      <nav className="space-y-3 overflow-y-auto px-4">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = isActiveRoute(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "text-black-secondary group flex cursor-pointer items-center gap-2  rounded-sm px-3.5 py-4 text-sm font-medium 2xl:text-base",
                isActive ? "bg-primary-600/10" : "hover:bg-neutral-300/50"
              )}
            >
              <item.Icon
                className={cn(
                  "size-8 text-neutral-700 transition-colors",
                  isActive ? "text-primary-600" : "text-neutral-700"
                )}
              />
              <span
                className={cn(
                  "truncate transition-colors",
                  isActive ? "text-primary-600" : "text-black-secondary"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4">
        <div className="py-4.5 flex w-full items-center gap-2 rounded-md bg-neutral-300 px-3.5">
          <span className="bg-primary-600 size-12.5 flex items-center justify-center rounded-sm font-medium text-white">
            Go
          </span>

          <div
            className="text-black-secondary flex flex-1 items-center justify-between"
            aria-label="Open personal account menu"
          >
            <span className="text-xs font-medium">Personal Account</span>

            <button
              type="button"
              className="cursor-pointer rounded-sm px-1.5 py-1 transition-colors duration-300 hover:bg-neutral-600/50"
              aria-label="Toggle personal account"
              title="Toggle personal account dropdown"
            >
              <CaretUpDownIcon className="size-6 text-neutral-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

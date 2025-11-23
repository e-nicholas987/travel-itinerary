"use client";

import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/Button";
import { IMAGES } from "@/constants/images";
import { ROUTES } from "@/constants/routes";
import {
  BasketIcon,
  BellIcon,
  ChartPieSliceIcon,
  ChevronDownIcon,
  HandCoinsIcon,
  HomeIcon,
  ListChecksIcon,
  PlusSquareIcon,
  SearchIcon,
  WalletIcon,
} from "@/components/ui/icons";
import { InputField } from "@/components/ui";
import TopbarNavItem from "./TopbarNavItem";
import type { NavItem } from "./types";

const MAIN_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: ROUTES.HOME, Icon: HomeIcon },
  { label: "Dashboard", href: ROUTES.DASHBOARD, Icon: ChartPieSliceIcon },
  { label: "Wallet", href: ROUTES.WALLET, Icon: WalletIcon },
  { label: "Plan a trip", href: ROUTES.PLAN_TRIP, Icon: ListChecksIcon },
  {
    label: "Commission for life",
    href: ROUTES.COMMISSION_FOR_LIFE,
    Icon: HandCoinsIcon,
  },
];

const UTILITY_NAV_ITEMS: NavItem[] = [
  { label: "Notifications", href: ROUTES.NOTIFICATIONS, Icon: BellIcon },
  { label: "Carts", href: ROUTES.CARTS, Icon: BasketIcon },
  { label: "Create", href: ROUTES.CREATE, Icon: PlusSquareIcon },
];

export default function Topbar() {
  return (
    <div className="max-w-400 mx-auto px-5 2xl:px-10 h-full flex w-full items-center justify-between gap-6 xl:gap-8">
      <div className="flex w-full gap-7">
        <Link
          href={ROUTES.HOME}
          className="inline-flex items-center"
          aria-label="Go to home"
        >
          <div className="bg-primary-600 w-14.5 flex h-14 items-center justify-center rounded-sm">
            <Image
              src={IMAGES.logo}
              alt="Go logo"
              width={42}
              height={40}
              priority
            />
          </div>
        </Link>

        <InputField
          id="topbar-search"
          placeholder="Search"
          className="max-w-100 relative hidden w-full xl:block"
          containerClassName="h-full max-w-100"
          inputClassName="pl-11 bg-neutral-300 border-none h-full"
          icon={
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-6 -translate-y-1/2 text-neutral-700" />
          }
        />
      </div>

      <nav className="hidden items-center gap-6  lg:flex">
        {MAIN_NAV_ITEMS.map((item) => (
          <TopbarNavItem key={item.href} item={item} />
        ))}
      </nav>

      <div className="hidden h-12 w-px shrink-0 rounded-sm bg-neutral-600 lg:block" />

      <Link
        href={ROUTES.SUBSCRIBE}
        className={buttonVariants({
          variant: "primary",
          size: "sm",
          className: "hidden px-4 lg:flex",
        })}
      >
        Subscribe
      </Link>

      <div className="flex items-center gap-6">
        {UTILITY_NAV_ITEMS.map((item) => (
          <TopbarNavItem
            key={item.href}
            item={item}
            labelClassName="hidden min-w-[1500px]:block"
          />
        ))}

        <button
          type="button"
          aria-label="Open profile menu"
          className="flex items-center gap-3.5"
        >
          <Image
            src={IMAGES.userAvatar}
            alt="Profile"
            width={52}
            height={52}
            className="size-13 shrink-0 rounded-full object-cover"
          />
          <ChevronDownIcon className="size-6 text-neutral-700" />
        </button>
      </div>
    </div>
  );
}

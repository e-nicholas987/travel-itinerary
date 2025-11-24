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
import HamburgerMenu from "./HamburgerMenu";

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

const HAMBURGER_MENU_ITEMS: NavItem[] = [
  ...MAIN_NAV_ITEMS,
  ...UTILITY_NAV_ITEMS,
];

export default function Topbar() {
  return (
    <>
      <div className="max-w-400 mx-auto h-full w-full items-center justify-between gap-6 px-5 2lg:px-10 grid grid-cols-3 lg:flex lg:gap-8">
        <HamburgerMenu items={HAMBURGER_MENU_ITEMS} />
        <div className="flex justify-self-center lg:justify-self-auto lg:w-full gap-7">
          <Link
            href={ROUTES.HOME}
            className="inline-flex  items-center"
            aria-label="Go to home"
          >
            <div className="bg-primary-600 flex h-14 w-14.5 items-center justify-center rounded-sm">
              <Image
                src={IMAGES.logo}
                alt="Go logo"
                priority
                width={40}
                height={40}
                className="object-cover size-10 w-10"
              />
            </div>
          </Link>

          <InputField
            id="topbar-search"
            placeholder="Search"
            containerClassName="h-full max-w-100 hidden xl:block"
            inputClassName="h-full border-none bg-neutral-300 pl-11"
            icon={
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-6 -translate-y-1/2 text-neutral-700" />
            }
          />
        </div>

        <nav className="hidden items-center gap-6 lg:flex">
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

        <div className="flex items-center gap-6 justify-self-end lg:justify-self-auto">
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
    </>
  );
}

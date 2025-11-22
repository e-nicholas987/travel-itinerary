'use client';

import Image from 'next/image';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/Button';
import { IMAGES } from '@/constants/images';
import { ROUTES } from '@/constants/routes';
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
} from '@/components/ui/icons';
import TopbarNavItem from './TopbarNavItem';
import type { NavItem } from './types';

const MAIN_NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: ROUTES.HOME, Icon: HomeIcon },
  { label: 'Dashboard', href: ROUTES.DASHBOARD, Icon: ChartPieSliceIcon },
  { label: 'Wallet', href: ROUTES.WALLET, Icon: WalletIcon },
  { label: 'Plan a trip', href: ROUTES.PLAN_TRIP, Icon: ListChecksIcon },
  { label: 'Commission for life', href: ROUTES.COMMISSION_FOR_LIFE, Icon: HandCoinsIcon },
];

const UTILITY_NAV_ITEMS: NavItem[] = [
  { label: 'Notifications', href: ROUTES.NOTIFICATIONS, Icon: BellIcon },
  { label: 'Carts', href: ROUTES.CARTS, Icon: BasketIcon },
  { label: 'Create', href: ROUTES.CREATE, Icon: PlusSquareIcon },
];

export default function Topbar() {
  return (
    <header className="bg-white p-10">
      <div className="container mx-auto flex items-center justify-between gap-8">
        <div className="flex w-full gap-7">
          <Link href={ROUTES.HOME} className="inline-flex items-center" aria-label="Go to home">
            <div className="bg-brand-600 w-14.5 flex h-14 items-center justify-center rounded-sm">
              <Image src={IMAGES.logo} alt="Go logo" width={42} height={40} priority />
            </div>
          </Link>

          <div className="max-w-100 relative w-full">
            <label className="sr-only" htmlFor="topbar-search">
              Search
            </label>
            <input
              id="topbar-search"
              type="text"
              placeholder="Search"
              className="placeholder:text-secondary h-full w-full rounded-sm bg-neutral-300 py-2 pl-11 pr-4 text-sm text-neutral-700"
            />
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-6 -translate-y-1/2 text-neutral-700" />
          </div>
        </div>

        <nav className="flex items-center gap-6">
          {MAIN_NAV_ITEMS.map((item) => (
            <TopbarNavItem key={item.href} item={item} />
          ))}
        </nav>

        <div className="h-12 w-px rounded-sm bg-neutral-600" />

        <Link
          href={ROUTES.SUBSCRIBE}
          className={buttonVariants({ variant: 'primary', size: 'sm', className: 'px-4' })}
        >
          Subscribe
        </Link>

        <div className="flex items-center gap-6">
          {UTILITY_NAV_ITEMS.map((item) => (
            <TopbarNavItem key={item.href} item={item} />
          ))}

          <button
            type="button"
            aria-label="Open profile menu"
            className="flex items-center gap-3.5"
          >
            <Image
              src={IMAGES.avatar}
              alt="Profile"
              width={52}
              height={52}
              className="size-13 shrink-0 rounded-full object-cover"
            />
            <ChevronDownIcon className="size-6 text-neutral-700" />
          </button>
        </div>
      </div>
    </header>
  );
}

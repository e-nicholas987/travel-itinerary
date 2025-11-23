"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { cn } from "@/lib/utils/cn";
import { ROUTES } from "@/constants/routes";
import type { NavItem } from "./types";

interface TopbarNavItemProps {
  item: NavItem;
  labelClassName?: string;
}

export default function TopbarNavItem({
  item,
  labelClassName,
}: TopbarNavItemProps) {
  const pathname = usePathname();
  const isActive = useMemo(() => {
    if (item.href === ROUTES.HOME) {
      return pathname === item.href;
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  }, [item.href, pathname]);

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className="group flex flex-col items-center gap-2"
    >
      <item.Icon
        className={
          isActive
            ? "text-black-primary"
            : " group-hover:text-primary-600 text-neutral-700 transition-colors duration-300"
        }
      />
      <span
        className={cn(
          " whitespace-nowrap text-[.8125rem] font-medium leading-6 2xl:text-base",
          isActive
            ? "text-black-primary"
            : "text-black-secondary  group-hover:text-primary-600 transition-colors duration-300",
          labelClassName
        )}
      >
        {item.label}
      </span>
    </Link>
  );
}

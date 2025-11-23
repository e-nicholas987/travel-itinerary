"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { cn } from "@/lib/utils/cn";
import { ROUTES } from "@/constants/routes";
import type { NavItem } from "./types";
import { useActiveRoute } from "@/hooks/useActiveRoute";

interface TopbarNavItemProps {
  item: NavItem;
  labelClassName?: string;
}

export default function TopbarNavItem({
  item,
  labelClassName,
}: TopbarNavItemProps) {
  const isActive = useActiveRoute();

  return (
    <Link
      href={item.href}
      aria-current={isActive(item.href) ? "page" : undefined}
      className="group flex flex-col items-center gap-2"
    >
      <item.Icon
        className={
          isActive(item.href)
            ? "text-black-primary"
            : " group-hover:text-primary-600 text-neutral-700 transition-colors duration-300"
        }
      />
      <span
        className={cn(
          " whitespace-nowrap text-[.8125rem] font-medium leading-6 2xl:text-base",
          isActive(item.href)
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

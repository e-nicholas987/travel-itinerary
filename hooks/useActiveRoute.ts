"use client";

import { usePathname } from "next/navigation";
import { useCallback } from "react";

export function useActiveRoute(): (route: string) => boolean {
  const pathname = usePathname();

  const isActive = useCallback(
    (route: string) => {
      if (!pathname) return false;
      if (route === "/") return pathname === "/";
      return pathname === route || pathname.startsWith(`${route}/`);
    },
    [pathname]
  );

  return isActive;
}

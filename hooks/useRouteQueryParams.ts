"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type RouteQueryUpdate = Record<
  string,
  string | string[] | number | null | undefined
>;

export const useRouteQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getParam = useCallback(
    <T extends string | undefined>(key: string): T => {
      return (searchParams.get(key) || undefined) as T;
    },
    [searchParams]
  );

  const getAllParams = useCallback(
    (key: string): string[] => searchParams.getAll(key),
    [searchParams]
  );

  const setParams = useCallback(
    (updates: RouteQueryUpdate) => {
      const nextSearchParams = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        nextSearchParams.delete(key);

        if (typeof value === "string") {
          nextSearchParams.set(key, value);
        } else if (Array.isArray(value)) {
          console.log("isArray", value);
          value.forEach((v) => nextSearchParams.append(key, v));
        }
      });

      const queryString = nextSearchParams.toString();
      const url = queryString ? `${pathname}?${queryString}` : pathname;

      router.replace(url);
    },
    [pathname, router, searchParams]
  );

  const deleteParams = useCallback(
    (keys: string[]) => {
      const nextSearchParams = new URLSearchParams(searchParams.toString());
      keys.forEach((key) => nextSearchParams.delete(key));
      const queryString = nextSearchParams.toString();
      const url = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(url);
    },
    [pathname, router, searchParams]
  );

  const clearAllParams = useCallback(() => {
    router.replace(pathname);
  }, [pathname, router]);

  return {
    getParam,
    getAllParams,
    setParams,
    deleteParams,
    clearAllParams,
  };
};

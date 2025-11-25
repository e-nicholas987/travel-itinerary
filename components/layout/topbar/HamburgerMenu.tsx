"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";

import type { NavItem } from "./types";
import { ROUTES } from "@/constants/routes";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { useActiveRoute } from "@/hooks";

export default function HamburgerMenu({ items }: { items: NavItem[] }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isActiveRoute = useActiveRoute();

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        aria-label="Open main menu"
        className="lg:hidden inline-flex items-center size-14.5 justify-center rounded-sm bg-white p-2 text-neutral-900 shadow-sm"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Menu className="size-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />
            <motion.div
              className="fixed  inset-y-0 left-0 z-50 flex w-72 max-w-full flex-col gap-4 bg-white px-4 pb-6 pt-8 shadow-lg"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 360, damping: 36 }}
              onClick={(event) => event.stopPropagation()}
            >
              <nav className="space-y-2">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-sm px-3 py-4 text-sm font-medium text-black-secondary",

                      isActiveRoute(item.href)
                        ? "bg-primary-600/10"
                        : " hover:bg-neutral-300/60"
                    )}
                    onClick={closeMenu}
                  >
                    <item.Icon className="size-5 text-neutral-700" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>

              <div className="mt-4 border-t border-neutral-200 pt-4">
                <Link
                  href={ROUTES.SUBSCRIBE}
                  className={buttonVariants({
                    variant: "primary",
                    size: "md",
                    className: "w-full justify-center",
                  })}
                  onClick={closeMenu}
                >
                  Subscribe
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

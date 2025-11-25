import Link from "next/link";

import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center justify-center p-6">
      <div className="max-w-md text-center space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black-secondary">
          404 error
        </p>
        <h1 className="text-2xl font-semibold text-black-primary">
          Page not found
        </h1>
        <p className="text-sm font-medium text-black-secondary">
          The page you’re looking for doesn’t exist or may have been moved.
          Check the URL, or return to your trip dashboard.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            href={ROUTES.PLAN_TRIP}
            className="inline-flex items-center justify-center rounded-sm border border-primary-1100 bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Back to trip itineraries
          </Link>
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center justify-center rounded-sm border border-neutral-500/60 bg-white px-4 py-2 text-sm font-semibold text-black-secondary hover:bg-neutral-100"
          >
            Go to home
          </Link>
        </div>
      </div>
    </section>
  );
}


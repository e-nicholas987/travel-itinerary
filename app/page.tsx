import { buttonVariants } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description: "Plan your trip with ease",
};

export default function Home() {
  return (
    <section className="flex flex-1 gap-4 bg-neutral-300 flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">
        Hello 👋🏽, welcome to Itenary Planner by Emeka
      </h1>
      <Link
        href={ROUTES.PLAN_TRIP}
        className={buttonVariants({ variant: "primary" })}
      >
        Plan a trip
      </Link>
    </section>
  );
}

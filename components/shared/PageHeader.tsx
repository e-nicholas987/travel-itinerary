import type { ComponentType } from "react";
import Link from "next/link";

import { ArrowLeftIcon } from "@/components/ui/icons";

type PageHeaderWithBackProps = {
  title: string;
  description: string;
  backHref: string;
  backLabel: string;
  icon: ComponentType<{ className?: string }>;
};

export default function PageHeaderWithBack({
  title,
  description,
  backHref,
  backLabel,
  icon: Icon,
}: PageHeaderWithBackProps) {
  return (
    <header className="mb-6 sm:mb-8 flex flex-col gap-4 border-b border-neutral-300 pb-6">
      <div className="flex items-center justify-between gap-4">
        <Link
          href={backHref}
          className="inline-flex -ml-4 -mt-2 py-2 px-4 rounded-sm  items-center gap-2 text-sm font-medium text-black-secondary transition-colors hover:bg-primary-600/10 hover:text-primary-600 duration-300"
        >
          <ArrowLeftIcon className="size-5" />
          {backLabel}
        </Link>
      </div>

      <h1 className="flex items-center gap-2 text-xl font-semibold leading-7 tracking-[-0.02em] md:text-2xl">
        <Icon className="size-6 text-primary-600" />
        {title}
      </h1>
      <p className="mt-1 text-sm font-medium text-black-secondary">
        {description}
      </p>
    </header>
  );
}

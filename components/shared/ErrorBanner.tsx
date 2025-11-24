import type React from "react";
import { AlertTriangleIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type ErrorBannerProps = {
  title?: string;
  message?: string;
  className?: string;
};

export default function ErrorBanner({
  title = "Something went wrong",
  message,
  className,
}: ErrorBannerProps) {
  const [showBanner, setShowBanner] = useState<boolean>(true);

  useEffect(() => {
    if (message) {
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, [message]);

  if (!showBanner) {
    return null;
  }

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "mb-4 flex bg-error-100 items-start gap-3 rounded-sm border border-error-200 bg-error-50 px-4 py-3 text-sm text-red-600/70",
        className
      )}
    >
      <span className="mt-0.5">
        <AlertTriangleIcon className="size-4" />
      </span>

      <div className="flex-1 space-y-1">
        {title && <p className="font-semibold">{title}</p>}

        {message && <p className="text-xs md:text-sm">{message}</p>}
      </div>

      <button
        type="button"
        onClick={() => setShowBanner(false)}
        className="ml-2 mt-0.5 inline-flex h-5 cursor-pointer w-5 items-center justify-center rounded-sm text-red-600/70 hover:bg-error-100"
        aria-label="Dismiss error"
      >
        <XIcon className="size-3.5" />
      </button>
    </div>
  );
}

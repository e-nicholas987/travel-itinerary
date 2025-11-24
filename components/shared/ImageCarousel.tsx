"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils/cn";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";

type ImageCarouselProps = {
  images: string[];
  className?: string;
};

export default function ImageCarousel({
  images,
  className,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasImages = images.length > 0;
  const safeIndex = hasImages ? currentIndex % images.length : 0;
  const currentSrc = hasImages ? images[safeIndex] : "";

  const showControls = images.length > 1;

  const goPrev = () => {
    if (!hasImages) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goNext = () => {
    if (!hasImages) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      className={cn(
        "relative h-61.5 w-58 shrink-0 overflow-hidden rounded-sm bg-neutral-300",
        className
      )}
    >
      {hasImages ? (
        <Image
          src={currentSrc}
          alt={currentSrc}
          fill
          className="object-cover"
          sizes="14.5rem"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs text-black-secondary">
          No image
        </div>
      )}

      {showControls && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-1 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-black shadow-sm hover:bg-white"
            aria-label="Previous image"
          >
            <ArrowLeftIcon className="size-3" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-1 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-black shadow-sm hover:bg-white"
            aria-label="Next image"
          >
            <ArrowRightIcon className="size-3" />
          </button>
        </>
      )}
    </div>
  );
}

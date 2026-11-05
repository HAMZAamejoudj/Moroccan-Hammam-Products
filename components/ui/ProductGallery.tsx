"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

export type GalleryImage = {
  src: string;
  alt: string;
};

export function ProductGallery({
  images,
  title,
}: {
  images: GalleryImage[];
  title: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeImage = images[selectedIndex] ?? images[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gold/20 bg-stone-100 shadow-md">
        {activeImage ? (
          <Image
            src={activeImage.src}
            alt={activeImage.alt || title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-all duration-500 ease-in-out"
          />
        ) : null}
      </div>

      {/* Thumbnails */}
      {images.length > 1 ? (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-thin">
          {images.map((img, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={img.src + idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={cn(
                  "relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                  isSelected
                    ? "border-primary shadow-md ring-2 ring-gold/40"
                    : "border-stone-200 opacity-70 hover:opacity-100 hover:border-gold/50",
                )}
                aria-label={`View photo ${idx + 1}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt || `${title} photo ${idx + 1}`}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}


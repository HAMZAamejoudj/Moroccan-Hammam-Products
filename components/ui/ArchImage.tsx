import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/cn";

export function ArchImage({
  className,
  imageClassName,
  alt,
  ...props
}: ImageProps & { imageClassName?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-t-[999px] rounded-b-lg bg-surface shadow-lg ring-1 ring-gold/20",
        className,
      )}
    >
      <Image
        {...props}
        alt={alt}
        className={cn("h-full w-full object-cover", imageClassName)}
      />
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PlaceholderText } from "@/components/ui/PlaceholderText";
import type { Locale } from "@/lib/i18n/config";

export function ProductCard({
  title,
  description,
  image,
  contactHref = "/contact",
  detailHref,
  ctaLabel = "Request a quote",
  viewDetailsLabel,
  locale,
}: {
  title: string;
  description: string;
  image?: { src: string; alt: string };
  contactHref?: string;
  detailHref?: string;
  ctaLabel?: string;
  viewDetailsLabel?: string;
  locale: Locale;
}) {
  const detailsText =
    viewDetailsLabel ??
    (locale === "ar"
      ? "عرض التفاصيل ←"
      : locale === "fr"
      ? "Voir détails →"
      : "View details →");

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-gold/15 bg-white shadow-sm ring-1 ring-ink/5 transition hover:border-gold/40 hover:shadow-md">
      {image ? (
        detailHref ? (
          <Link
            href={detailHref}
            className="relative aspect-[4/3] overflow-hidden bg-stone-100 block"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-[1.04]"
            />
          </Link>
        ) : (
          <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          </div>
        )
      ) : null}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-serif text-lg font-bold leading-snug text-ink transition group-hover:text-primary md:text-xl">
          {detailHref ? (
            <Link href={detailHref} className="hover:underline">
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/85">
          <PlaceholderText text={description} locale={locale} />
        </p>
        <div className="mt-5 flex flex-col gap-2 pt-1 sm:flex-row sm:items-center">
          {detailHref ? (
            <Button
              href={detailHref}
              variant="primary"
              className="w-full text-center text-xs py-2 sm:flex-1"
            >
              {detailsText}
            </Button>
          ) : null}
          <Button
            href={contactHref}
            variant="secondary"
            className="w-full text-center text-xs py-2 sm:flex-1"
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </article>
  );
}

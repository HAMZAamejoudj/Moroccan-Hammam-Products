import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { unwrapBracketPlaceholders } from "@/lib/parse";

export function ProductCard({
  title,
  description,
  image,
  contactHref = "/contact",
  ctaLabel = "Request a quote",
}: {
  title: string;
  description: string;
  image?: { src: string; alt: string };
  contactHref?: string;
  ctaLabel?: string;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-gold/15 bg-white shadow-sm ring-1 ring-ink/5 transition hover:border-gold/40 hover:shadow-md">
      {image ? (
        <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-serif text-lg leading-snug text-ink md:text-xl">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/80">
          {unwrapBracketPlaceholders(description)}
        </p>
        <div className="mt-5 pt-1">
          <Button href={contactHref} variant="secondary" className="w-full text-sm">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </article>
  );
}

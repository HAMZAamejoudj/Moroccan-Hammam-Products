import { FaqItem } from "@/lib/parse";
import { cn } from "@/lib/cn";
import { PlaceholderText } from "@/components/ui/PlaceholderText";
import type { Locale } from "@/lib/i18n/config";
import { localeDirection } from "@/lib/i18n/config";

export function FAQ({
  items,
  title = "Frequently asked questions",
  locale = "en",
}: {
  items: FaqItem[];
  title?: string;
  locale?: Locale;
}) {
  return (
    <section
      className="bg-white py-10 md:py-12"
      aria-labelledby="faq-heading"
      dir={localeDirection(locale)}
      lang={locale}
    >
      <div className="mx-auto max-w-3xl px-4">
        <h2 id="faq-heading" className="font-serif text-3xl text-ink md:text-4xl">
          {title}
        </h2>
        <div className="mt-10 divide-y divide-gold/15">
          {items.map((item) => (
            <FaqRow key={item.question} item={item} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqRow({ item, locale }: { item: FaqItem; locale: Locale }) {
  return (
    <details className="group py-5">
      <summary
        className={cn(
          "flex cursor-pointer list-none items-start justify-between gap-4 text-start text-base font-medium text-ink",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          "[&::-webkit-details-marker]:hidden",
        )}
      >
        <span className="pr-2">{item.question}</span>
        <span
          className="mt-0.5 shrink-0 text-gold transition-transform duration-200 group-open:rotate-180"
          aria-hidden
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </summary>
      <div className="mt-3 pr-8 text-sm leading-relaxed text-ink/85 md:text-base">
        <PlaceholderText text={item.answer} locale={locale} />
      </div>
    </details>
  );
}

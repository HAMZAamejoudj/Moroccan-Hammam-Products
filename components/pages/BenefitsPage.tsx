import Image from "next/image";
import { getPageCached } from "@/lib/content";
import { applyPageInternalLinks } from "@/lib/internal-links";
import { homePath, localeDirection, type Locale } from "@/lib/i18n/config";
import { getNavLabels } from "@/lib/i18n/messages";
import {
  parseBoldBulletList,
  parseFaq,
  parseSectionIndex,
  getSectionById,
  parseNumberedSteps,
  parseSubsectionEntries,
  unwrapBracketPlaceholders,
} from "@/lib/parse";
import { benefitProductImagesById } from "@/lib/images";
import { siteImages } from "@/lib/images";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderText } from "@/components/ui/PlaceholderText";
import { FAQ } from "@/components/sections/FAQ";
import { StepsTimeline } from "@/components/sections/StepsTimeline";

function benefitsCopy(locale: Locale, text: string) {
  return applyPageInternalLinks("benefits", text, locale);
}

export async function BenefitsPage({ locale }: { locale: Locale }) {
  const page = await getPageCached("benefits", locale);
  const sections = parseSectionIndex(page.body);
  const intro = page.body.replace(/^#\s+.+\n?/, "").split(/\n## /)[0].trim();
  const nav = getNavLabels(locale);

  const products = getSectionById(sections, "products");
  const ritual = getSectionById(sections, "ritual");
  const business = getSectionById(sections, "business");
  const storage = getSectionById(sections, "storage");
  const faq = getSectionById(sections, "faq");

  const productEntries = parseSubsectionEntries(products?.body ?? "");
  const businessBullets = parseBoldBulletList(business?.body ?? "");

  return (
    <div className="bg-white" dir={localeDirection(locale)} lang={locale}>
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-28">
        <Breadcrumbs
          items={[
            { label: nav.home, href: homePath(locale) },
            { label: nav.benefits },
          ]}
        />
        <h1 className="max-w-3xl font-serif text-4xl text-ink md:text-5xl">{page.h1}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink/85">
          <PlaceholderText text={benefitsCopy(locale, intro)} />
        </p>
      </div>

      <section className="border-t border-gold/10 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title={products?.title ?? ""} className="max-w-none" />
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {productEntries.map(({ id, title, body }) => {
              const imgEntry = id ? benefitProductImagesById[id] : undefined;
              const imgs = imgEntry
                ? Array.isArray(imgEntry)
                  ? imgEntry
                  : [imgEntry]
                : [];
              return (
                <article
                  key={id ?? title}
                  className="flex h-full flex-col overflow-hidden rounded-xl border border-gold/15 bg-white shadow-sm ring-1 ring-ink/5"
                >
                  {imgs.length > 0 ? (
                    <div
                      className={
                        imgs.length > 1
                          ? "grid grid-cols-2 gap-0.5 bg-stone-100"
                          : "relative aspect-[16/10] bg-stone-100"
                      }
                    >
                      {imgs.map((img) =>
                        imgs.length > 1 ? (
                          <div key={img.src} className="relative aspect-[4/5]">
                            <Image
                              src={img.src}
                              alt={img.alt}
                              fill
                              className="object-cover"
                              sizes="(max-width:768px) 50vw, 25vw"
                            />
                          </div>
                        ) : (
                          <Image
                            key={img.src}
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width:768px) 100vw, 50vw"
                          />
                        ),
                      )}
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-6">
                    <h3
                      id={id}
                      className="scroll-mt-28 font-serif text-xl text-ink"
                    >
                      {title}
                    </h3>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink/85">
                      {body
                        .split("\n")
                        .filter((l) => l.startsWith("- "))
                        .map((l) => (
                          <li key={l}>
                            <PlaceholderText text={l.replace(/^-\s+/, "")} />
                          </li>
                        ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {ritual ? (
        <section className="border-t border-gold/10 bg-cream/40 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeading title={ritual.title} className="max-w-none" />
            <StepsTimeline
              className="mt-10"
              steps={parseNumberedSteps(ritual.body).map((s) => benefitsCopy(locale, s))}
            />
          </div>
        </section>
      ) : null}

      <section className="border-t border-gold/10 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title={business?.title ?? ""} className="max-w-none" />
          <ul className="mt-8 grid gap-6 md:grid-cols-2 md:gap-x-10 md:gap-y-5">
            {businessBullets.map(({ title, body }) => (
              <li key={title} className="text-sm leading-relaxed text-ink/85 md:text-base">
                {title ? (
                  <>
                    <span className="font-medium text-ink">{title}.</span>{" "}
                    {unwrapBracketPlaceholders(body)}
                  </>
                ) : (
                  unwrapBracketPlaceholders(body)
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 md:grid md:grid-cols-2 md:gap-10">
          <div>
            <SectionHeading title={storage?.title ?? ""} />
            <ul className="mt-6 space-y-2 text-sm text-ink/85">
              {(storage?.body ?? "")
                .split("\n")
                .filter((l) => l.startsWith("- "))
                .map((l) => (
                  <li key={l}>
                    <PlaceholderText text={l.replace(/^-\s+/, "")} />
                  </li>
                ))}
            </ul>
          </div>
          <Image
            src={siteImages.harvestLine.src}
            alt={siteImages.harvestLine.alt}
            width={560}
            height={420}
            className="rounded-lg object-cover shadow-md"
          />
        </div>
      </section>

      <FAQ items={parseFaq(faq?.body ?? "")} title={faq?.title ?? "FAQ"} />
    </div>
  );
}

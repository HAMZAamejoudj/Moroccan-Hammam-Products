import Image from "next/image";
import { getPageCached } from "@/lib/content";
import { homePath, localeDirection, type Locale } from "@/lib/i18n/config";
import { getNavLabels } from "@/lib/i18n/messages";
import {
  parseBoldBulletList,
  parseBulletList,
  parseButtons,
  parseSectionIndex,
  getSectionById,
} from "@/lib/parse";
import { siteImages } from "@/lib/images";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderText } from "@/components/ui/PlaceholderText";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";

export async function AboutPage({ locale }: { locale: Locale }) {
  const page = await getPageCached("about", locale);
  const sections = parseSectionIndex(page.body);
  const nav = getNavLabels(locale);
  const intro = page.body.replace(/^#\s+.+\n?/, "").split(/\n## /)[0];

  const origins = getSectionById(sections, "origins");
  const values = getSectionById(sections, "values");
  const team = getSectionById(sections, "team");
  const numbers = getSectionById(sections, "numbers");
  const workWithUs = getSectionById(sections, "work-with-us");

  return (
    <div className="bg-white" dir={localeDirection(locale)} lang={locale}>
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-28">
        <Breadcrumbs
          items={[
            { label: nav.home, href: homePath(locale) },
            { label: nav.about },
          ]}
        />
        <h1 className="max-w-3xl font-serif text-4xl font-bold tracking-tight text-ink md:text-5xl">{page.h1}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink/90">
          <PlaceholderText text={intro.split("\n\n")[0]} />
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[siteImages.workshopB, siteImages.arganPress, siteImages.bulkSupply].map((img) => (
            <div key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="33vw" />
            </div>
          ))}
        </div>

        <section className="mt-16 grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <SectionHeading title={origins?.title ?? ""} />
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-ink/90 md:text-base">
              {parseBoldBulletList(origins?.body ?? "").map(({ title, body }) => (
                <li key={title || body.slice(0, 24)}>
                  {title ? (
                    <>
                      <span className="font-bold text-ink">{title}:</span>{" "}
                      <PlaceholderText text={body} />
                    </>
                  ) : (
                    <PlaceholderText text={body} />
                  )}
                </li>
              ))}
            </ul>
          </div>
          <FadeIn className="flex justify-center md:justify-end">
            <Image
              src={siteImages.fullRange.src}
              alt={siteImages.fullRange.alt}
              width={520}
              height={400}
              className="rounded-lg object-cover shadow-sm"
            />
          </FadeIn>
        </section>

        {values ? (
          <section className="mt-16">
            <SectionHeading title={values.title} />
            <ul className="mt-6 grid gap-6 sm:grid-cols-3">
              {parseBulletList(values.body).map((item) => (
                <li
                  key={item.slice(0, 24)}
                  className="rounded-lg border border-gold/20 bg-cream/30 p-5 text-sm text-ink/90"
                >
                  <PlaceholderText text={item} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {team ? (
          <section className="mt-16">
            <SectionHeading title={team.title} />
            <div className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-ink/90">
              {team.body.split("\n\n").map((p) => (
                <p key={p.slice(0, 24)}>
                  <PlaceholderText text={p} />
                </p>
              ))}
            </div>
          </section>
        ) : null}

        {numbers ? (
          <section className="mt-16">
            <SectionHeading title={numbers.title} />
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {parseBulletList(numbers.body).map((item) => (
                <li
                  key={item.slice(0, 32)}
                  className="rounded-lg border border-gold/15 bg-cream/30 p-5 text-sm text-ink/90"
                >
                  <PlaceholderText text={item} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-16 pb-4 text-center">
          <SectionHeading title={workWithUs?.title ?? ""} className="mx-auto text-center" />
          <p className="mx-auto mt-4 max-w-2xl text-base text-ink/90">
            <PlaceholderText text={(workWithUs?.body ?? "").split("\n\n")[0]} />
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {parseButtons(workWithUs?.body ?? "").map((b) => (
              <Button
                key={b.label}
                href={b.href}
                variant={
                  b.href.includes("private") || b.href.includes("marque") || b.href.includes("علامة")
                    ? "secondary"
                    : "primary"
                }
              >
                {b.label}
              </Button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

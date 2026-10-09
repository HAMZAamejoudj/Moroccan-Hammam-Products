import Image from "next/image";
import { getPageCached } from "@/lib/content";
import { applyPageInternalLinks } from "@/lib/internal-links";
import { homePath, localeDirection, type Locale } from "@/lib/i18n/config";
import { getNavLabels, getPrivateLabelUi } from "@/lib/i18n/messages";
import {
  parseBoldBulletList,
  parseButtons,
  parseFaq,
  parseNumberedSteps,
  parseSectionIndex,
  getSectionById,
  unwrapBracketPlaceholders,
} from "@/lib/parse";
import { privateLabelImages } from "@/lib/images";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderText } from "@/components/ui/PlaceholderText";
import { Button } from "@/components/ui/Button";
import { MarkdownTable } from "@/components/ui/MarkdownTable";
import { StepsTimeline } from "@/components/sections/StepsTimeline";
import { FAQ } from "@/components/sections/FAQ";

function PlImage({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-stone-100 shadow-sm ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={750}
        priority={priority}
        className="h-full w-full object-cover"
        sizes="(max-width:768px) 100vw, 50vw"
      />
    </div>
  );
}

function privateLabelCopy(locale: Locale, text: string) {
  return locale === "en" ? applyPageInternalLinks("private-label", text) : text;
}

function isCatalogButton(label: string) {
  return /catalog|catalogue|قائمة المنتجات/i.test(label);
}

export async function PrivateLabelPage({ locale }: { locale: Locale }) {
  const page = await getPageCached("private-label", locale);
  const sections = parseSectionIndex(page.body);
  const nav = getNavLabels(locale);
  const plUi = getPrivateLabelUi(locale);
  const introBlock = page.body.replace(/^#\s+.+\n?/, "").split(/\n## /)[0];
  const intro = introBlock
    .split("\n")
    .filter((l) => !l.startsWith("Buttons:"))
    .join("\n")
    .trim();

  const products = getSectionById(sections, "products");
  const why = getSectionById(sections, "why");
  const howItWorks = getSectionById(sections, "how-it-works");
  const moq = getSectionById(sections, "moq");
  const packaging = getSectionById(sections, "packaging");
  const labels = getSectionById(sections, "labels");
  const mistakes = getSectionById(sections, "mistakes");
  const faq = getSectionById(sections, "faq");

  const whyBullets = parseBoldBulletList(why?.body ?? "");
  const mistakeBullets = parseBoldBulletList(mistakes?.body ?? "");

  return (
    <div className="bg-white" dir={localeDirection(locale)} lang={locale}>
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-28">
        <Breadcrumbs
          items={[
            { label: nav.home, href: homePath(locale) },
            { label: nav.privateLabel },
          ]}
        />
        <h1 className="max-w-3xl font-serif text-4xl text-ink md:text-5xl">{page.h1}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink/85">
          <PlaceholderText text={privateLabelCopy(locale, intro)} />
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {parseButtons(introBlock).map((b) => (
            <Button
              key={b.label}
              href={b.href.includes("catalog") ? "/contact" : b.href}
              variant={isCatalogButton(b.label) ? "secondary" : "primary"}
            >
              {b.label}
            </Button>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <PlImage
            src={privateLabelImages.formulations.src}
            alt={privateLabelImages.formulations.alt}
            className="aspect-[4/3] sm:col-span-2 sm:aspect-[16/10]"
            priority
          />
          <PlImage
            src={privateLabelImages.labeledDropperBottles.src}
            alt={privateLabelImages.labeledDropperBottles.alt}
            className="aspect-[4/3]"
          />
        </div>
      </div>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title={products?.title ?? ""} className="max-w-none" />
          <div className="mt-8 overflow-x-auto">
            <MarkdownTable markdown={products?.body ?? ""} />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <PlImage
              src={privateLabelImages.bulkTubs.src}
              alt={privateLabelImages.bulkTubs.alt}
              className="aspect-[4/3]"
            />
            <PlImage
              src={privateLabelImages.brandedBatch.src}
              alt={privateLabelImages.brandedBatch.alt}
              className="aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title={why?.title ?? ""} className="max-w-none" />
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {whyBullets.map(({ title, body }) => (
              <li key={title} className="text-sm leading-relaxed text-ink/85 md:text-base">
                <span className="font-medium text-ink">{title}.</span>{" "}
                {unwrapBracketPlaceholders(body)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 md:flex-row md:items-start md:gap-14">
          <SectionHeading title={howItWorks?.title ?? ""} className="md:max-w-xs md:shrink-0" />
          <StepsTimeline
            className="w-full md:flex-1"
            steps={parseNumberedSteps(howItWorks?.body ?? "").map((s) =>
              unwrapBracketPlaceholders(s.replace(/\*\*(.+?)\*\*/g, "$1")),
            )}
          />
        </div>
        <div className="mx-auto mt-10 grid max-w-6xl gap-6 px-4 md:grid-cols-2">
          <PlImage
            src={privateLabelImages.labeledSerumLine.src}
            alt={privateLabelImages.labeledSerumLine.alt}
            className="aspect-[16/10]"
          />
          <PlImage
            src={privateLabelImages.palletExport.src}
            alt={privateLabelImages.palletExport.alt}
            className="aspect-[16/10]"
          />
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
          <div>
            <SectionHeading title={moq?.title ?? ""} />
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink/85 md:text-base">
              {(moq?.body ?? "")
                .split("\n")
                .filter((l) => l.startsWith("- "))
                .map((line) => (
                  <p key={line.slice(0, 24)}>
                    {unwrapBracketPlaceholders(line.replace(/^-\s+/, ""))}
                  </p>
                ))}
            </div>
          </div>
          <PlImage
            src={privateLabelImages.bulkTubs.src}
            alt={privateLabelImages.bulkTubs.alt}
            className="aspect-[4/3]"
          />
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 md:grid-cols-2">
          <PlImage
            src={privateLabelImages.labeledSerumLine.src}
            alt={privateLabelImages.labeledSerumLine.alt}
            className="aspect-[4/3] md:order-2"
          />
          <div className="md:order-1">
            <SectionHeading title={packaging?.title ?? ""} />
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/85 md:text-base">
              {(packaging?.body ?? "")
                .split("\n")
                .filter((l) => l.startsWith("- "))
                .map((line) => (
                  <li key={line}>{unwrapBracketPlaceholders(line.replace(/^-\s+/, ""))}</li>
                ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title={labels?.title ?? ""} className="max-w-none" />
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink/85 md:text-base">
            <PlaceholderText text={labels?.body ?? ""} />
          </p>
          <div className="mt-8">
            <PlImage
              src={privateLabelImages.labeledDropperBottles.src}
              alt={privateLabelImages.labeledDropperBottles.alt}
              className="aspect-[21/9] max-w-4xl"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title={mistakes?.title ?? ""} className="max-w-none" />
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {mistakeBullets.map(({ title, body }) => (
              <li key={title} className="text-sm leading-relaxed text-ink/85 md:text-base">
                <span className="font-medium text-ink">{title}.</span> {body}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FAQ items={parseFaq(faq?.body ?? "")} title={faq?.title} />

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-4 text-center">
        <Button href="/contact">{plUi.startProjectFooter}</Button>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { getPageCached } from "@/lib/content";
import { blogPostPath, type Locale } from "@/lib/i18n/config";
import { getHomeUi } from "@/lib/i18n/messages";
import {
  firstParagraphAfterH1,
  parseAudienceCards,
  parseButtons,
  parseFaq,
  parseNumberedSteps,
  parseSectionIndex,
  getSectionById,
  parseSubsections,
  stripEditorNotes,
  contentParagraphs,
} from "@/lib/parse";
import { applyPageInternalLinks } from "@/lib/internal-links";
import { homeProductCardImages, siteImages } from "@/lib/images";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderText } from "@/components/ui/PlaceholderText";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProductCard } from "@/components/sections/ProductCard";
import { StepsTimeline } from "@/components/sections/StepsTimeline";
import { FAQ } from "@/components/sections/FAQ";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageSection } from "@/components/ui/PageSection";
import { getSiteConfig } from "@/lib/site-config";
import { whatsappUrl } from "@/lib/whatsapp-url";

function homeCopy(locale: Locale, text: string) {
  return applyPageInternalLinks("home", text, locale);
}

export async function HomePage({ locale }: { locale: Locale }) {
  const ui = getHomeUi(locale);
  const page = await getPageCached("home", locale);
  const sections = parseSectionIndex(page.body);
  const heroIntro = homeCopy(locale, firstParagraphAfterH1(page.body));
  const heroBlock = page.body.split(/\n## /)[0];
  const trustMatch = heroBlock.match(/Trust bar:\s*(.+)/);
  const trustItems = trustMatch
    ? trustMatch[1].split("·").map((s) => s.trim())
    : [];
  const heroButtons = parseButtons(heroBlock);

  const products = getSectionById(sections, "products");
  const audience = getSectionById(sections, "audience");
  const privateLabel = getSectionById(sections, "private-label");
  const ordering = getSectionById(sections, "ordering");
  const why = getSectionById(sections, "why");
  const faq = getSectionById(sections, "faq");
  const productParts = parseSubsections(products?.body ?? "");
  const productIntro = productParts.get("__intro__") ?? "";

  const config = getSiteConfig();
  const wa = whatsappUrl(config.whatsapp);

  const productEntries = [...productParts.entries()].filter(([k]) => k !== "__intro__");

  return (
    <>
      <section
        suppressHydrationWarning
        dir="ltr"
        className="relative isolate flex min-h-[72vh] items-center sm:min-h-[78vh] lg:min-h-[82vh] lg:max-h-[880px]"
      >
        <Image
          src={siteImages.heroHome.src}
          alt={siteImages.heroHome.alt}
          fill
          sizes="100vw"
          className="z-0 object-cover object-[20%_center] md:object-left"
          priority
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-cream/95 via-cream/50 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/5"
          aria-hidden
        />
        <div className="relative z-[2] mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 pb-12 pt-24 md:grid-cols-2 md:pb-16 md:pt-28">
          <div className="hidden md:block" aria-hidden />
          <div
            dir={locale === "ar" ? "rtl" : "ltr"}
            lang={locale}
            className="w-full max-w-xl justify-self-stretch rounded-2xl bg-white/95 p-7 text-start shadow-2xl ring-1 ring-ink/10 md:justify-self-end md:p-9 lg:max-w-lg lg:p-10"
          >
            <p
              className={
                locale === "ar"
                  ? "text-sm font-semibold text-accent"
                  : "text-xs font-semibold uppercase tracking-[0.25em] text-accent"
              }
            >
              {ui.heroEyebrow}
            </p>
            <h1 className="mt-3 font-serif text-[2rem] leading-[1.08] text-ink sm:text-4xl md:text-[2.75rem] lg:text-5xl">
              {page.h1}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-ink/85 md:mt-6 md:text-[1.05rem] lg:leading-7">
              <PlaceholderText text={heroIntro} />
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-8">
              {heroButtons.map((b) => (
                <Button
                  key={b.label}
                  href={b.href === "whatsapp" ? wa : b.href}
                  variant={/samples|échantillon|عينات/i.test(b.label) ? "secondary" : "primary"}
                  external={b.href.startsWith("http")}
                  className="w-full sm:w-auto"
                >
                  {b.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="bg-white" dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
      <TrustBar items={trustItems} />

      <PageSection className="pt-16 md:pt-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title={products?.title ?? ""} />
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/85">
            <PlaceholderText text={homeCopy(locale, productIntro)} />
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productEntries.map(([title, desc], i) => (
              <ProductCard
                key={title}
                title={title}
                description={stripEditorNotes(desc)}
                image={homeProductCardImages[i] ?? homeProductCardImages[0]}
                contactHref="/contact"
                ctaLabel={ui.requestQuote}
              />
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection>
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading eyebrow={ui.audienceEyebrow} title={audience?.title ?? ""} />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {parseAudienceCards(audience?.body ?? "").map((card) => (
              <div
                key={card.title}
                className="rounded-lg border border-gold/15 bg-white p-6 shadow-sm ring-1 ring-ink/5"
              >
                <h3 className="font-serif text-xl text-ink">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/85">
                  <PlaceholderText text={card.body} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={siteImages.privateLabelRun.src}
              alt={siteImages.privateLabelRun.alt}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
            />
          </div>
          <FadeIn>
            <SectionHeading title={privateLabel?.title ?? ""} />
            {contentParagraphs(privateLabel?.body ?? "").map((p, i) => (
              <p
                key={p.slice(0, 32)}
                className={i === 0 ? "mt-4 text-base leading-relaxed text-ink/85" : "mt-3 text-base leading-relaxed text-ink/85"}
              >
                <PlaceholderText text={homeCopy(locale, p)} />
              </p>
            ))}
            <div className="mt-6">
              <Button href={`/${locale}/private-label`}>{ui.explorePrivateLabel}</Button>
            </div>
          </FadeIn>
        </div>
      </PageSection>

      <PageSection>
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 md:flex-row md:items-start md:gap-14 lg:gap-20">
          <SectionHeading
            title={ordering?.title ?? ""}
            className="md:max-w-xs md:shrink-0 lg:max-w-sm"
          />
          <StepsTimeline
            className="w-full md:max-w-xl md:flex-1 lg:max-w-2xl"
            steps={parseNumberedSteps(ordering?.body ?? "")}
          />
        </div>
      </PageSection>

      <PageSection>
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title={why?.title ?? ""} />
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {parseAudienceCards((why?.body ?? "").replace(/^- \*\*/gm, "- **")).map((item) => (
              <li key={item.title} className="flex gap-3 text-sm leading-relaxed text-ink/85">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden />
                <span>
                  <strong className="font-medium text-ink">{item.title}:</strong>{" "}
                  <PlaceholderText text={item.body} />
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[siteImages.workshopA, siteImages.productionLine, siteImages.fullRange].map((img) => (
              <div key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="33vw" />
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      <FAQ items={parseFaq(faq?.body ?? "")} title={faq?.title} />

      <PageSection className="py-10 md:py-12">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm">
          <Link
            href={blogPostPath(locale, "moroccan-hammam-treatment-steps-spa")}
            className="link-underline"
          >
            {ui.blogLinkSteps}
          </Link>
          {" · "}
          <Link href={blogPostPath(locale, "kessa-glove-guide")} className="link-underline">
            {ui.blogLinkKessa}
          </Link>
        </div>
      </PageSection>
      </div>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { getPageCached } from "@/lib/content";
import {
  blogPostPath,
  homePath,
  localePagePath,
  productPath,
  productsPath,
  type Locale,
} from "@/lib/i18n/config";
import { getHomeUi } from "@/lib/i18n/messages";
import { PRODUCT_SLUGS } from "@/lib/products";
import {
  parseFaq,
  parseSectionIndex,
  getSectionById,
  parseSubsections,
  stripEditorNotes,
} from "@/lib/parse";
import { applyPageInternalLinks } from "@/lib/internal-links";
import { homeProductCardImages, siteImages } from "@/lib/images";
import { Button } from "@/components/ui/Button";
import { PlaceholderText } from "@/components/ui/PlaceholderText";
import { ProductCard } from "@/components/sections/ProductCard";
import { FAQ } from "@/components/sections/FAQ";
import { MoroccanPattern } from "@/components/layout/MoroccanPattern";
import { getSiteConfig } from "@/lib/site-config";
import { whatsappUrl } from "@/lib/whatsapp-url";
import {
  Droplets,
  Award,
  FileCheck,
  Truck,
  FlaskConical,
  Handshake,
  Tag,
  Plane,
  Globe,
  Settings2,
  Check,
  CheckCircle2,
} from "lucide-react";

function homeCopy(locale: Locale, text: string) {
  return applyPageInternalLinks("home", text, locale);
}

export async function HomePage({ locale }: { locale: Locale }) {
  const ui = getHomeUi(locale);
  const page = await getPageCached("home", locale);
  const sections = parseSectionIndex(page.body);
  const heroBlock = page.body.split(/\n## /)[0];
  const products = getSectionById(sections, "products");
  const faq = getSectionById(sections, "faq");
  const productParts = parseSubsections(products?.body ?? "");
  const productIntro = productParts.get("__intro__") ?? "";

  const config = getSiteConfig();
  const wa = whatsappUrl(config.whatsapp);
  const isRtl = locale === "ar";
  const dir = isRtl ? "rtl" : "ltr";

  const productEntries = [...productParts.entries()].filter(([k]) => k !== "__intro__");

  return (
    <div className="bg-[#fbf9f5]" dir={dir} lang={locale}>
      {/* 1. HERO SECTION */}
      <section
        suppressHydrationWarning
        dir="ltr"
        className="relative isolate overflow-hidden bg-gradient-to-b from-[#f5ede0] via-[#f9f5ed] to-[#fbf9f5] pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24"
      >
        <MoroccanPattern className="pointer-events-none absolute -right-10 -top-10 h-96 w-96 text-gold opacity-[0.07]" />
        <MoroccanPattern className="pointer-events-none absolute -left-10 bottom-0 h-96 w-96 text-gold opacity-[0.05]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Headlines & Actions */}
            <div dir={dir} lang={locale} className="lg:col-span-7">
              <p
                className={
                  isRtl
                    ? "text-sm font-bold uppercase tracking-wider text-accent"
                    : "text-xs font-extrabold uppercase tracking-[0.25em] text-accent"
                }
              >
                {ui.heroEyebrow}
              </p>
              {(() => {
                const commaDelimiter = page.h1.includes("، ") ? "، " : page.h1.includes(", ") ? ", " : null;
                if (commaDelimiter) {
                  const [h1Lead, ...h1TailParts] = page.h1.split(commaDelimiter);
                  const h1Tail = h1TailParts.join(commaDelimiter);
                  return (
                    <h1 className="mt-3 font-sans text-3xl font-extrabold leading-[1.12] text-ink sm:text-4xl md:text-5xl lg:text-[3.25rem] [text-wrap:balance]">
                      <span className="block">{h1Lead}{commaDelimiter.trim()}</span>
                      <span className="mt-1 block text-ink/90 sm:mt-2">{h1Tail}</span>
                    </h1>
                  );
                }
                return (
                  <h1 className="mt-3 font-sans text-3xl font-extrabold leading-[1.12] text-ink sm:text-4xl md:text-5xl lg:text-[3.25rem] [text-wrap:balance]">
                    {page.h1}
                  </h1>
                );
              })()}

              <p className="mt-5 text-base sm:text-lg leading-relaxed text-ink/80 max-w-2xl">
                {locale === "fr"
                  ? "Savon noir, argile rhassoul, gants kessa, eau de rose et huile d'argan : tout pour le rituel du hammam marocain, fabriqué au Maroc et expédié aux spas, instituts et marques de beauté du monde entier."
                  : isRtl
                    ? "صابون بلدي، طين الغاسول، أكياس الكيسة، ماء الورد وزيت الأركان: كل ما يحتاجه الحمام المغربي الأصيل، مصنوع بالمغرب ومشحون لمراكز السبا والماركات التجميلية في العالم."
                    : "Black soap, ghassoul clay, kessa gloves, rose water and argan oil: everything a real Moroccan hammam needs, made in Morocco and shipped to spas, retailers and beauty brands worldwide."}
              </p>

              {/* Quick trust pills */}
              <div className="mt-6 flex flex-wrap items-center gap-2.5 text-xs font-bold text-accent">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-gold/40 bg-white/80 px-3 py-1.5 shadow-2xs">
                  <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} /> Made in Morocco
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-gold/40 bg-white/80 px-3 py-1.5 shadow-2xs">
                  <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} /> COA & MSDS
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-gold/40 bg-white/80 px-3 py-1.5 shadow-2xs">
                  <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} /> Fast Worldwide Freight
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  href={localePagePath(locale, "contact")}
                  variant="primary"
                  className="w-full sm:w-auto font-bold px-8 py-3.5 shadow-md text-sm"
                >
                  {ui.requestQuote}
                </Button>
                <Button
                  href={`${localePagePath(locale, "contact")}?type=samples`}
                  variant="secondary"
                  className="w-full sm:w-auto font-bold px-8 py-3.5 border-2 shadow-2xs text-sm"
                >
                  {locale === "fr" ? "Demander des échantillons" : isRtl ? "طلب عينات" : "Ask for samples"}
                </Button>
              </div>
            </div>

            {/* Right Column: Clean Framed Showcase Image */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-ink/10">
                <Image
                  src="/images/hero.webp"
                  alt="Moroccan Hammam Ritual Wholesale Products"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FLOATING TRUST PILLARS (Inspired by reference image) */}
      <div className="-mt-8 relative z-20 mx-auto max-w-7xl px-4 sm:-mt-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: 100% Pure and Organic */}
          <div className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-lg ring-1 ring-ink/5 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-cream text-primary shadow-xs">
              <Droplets className="h-6 w-6 text-primary" strokeWidth={1.8} />
            </div>
            <h3 className="mt-4 font-sans text-base font-extrabold text-ink tracking-tight">
              {ui.trustPillars.pureOrganic.title}
            </h3>
            <p className="mt-1.5 text-xs font-medium leading-relaxed text-ink/75">
              {ui.trustPillars.pureOrganic.desc}
            </p>
          </div>

          {/* Card 2: Direct Moroccan Facility */}
          <div className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-lg ring-1 ring-ink/5 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-cream text-primary shadow-xs">
              <Award className="h-6 w-6 text-primary" strokeWidth={1.8} />
            </div>
            <h3 className="mt-4 font-sans text-base font-extrabold text-ink tracking-tight">
              {ui.trustPillars.directFactory.title}
            </h3>
            <p className="mt-1.5 text-xs font-medium leading-relaxed text-ink/75">
              {ui.trustPillars.directFactory.desc}
            </p>
          </div>

          {/* Card 3: Export Ready Compliance */}
          <div className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-lg ring-1 ring-ink/5 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-cream text-primary shadow-xs">
              <FileCheck className="h-6 w-6 text-primary" strokeWidth={1.8} />
            </div>
            <h3 className="mt-4 font-sans text-base font-extrabold text-ink tracking-tight">
              {ui.trustPillars.exportReady.title}
            </h3>
            <p className="mt-1.5 text-xs font-medium leading-relaxed text-ink/75">
              {ui.trustPillars.exportReady.desc}
            </p>
          </div>

          {/* Card 4: Low MOQ and Bulk Drums */}
          <div className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-lg ring-1 ring-ink/5 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-cream text-primary shadow-xs">
              <Truck className="h-6 w-6 text-primary" strokeWidth={1.8} />
            </div>
            <h3 className="mt-4 font-sans text-base font-extrabold text-ink tracking-tight">
              {ui.trustPillars.flexibleMoq.title}
            </h3>
            <p className="mt-1.5 text-xs font-medium leading-relaxed text-ink/75">
              {ui.trustPillars.flexibleMoq.desc}
            </p>
          </div>
        </div>
      </div>

      {/* 3. B2B NARRATIVE & FLAGSHIP COLLECTION */}
      <section className="mx-auto max-w-7xl px-4 pt-20 pb-16 sm:pt-24 sm:pb-20">
        {/* Split Narrative */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
              {locale === "fr" ? "FOURNISSEUR DIRECT MAROC" : isRtl ? "مورد مباشر من المصنع بالمغرب" : "DIRECT FACTORY SUPPLY"}
            </p>
            <h2 className="mt-2 font-sans text-2xl font-extrabold tracking-tight text-ink sm:text-3xl md:text-4xl lg:text-[2.65rem] lg:leading-[1.15]">
              {ui.b2bTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/80 md:text-lg">
              {ui.b2bSubtitle}
            </p>

            {/* Highlights List */}
            <div className="mt-6 space-y-3">
              {ui.b2bHighlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  <span className="text-sm font-medium leading-relaxed text-ink/85 sm:text-base">
                    {hl}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl ring-1 ring-ink/10">
              <Image
                src="/images/blog/moroccan-hammam-treatment-steps-spa.webp"
                alt="Moroccan Hammam Ritual Wholesale Ingredients"
                fill
                sizes="(max-width:1024px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* 6 Flagship Products Grid */}
        <div className="mt-20">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
              {locale === "fr" ? "COLLECTION GROSSISTE" : isRtl ? "تشكيلة الجملة والتصدير" : "WHOLESALE COLLECTION"}
            </p>
            <h3 className="mt-2 font-sans text-2xl font-extrabold tracking-tight text-ink sm:text-3xl md:text-4xl">
              {products?.title ?? "Everything for the hammam ritual, from one supplier"}
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-ink/75">
              <PlaceholderText text={homeCopy(locale, productIntro)} />
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productEntries.map(([title, desc], i) => {
              const slug = PRODUCT_SLUGS[i] ?? PRODUCT_SLUGS[0];
              return (
                <ProductCard
                  key={title}
                  title={title}
                  description={homeCopy(locale, stripEditorNotes(desc))}
                  image={homeProductCardImages[i] ?? homeProductCardImages[0]}
                  detailHref={productPath(locale, slug)}
                  contactHref={`${localePagePath(locale, "contact")}?product=${slug}`}
                  ctaLabel={ui.requestQuote}
                  locale={locale}
                />
              );
            })}
          </div>

          {/* Catalog Link Button */}
          <div className="mt-12 text-center">
            <Button
              href={productsPath(locale)}
              variant="secondary"
              className="!border-primary !bg-white !text-primary hover:!bg-primary hover:!text-white font-bold py-3 px-8 text-sm shadow-sm"
            >
              {ui.viewCatalogBtn} {isRtl ? "←" : "→"}
            </Button>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US & LABORATORY EXCELLENCE (with Cleanroom Photo) */}
      <section className="border-t border-stone-200/80 bg-stone-100/60 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Features (7 cols) */}
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                {locale === "fr" ? "QUALITÉ ET CERTIFICATIONS" : isRtl ? "الجودة والمعايير المخبرية" : "QUALITY & COMPLIANCE"}
              </p>
              <h2 className="mt-2 font-sans text-2xl font-extrabold tracking-tight text-ink sm:text-3xl md:text-4xl lg:text-[2.65rem] lg:leading-[1.15]">
                {ui.whyChooseTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink/80 md:text-lg">
                {ui.whyChooseSubtitle}
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {ui.whyFeatures.map((feat, i) => {
                  const featureIcons = [
                    <FlaskConical key="lab" className="h-5 w-5 text-primary" strokeWidth={2} />,
                    <Handshake key="coop" className="h-5 w-5 text-primary" strokeWidth={2} />,
                    <Tag key="oem" className="h-5 w-5 text-primary" strokeWidth={2} />,
                    <Plane key="freight" className="h-5 w-5 text-primary" strokeWidth={2} />,
                  ];
                  return (
                    <div
                      key={i}
                      className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-sm transition hover:shadow-md"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        {featureIcons[i] ?? <CheckCircle2 className="h-5 w-5 text-primary" />}
                      </div>
                      <h3 className="mt-3 font-sans text-base font-extrabold text-ink tracking-tight">
                        {feat.title}
                      </h3>
                      <p className="mt-1.5 text-xs font-medium leading-relaxed text-ink/75">
                        {feat.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cleanroom Lab Image (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl ring-1 ring-ink/10">
                <Image
                  src="/images/private-label/formulations.webp"
                  alt="Moroccan Cosmetics Laboratory Quality Control and Formulation"
                  fill
                  sizes="(max-width:1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TWO-COLUMN INFO BLOCK: SHIPPING & 4-STEP OEM PROCESS */}
      <section className="mx-auto max-w-7xl px-4 py-20 font-sans">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Column 1: International Shipping */}
          <div className="flex flex-col justify-between rounded-2xl border-2 border-stone-200/90 bg-white p-7 shadow-md transition hover:shadow-xl hover:border-primary/40 sm:p-9">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 ring-2 ring-blue-200/80">
                <Globe className="h-6 w-6 text-blue-700" strokeWidth={2.25} />
              </div>
              <h3 className="mt-5 font-sans text-2xl font-extrabold tracking-tight text-ink sm:text-[1.75rem] leading-snug">
                {ui.shippingTitle}
              </h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-ink/85 md:text-base">
                {ui.shippingSubtitle}
              </p>

              {/* Destination regions */}
              <div className="mt-6">
                <p className="text-xs font-extrabold uppercase tracking-wider text-accent">
                  {locale === "fr" ? "RÉGIONS DESSERVIES" : isRtl ? "المناطق المشمولة بالشحن" : "DELIVERY REGIONS"}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ui.shippingRegions.map((reg, i) => (
                    <span
                      key={i}
                      className="rounded-lg border-2 border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-bold text-ink transition hover:border-primary/50"
                    >
                      {reg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Compliance Badges */}
              <div className="mt-6 border-t border-stone-200 pt-5">
                <p className="text-xs font-extrabold uppercase tracking-wider text-accent">
                  {locale === "fr" ? "DOCUMENTS INCLUS" : isRtl ? "الوثائق المرفقة بالشحنات" : "EXPORT DOCUMENTS INCLUDED"}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-extrabold">
                  <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-emerald-900 border border-emerald-300">COA</span>
                  <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-emerald-900 border border-emerald-300">MSDS / SDS</span>
                  <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-emerald-900 border border-emerald-300">INCI List</span>
                  <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-emerald-900 border border-emerald-300">EUR.1 / Origin</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <Button href={localePagePath(locale, "contact")} variant="primary" className="w-full sm:w-auto font-bold tracking-wide">
                {ui.requestQuote}
              </Button>
            </div>
          </div>

          {/* Column 2: 4-Step OEM / Private Label Process */}
          <div className="flex flex-col justify-between rounded-2xl border-2 border-stone-200/90 bg-white p-7 shadow-md transition hover:shadow-xl hover:border-primary/40 sm:p-9">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 ring-2 ring-amber-200/80">
                <Settings2 className="h-6 w-6 text-amber-700" strokeWidth={2.25} />
              </div>
              <h3 className="mt-5 font-sans text-2xl font-extrabold tracking-tight text-ink sm:text-[1.75rem] leading-snug">
                {ui.oemTitle}
              </h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-ink/85 md:text-base">
                {ui.oemSubtitle}
              </p>

              {/* 4 Steps */}
              <div className="mt-6 space-y-4">
                {ui.oemSteps.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent font-sans text-xs font-black ring-1 ring-accent/30">
                      0{i + 1}
                    </span>
                    <div>
                      <h4 className="font-sans text-sm sm:text-base font-extrabold text-ink">
                        {step.title.replace(/^\d+[\.\-\s]+/, "")}
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm font-medium leading-relaxed text-ink/75">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4">
              <Button href={localePagePath(locale, "private-label")} variant="secondary" className="w-full sm:w-auto font-bold tracking-wide border-2">
                {ui.explorePrivateLabel} {isRtl ? "←" : "→"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HIGH-IMPACT DARK GREEN PARTNER BANNER (With 4-Photo Collage) */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary to-[#16291c] py-20 text-cream">
        <MoroccanPattern className="pointer-events-none absolute right-4 top-4 h-64 w-64 text-gold opacity-10" />
        <MoroccanPattern className="pointer-events-none absolute left-4 bottom-4 h-64 w-64 text-gold opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left copy */}
            <div className="lg:col-span-6">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
                {locale === "fr" ? "PARTENARIAT PROFESSIONNEL" : isRtl ? "شراكة تجارية موثوقة" : "PARTNER WITH US"}
              </p>
              <h2 className="mt-3 font-sans text-3xl font-extrabold tracking-tight text-cream sm:text-4xl md:text-5xl lg:leading-[1.15]">
                {ui.partnerTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-cream/90 md:text-lg">
                {ui.partnerSubtitle}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                  href={localePagePath(locale, "contact")}
                  variant="secondary"
                  className="!border-cream !bg-cream !text-primary hover:!bg-white font-bold shadow-xl"
                >
                  {ui.requestQuote}
                </Button>
                <Button
                  href={localePagePath(locale, "private-label")}
                  variant="secondary"
                  className="!border-gold/40 !bg-gold/20 !text-cream hover:!bg-gold/30 font-bold backdrop-blur-sm"
                >
                  {ui.explorePrivateLabel}
                </Button>
                <Button
                  href={wa}
                  external
                  variant="primary"
                  className="!border-accent !bg-accent !text-cream hover:!bg-accent/90 font-bold"
                >
                  {locale === "fr" ? "WhatsApp Direct" : isRtl ? "واتساب مباشر" : "WhatsApp Sales"}
                </Button>
              </div>
            </div>

            {/* Right 4-photo collage */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg ring-1 ring-white/10">
                  <Image
                    src="/images/benefits/argan-oil.webp"
                    alt="Pure Moroccan Argan Oil Wholesale"
                    fill
                    sizes="(max-width:1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg ring-1 ring-white/10">
                  <Image
                    src="/images/private-label/bulk-tubs.webp"
                    alt="Bulk Hammam Cosmetics Tubs"
                    fill
                    sizes="(max-width:1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg ring-1 ring-white/10">
                  <Image
                    src="/images/products/product-18.webp"
                    alt="Moroccan Black Soap Export Packaging"
                    fill
                    sizes="(max-width:1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg ring-1 ring-white/10">
                  <Image
                    src="/images/private-label/labeled-serum-line.webp"
                    alt="Private Label Moroccan Cosmetic Line"
                    fill
                    sizes="(max-width:1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 8. WHOLESALE FAQ ACCORDION */}
      <section className="border-t border-stone-200/80 bg-stone-100/60 py-20">
        <div className="mx-auto max-w-5xl px-4">
          <FAQ
            items={parseFaq(faq?.body ?? "").map((item) => ({
              ...item,
              answer: homeCopy(locale, item.answer),
            }))}
            title={faq?.title}
            locale={locale}
          />
        </div>
      </section>

      {/* 9. BOTTOM GUIDES / KNOWLEDGE BASE LINKS */}
      <section className="py-12 text-center text-sm text-ink/70">
        <div className="mx-auto max-w-4xl px-4">
          <Link
            href={blogPostPath(locale, "moroccan-hammam-treatment-steps-spa")}
            className="link-underline font-medium text-ink hover:text-primary"
          >
            {ui.blogLinkSteps}
          </Link>
          <span className="mx-3 text-stone-300">·</span>
          <Link
            href={blogPostPath(locale, "kessa-glove-guide")}
            className="link-underline font-medium text-ink hover:text-primary"
          >
            {ui.blogLinkKessa}
          </Link>
          <span className="mx-3 text-stone-300">·</span>
          <Link
            href={productsPath(locale)}
            className="link-underline font-medium text-ink hover:text-primary"
          >
            {locale === "fr" ? "Tous les produits" : isRtl ? "كافة المنتجات" : "All Products Directory"}
          </Link>
        </div>
      </section>
    </div>
  );
}

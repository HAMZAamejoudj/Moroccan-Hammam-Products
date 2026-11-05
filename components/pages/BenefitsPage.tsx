import Image from "next/image";
import Link from "next/link";
import { getPageCached } from "@/lib/content";
import { applyPageInternalLinks } from "@/lib/internal-links";
import {
  homePath,
  localeDirection,
  localePagePath,
  productPath,
  type Locale,
} from "@/lib/i18n/config";
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
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/sections/FAQ";
import { StepsTimeline } from "@/components/sections/StepsTimeline";
import { MoroccanPattern } from "@/components/layout/MoroccanPattern";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Droplets,
  PackageCheck,
  TrendingUp,
} from "lucide-react";

function benefitsCopy(locale: Locale, text: string) {
  return applyPageInternalLinks("benefits", text, locale);
}

const BENEFIT_SLUG_MAP: Record<string, string> = {
  "black-soap": "moroccan-black-soap",
  kessa: "kessa-exfoliating-gloves",
  ghassoul: "ghassoul-clay",
  "argan-oil": "argan-and-prickly-pear-oil",
  "rose-water": "rose-water-nila-aker-fassi",
  "nila-aker": "rose-water-nila-aker-fassi",
};

const UI_COPY: Record<
  Locale,
  {
    heroPill: string;
    viewDetails: string;
    requestQuote: string;
    trust1: string;
    trust2: string;
    trust3: string;
    businessBadge: string;
  }
> = {
  en: {
    heroPill: "WHOLESALE HAMMAM RITUAL & PRODUCT SPECS",
    viewDetails: "View product details",
    requestQuote: "Request a quote",
    trust1: "Authentic Moroccan Origin",
    trust2: "Lab Tested & Certified",
    trust3: "Export Ready Bulk & Private Label",
    businessBadge: "COMMERCIAL ADVANTAGES FOR SPAS & BRANDS",
  },
  fr: {
    heroPill: "RITUEL DU HAMMAM EN GROS ET FICHES PRODUITS",
    viewDetails: "Voir la fiche produit",
    requestQuote: "Demander un devis",
    trust1: "Origine Maroc Authentique",
    trust2: "Analysé en Laboratoire & Certifié",
    trust3: "Prêt à l'Export Bulk & Marque Blanche",
    businessBadge: "AVANTAGES COMMERCIAUX POUR SPAS & MARQUES",
  },
  ar: {
    heroPill: "طقوس الحمام المغربي بالجملة وتفاصيل المنتجات",
    viewDetails: "تفاصيل المنتج الكاملة",
    requestQuote: "طلب عرض أسعار",
    trust1: "أصل مغربي أصيل 100%",
    trust2: "معتمد ومحلل مخبرياً",
    trust3: "جاهز للتصدير بالجملة والعلامة الخاصة",
    businessBadge: "مزايا تجارية لمراكز السبا والماركات",
  },
};

export async function BenefitsPage({ locale }: { locale: Locale }) {
  const page = await getPageCached("benefits", locale);
  const sections = parseSectionIndex(page.body);
  const intro = page.body.replace(/^#\s+.+\n?/, "").split(/\n## /)[0].trim();
  const nav = getNavLabels(locale);
  const isRtl = locale === "ar";
  const copy = UI_COPY[locale];

  const products = getSectionById(sections, "products");
  const ritual = getSectionById(sections, "ritual");
  const business = getSectionById(sections, "business");
  const storage = getSectionById(sections, "storage");
  const faq = getSectionById(sections, "faq");

  const productEntries = parseSubsectionEntries(products?.body ?? "");
  const businessBullets = parseBoldBulletList(business?.body ?? "");

  return (
    <div className="bg-[#fbf9f5]" dir={localeDirection(locale)} lang={locale}>
      {/* 1. HERO SECTION */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#f5ede0] via-[#f9f5ed] to-[#fbf9f5] pt-28 pb-16 sm:pt-32 sm:pb-20">
        <MoroccanPattern className="pointer-events-none absolute -right-10 -top-10 h-96 w-96 text-gold opacity-[0.07]" />
        <MoroccanPattern className="pointer-events-none absolute -left-10 bottom-0 h-96 w-96 text-gold opacity-[0.05]" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { label: nav.home, href: homePath(locale) },
              { label: nav.benefits },
            ]}
          />

          <div className="mt-6 max-w-3xl">
            <h1 className="font-serif text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
              {page.h1}
            </h1>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-ink/80">
              <PlaceholderText text={benefitsCopy(locale, intro)} />
            </p>

            {/* Trust Pills */}
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-bold text-accent">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-gold/30 bg-white px-3 py-1.5 shadow-2xs">
                <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} /> {copy.trust1}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-gold/30 bg-white px-3 py-1.5 shadow-2xs">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} /> {copy.trust2}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-gold/30 bg-white px-3 py-1.5 shadow-2xs">
                <PackageCheck className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} /> {copy.trust3}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT DETAILS & BENEFITS SHOWCASE */}
      <section className="border-t border-stone-200/80 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
              {locale === "fr"
                ? "DÉTAILS PRODUITS ET BIENFAITS"
                : isRtl
                ? "تفاصيل المنتجات ومزاياها"
                : "PRODUCT SPECS & RITUAL BENEFITS"}
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl">
              {products?.title ?? (locale === "fr" ? "Bienfaits de chaque produit" : isRtl ? "فوائد كل منتج" : "Benefits of Each Product")}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-ink/75">
              {locale === "fr"
                ? "Découvrez les propriétés uniques de chaque ingrédient et accédez à sa fiche produit complète."
                : isRtl
                ? "تعرّف على خصائص كل مكوّن أصيل واطلع على بطاقة المنتج الكاملة للطلب بالجملة."
                : "Explore how each Moroccan hammam essential functions and click through for full technical and wholesale specifications."}
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:gap-10">
            {productEntries.map(({ id, title, body }) => {
              const slug = (id && BENEFIT_SLUG_MAP[id]) ? BENEFIT_SLUG_MAP[id] : "moroccan-black-soap";
              const detailHref = productPath(locale, slug);
              const contactHref = `${localePagePath(locale, "contact")}?product=${slug}`;

              const imgEntry = id ? benefitProductImagesById[id] : undefined;
              const imgs = imgEntry
                ? Array.isArray(imgEntry)
                  ? imgEntry
                  : [imgEntry]
                : [];

              const bullets = body
                .split("\n")
                .map((l) => l.trim())
                .filter((l) => l.startsWith("- "))
                .map((l) => l.replace(/^-\s+/, ""));

              return (
                <article
                  key={title}
                  id={id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-md ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-xl"
                >
                  {/* Product Image Header with Link */}
                  {imgs.length > 0 ? (
                    <Link
                      href={detailHref}
                      className="relative block overflow-hidden bg-stone-100 focus:outline-hidden"
                    >
                      <div
                        className={`grid ${
                          imgs.length > 1 ? "grid-cols-2" : "grid-cols-1"
                        } gap-2 p-2 bg-stone-50`}
                      >
                        {imgs.map((img, i) => (
                          <div
                            key={`${img.src}-${i}`}
                            className={`relative ${
                              imgs.length > 1 ? "aspect-[4/5]" : "aspect-[16/10]"
                            } w-full overflow-hidden rounded-xl bg-stone-200`}
                          >
                            <Image
                              src={img.src}
                              alt={img.alt}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes={
                                imgs.length > 1
                                  ? "(max-width:768px) 50vw, 25vw"
                                  : "(max-width:768px) 100vw, 50vw"
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </Link>
                  ) : null}

                  {/* Body Content */}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    {/* Title with link */}
                    <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-primary">
                      <Link href={detailHref} className="hover:underline">
                        {title}
                      </Link>
                    </h3>

                    {/* Benefit Bullets */}
                    <div className="mt-4 flex-1 space-y-2.5">
                      {bullets.map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                            <Check className="h-3 w-3" strokeWidth={2.5} />
                          </span>
                          <span className="text-sm font-medium leading-relaxed text-ink/80">
                            <PlaceholderText text={benefitsCopy(locale, bullet)} />
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="mt-6 flex flex-col gap-2.5 pt-4 border-t border-stone-100 sm:flex-row sm:items-center">
                      <Button
                        href={detailHref}
                        variant="primary"
                        className="w-full text-center text-xs sm:text-sm font-bold py-2.5 sm:flex-1 shadow-sm"
                      >
                        {copy.viewDetails} {isRtl ? "←" : "→"}
                      </Button>
                      <Button
                        href={contactHref}
                        variant="secondary"
                        className="w-full text-center text-xs sm:text-sm font-bold py-2.5 sm:flex-1 border-stone-300"
                      >
                        {copy.requestQuote}
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. STEP-BY-STEP RITUAL TIMELINE */}
      {ritual ? (
        <section className="border-t border-stone-200/80 bg-cream/40 py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                {locale === "fr" ? "PROTOCOLE HAMMAM" : isRtl ? "البروتوكول الكامل" : "SPA PROTOCOL"}
              </span>
              <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl">
                {ritual.title}
              </h2>
            </div>

            <div className="rounded-3xl border border-gold/25 bg-white p-6 sm:p-10 shadow-lg">
              <StepsTimeline
                steps={parseNumberedSteps(ritual.body).map((s) => benefitsCopy(locale, s))}
              />
            </div>
          </div>
        </section>
      ) : null}

      {/* 4. BUSINESS ADVANTAGES FOR SPAS & DISTRIBUTORS */}
      {business ? (
        <section className="border-t border-stone-200/80 bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                {copy.businessBadge}
              </span>
              <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl">
                {business.title}
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {businessBullets.map(({ title, body }, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200/90 bg-stone-50/50 p-6 shadow-sm transition hover:border-gold/40 hover:bg-white hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  {title ? (
                    <h3 className="mt-4 font-serif text-base font-bold text-ink">
                      {title}
                    </h3>
                  ) : null}
                  <p className="mt-2 text-sm leading-relaxed text-ink/75">
                    {unwrapBracketPlaceholders(body)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 5. STORAGE & WHOLESALE BULK HANDLING */}
      {storage ? (
        <section className="border-t border-stone-200/80 bg-[#f8f5ee] py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                  {locale === "fr" ? "CONSERVATION & QUALITÉ" : isRtl ? "التخزين والجودة" : "SHELF LIFE & BULK CARE"}
                </span>
                <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl">
                  {storage.title}
                </h2>
                <div className="mt-6 space-y-3">
                  {(storage.body ?? "")
                    .split("\n")
                    .map((l) => l.trim())
                    .filter((l) => l.startsWith("- "))
                    .map((l, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent mt-0.5">
                          <Check className="h-3 w-3" strokeWidth={2.5} />
                        </span>
                        <span className="text-sm sm:text-base font-medium leading-relaxed text-ink/85">
                          <PlaceholderText text={l.replace(/^-\s+/, "")} />
                        </span>
                      </div>
                    ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button
                    href={localePagePath(locale, "contact")}
                    variant="primary"
                    className="font-bold px-6 py-3 text-sm shadow-md"
                  >
                    {locale === "fr" ? "Contacter notre équipe commerciale" : isRtl ? "تواصل مع فريق المبيعات" : "Contact Our Sales Team"}
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl ring-1 ring-ink/10">
                  <Image
                    src={siteImages.harvestLine.src}
                    alt={siteImages.harvestLine.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 42vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* 6. FAQ SECTION */}
      {faq ? (
        <FAQ
          items={parseFaq(faq.body ?? "").map((item) => ({
            ...item,
            answer: benefitsCopy(locale, item.answer),
          }))}
          title={faq.title ?? "FAQ"}
          locale={locale}
        />
      ) : null}
    </div>
  );
}

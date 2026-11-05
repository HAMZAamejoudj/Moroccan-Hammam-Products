import Link from "next/link";
import Image from "next/image";
import { getAllProducts } from "@/lib/products";
import {
  homePath,
  localeDirection,
  localePagePath,
  productPath,
  type Locale,
} from "@/lib/i18n/config";
import { getNavLabels, getProductUi } from "@/lib/i18n/messages";
import { getSiteConfig } from "@/lib/site-config";
import { whatsappUrl } from "@/lib/whatsapp-url";
import { Button } from "@/components/ui/Button";
import { MoroccanPattern } from "@/components/layout/MoroccanPattern";
import { Check } from "lucide-react";

export function ProductsIndexPage({ locale }: { locale: Locale }) {
  const ui = getProductUi(locale);
  const nav = getNavLabels(locale);
  const products = getAllProducts(locale);
  const config = getSiteConfig();
  const dir = localeDirection(locale);
  const isRtl = dir === "rtl";
  const wa = whatsappUrl(config.whatsapp);

  // 8 Wholesale Categories inspired by the reference image
  const categories = [
    {
      id: "argan-oil",
      slug: "argan-and-prickly-pear-oil",
      title:
        locale === "fr"
          ? "Huile d'Argan Pure"
          : locale === "ar"
            ? "زيت الأركان النقي"
            : "Pure Argan Oil",
      description:
        locale === "fr"
          ? "Huile cosmétique pressée à froid en vrac (fûts de 5L à 200L) et flacons retail."
          : locale === "ar"
            ? "زيت تجميلي معصور على البارد بالجملة في براميل (5-200 لتر) وقنينات التصدير."
            : "Cold-pressed cosmetic oil in bulk drums (5L to 200L) and labeled dropper bottles.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      id: "prickly-pear",
      slug: "argan-and-prickly-pear-oil",
      title:
        locale === "fr"
          ? "Pépins de Figue de Barbarie"
          : locale === "ar"
            ? "زيت بذور التين الشوكي"
            : "Prickly Pear Seed Oil",
      description:
        locale === "fr"
          ? "L'élixir anti-âge le plus précieux au monde, pressé à froid avec certificat d'analyse."
          : locale === "ar"
            ? "الزيت النادر الأقوى في محاربة التجاعيد، معصور على البارد بشهادة التحليل المخبري."
            : "The world's most precious anti-aging botanical oil with exceptionally high vitamin E.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      id: "black-soap",
      slug: "moroccan-black-soap",
      title:
        locale === "fr"
          ? "Savon Noir Marocain"
          : locale === "ar"
            ? "الصابون البلدي المغربي"
            : "Moroccan Black Soap",
      description:
        locale === "fr"
          ? "Pâte saponifiée d'olives noires pour rituel hammam (nature, eucalyptus, argan, rose)."
          : locale === "ar"
            ? "عجينة صابون الزيتون التقليدية لطقوس الحمام (طبيعي، أوكالبتوس، أركان، ورد)."
            : "Authentic olive oil paste for steam baths (plain, eucalyptus, argan or Damask rose).",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      id: "nila-powder",
      slug: "rose-water-nila-aker-fassi",
      title:
        locale === "fr"
          ? "Poudre de Nila Bleue"
          : locale === "ar"
            ? "مسحوق النيلة الزرقاء"
            : "Nila Blue Powder",
      description:
        locale === "fr"
          ? "Pigment minéral sahraoui pur pour masques éclaircissants et anti-taches corporelles."
          : locale === "ar"
            ? "مسحوق نيلة صحراوية ملكية نقية لتفتيح وتوحيد لون البشرة والتخلص من التصبغات."
            : "Pure royal Saharan mineral indigo powder for skin brightening and tone correction.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
    {
      id: "aker-fassi",
      slug: "rose-water-nila-aker-fassi",
      title:
        locale === "fr"
          ? "Aker Fassi Naturel"
          : locale === "ar"
            ? "العكر الفاسي الحر"
            : "Natural Aker Fassi",
      description:
        locale === "fr"
          ? "Poudre artisanale de pétales de coquelicot et grenade pour teinter lèvres et joues."
          : locale === "ar"
            ? "مسحوق بلدي أصيل من شقائق النعمان وقشور الرمان لتوريد الشفاه والخدود."
            : "Artisanal poppy petal and dried pomegranate powder for natural tint and radiant glow.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 9v6m-3-3h6" />
        </svg>
      ),
    },
    {
      id: "floral-waters",
      slug: "rose-water-nila-aker-fassi",
      title:
        locale === "fr"
          ? "Eaux Florales de Rose"
          : locale === "ar"
            ? "ماء الورد وزهر البرتقال"
            : "Rose and Floral Waters",
      description:
        locale === "fr"
          ? "Hydrolat de rose de Damas pure de Kelaat M'Gouna et eau de fleur d'oranger."
          : locale === "ar"
            ? "ماء ورد قلعة مكونة المقطر الطبيعي وماء زهر البرتقال العطري المنعش."
            : "Pure steam-distilled Damask rose and neroli orange blossom waters.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      id: "ghassoul-clay",
      slug: "ghassoul-clay",
      title:
        locale === "fr"
          ? "Argile Ghassoul de l'Atlas"
          : locale === "ar"
            ? "طين الغاسول الأطلسي"
            : "Atlas Ghassoul Clay",
      description:
        locale === "fr"
          ? "Argile minérale volcanique pure en poudre fine et plaquettes pour masques spa."
          : locale === "ar"
            ? "طين بركاني نقي مستخرج من جبال الأطلس في شكل قطع ومسحوق مصفى للسبا."
            : "Mined mineral clay in ultra-fine powder and raw chunks for purifying body wraps.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      id: "hammam-kits",
      slug: "hammam-kits",
      title:
        locale === "fr"
          ? "Gants Kessa et Coffrets"
          : locale === "ar"
            ? "أكياس التقشير وأطقم الهدايا"
            : "Kessa and Hammam Kits",
      description:
        locale === "fr"
          ? "Gants kessa en crêpe authentique et kits complets 3 à 4 pièces prêts pour retail."
          : locale === "ar"
            ? "أكياس الكيس الأصلية ومجموعات الحمام المتكاملة 3 و 4 قطع الجاهزة للبيع."
            : "Authentic crepe exfoliating gloves and 3-to-4 piece ritual gift sets for retail.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-[#fbf9f5] pb-0" dir={dir} lang={locale}>
      {/* 1. Header Hero Banner (Dark forest green matching inspiration) */}
      <section className="relative overflow-hidden bg-primary pt-28 pb-16 text-cream sm:pt-32 sm:pb-20 md:pt-36 md:pb-24">
        <MoroccanPattern className="pointer-events-none absolute right-4 top-4 h-48 w-48 text-gold opacity-15 sm:h-64 sm:w-64" />
        <div className="relative mx-auto max-w-6xl px-4 text-center">
          {/* Breadcrumb */}
          <div className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold text-cream/70 sm:text-sm">
            <Link href={homePath(locale)} className="transition hover:text-white">
              {nav.home}
            </Link>
            <span>/</span>
            <span className="text-gold">{ui.heroBreadcrumb}</span>
          </div>

          {/* Page Title */}
          <h1 className="font-serif text-3xl font-bold tracking-tight text-cream sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            {ui.heroTitle}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-cream/85 md:text-lg">
            {ui.catalogSubtitle}
          </p>
        </div>
      </section>

      {/* 2. Floating Trust Badges Bar (Directly inspired by reference image) */}
      <div className="-mt-8 relative z-20 mx-auto max-w-5xl px-4 sm:-mt-10">
        <div className="flex flex-wrap items-center justify-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-xl ring-1 ring-ink/10 sm:gap-8 sm:rounded-full sm:px-8 sm:py-4">
          <div className="flex items-center gap-2 text-xs font-bold text-ink sm:text-sm">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
              <Check className="h-3 w-3" strokeWidth={2.5} />
            </span>
            <span>{ui.trustOrganic}</span>
          </div>
          <span className="hidden h-4 w-px bg-stone-300 sm:block" aria-hidden />
          <div className="flex items-center gap-2 text-xs font-bold text-ink sm:text-sm">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
              <Check className="h-3 w-3" strokeWidth={2.5} />
            </span>
            <span>{ui.trustCrueltyFree}</span>
          </div>
          <span className="hidden h-4 w-px bg-stone-300 sm:block" aria-hidden />
          <div className="flex items-center gap-2 text-xs font-bold text-ink sm:text-sm">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
              <Check className="h-3 w-3" strokeWidth={2.5} />
            </span>
            <span>{ui.trustShipping}</span>
          </div>
          <span className="hidden h-4 w-px bg-stone-300 sm:block" aria-hidden />
          <div className="flex items-center gap-2 text-xs font-bold text-ink sm:text-sm">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
              <Check className="h-3 w-3" strokeWidth={2.5} />
            </span>
            <span>{ui.trustMoq}</span>
          </div>
        </div>
      </div>

      {/* 3. Product Catalog Section */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:pt-20 sm:pb-24">
        {/* Section Header */}
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
            {ui.catalogEyebrow}
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-[2.65rem]">
            {ui.catalogTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-ink/75 md:text-lg">
            {ui.catalogSubtitle}
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const primaryImage = product.images[0];
            const detailHref = productPath(locale, product.slug);
            const quoteHref = `${localePagePath(locale, "contact")}?product=${product.slug}`;

            return (
              <article
                key={product.slug}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-2xl"
              >
                <div>
                  {/* Product Photo with Badge */}
                  {primaryImage ? (
                    <Link
                      href={detailHref}
                      className="relative block aspect-[4/3] w-full overflow-hidden bg-stone-100"
                    >
                      <Image
                        src={primaryImage.src}
                        alt={primaryImage.alt}
                        fill
                        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 z-10">
                        <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent shadow-sm backdrop-blur-sm ring-1 ring-ink/5">
                          {product.badge}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 z-10">
                        <span className="rounded-full bg-primary/90 px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm">
                          100% Morocco
                        </span>
                      </div>
                    </Link>
                  ) : null}

                  {/* Body Info */}
                  <div className="p-6 pb-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gold-dark">
                      {product.badge}
                    </p>
                    <h3 className="mt-1 font-serif text-xl font-bold text-ink transition-colors group-hover:text-primary md:text-[1.35rem]">
                      <Link href={detailHref}>{product.h1}</Link>
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-ink/65">
                      {product.subtitle}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink/80 line-clamp-3">
                      {product.short_description}
                    </p>

                    {/* Specs / Tags Chips */}
                    <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-medium text-ink/75">
                      {product.specs.slice(0, 2).map((s) => (
                        <span
                          key={s.label}
                          className="rounded-md border border-stone-200 bg-stone-50 px-2 py-1"
                        >
                          <strong className="font-semibold text-ink">{s.label}:</strong> {s.value.split(",")[0]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Actions: 2 side-by-side buttons exactly matching inspiration */}
                <div className="p-6 pt-4">
                  <div className="flex items-center gap-3 border-t border-stone-100 pt-4">
                    <Link
                      href={detailHref}
                      className="flex-1 rounded-xl border border-stone-300 bg-white py-2.5 px-3 text-center text-xs font-bold text-ink shadow-sm transition hover:bg-stone-50 hover:border-ink/40"
                    >
                      {ui.viewDetails}
                    </Link>
                    <Link
                      href={quoteHref}
                      className="flex-1 rounded-xl bg-primary py-2.5 px-3 text-center text-xs font-bold text-white shadow-md transition hover:bg-primary-dark hover:shadow-lg"
                    >
                      {ui.getQuoteBtn}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 4. "Browse by Wholesale Category" Section (Inspired by reference image) */}
      <section className="border-t border-stone-200/80 bg-stone-100/60 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
              {ui.categoriesEyebrow}
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {ui.categoriesTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-ink/75 md:text-lg">
              {ui.categoriesSubtitle}
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => {
              const href = productPath(locale, cat.slug);
              return (
                <Link
                  key={cat.id}
                  href={href}
                  className="group relative flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm transition-all duration-300 group-hover:bg-primary group-hover:text-cream">
                        {cat.icon}
                      </div>
                      <span className="text-stone-300 transition-transform group-hover:translate-x-1 group-hover:text-primary rtl:group-hover:-translate-x-1">
                        {isRtl ? "←" : "→"}
                      </span>
                    </div>

                    <h3 className="mt-4 font-serif text-lg font-bold text-ink transition-colors group-hover:text-primary">
                      {cat.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-ink/75">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center text-xs font-bold text-accent group-hover:text-primary">
                    <span>{ui.viewDetails}</span>
                    <span className="mx-1">{isRtl ? "←" : "→"}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. "Looking for a Reliable Wholesale Supplier?" CTA Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary to-[#182e1f] py-20 text-cream">
        <MoroccanPattern className="pointer-events-none absolute left-4 bottom-4 h-48 w-48 text-gold opacity-10" />
        <MoroccanPattern className="pointer-events-none absolute right-4 top-4 h-48 w-48 text-gold opacity-10" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-cream sm:text-4xl md:text-5xl">
            {ui.reliableSupplierTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-cream/90 md:text-lg">
            {ui.reliableSupplierBody}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
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
              {ui.privateLabelBtn}
            </Button>
            <Button
              href={wa}
              external
              variant="primary"
              className="!border-accent !bg-accent !text-cream hover:!bg-accent/90 font-bold"
            >
              {ui.chatWhatsApp}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

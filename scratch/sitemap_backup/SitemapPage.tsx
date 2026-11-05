import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { getAllBlogPosts } from "@/lib/content";
import {
  homePath,
  localeDirection,
  localePagePath,
  productPath,
  productsPath,
  blogPath,
  blogPostPath,
  locales,
  localeLabels,
  type Locale,
} from "@/lib/i18n/config";
import { getNavLabels } from "@/lib/i18n/messages";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MoroccanPattern } from "@/components/layout/MoroccanPattern";

type SitemapCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  xmlNotice: string;
  viewXml: string;
  secNavigation: string;
  secProducts: string;
  secBlog: string;
  secServices: string;
  secLegal: string;
  secLanguages: string;
  privacy: string;
  terms: string;
  xmlSitemap: string;
  robotsTxt: string;
  requestQuote: string;
};

const sitemapI18n: Record<Locale, SitemapCopy> = {
  en: {
    eyebrow: "Directory and Index",
    title: "Sitemap",
    subtitle:
      "A complete overview of all pages, wholesale products, spa protocol guides, and services available on Moroccan Hammam Products.",
    xmlNotice: "Looking for search engine XML feeds?",
    viewXml: "View sitemap.xml →",
    secNavigation: "Main Navigation",
    secProducts: "Product Catalog (Detail Pages)",
    secBlog: "Sourcing Guides and Spa Protocols",
    secServices: "B2B Manufacturing and Services",
    secLegal: "Legal and Compliance",
    secLanguages: "Available Languages",
    privacy: "Privacy Policy",
    terms: "Terms and Conditions",
    xmlSitemap: "XML Sitemap (for search engines)",
    robotsTxt: "Robots.txt file",
    requestQuote: "Request a Wholesale Quote",
  },
  fr: {
    eyebrow: "Répertoire et Index",
    title: "Plan du site",
    subtitle:
      "Une vue d’ensemble complète de toutes les pages, produits de gros, guides de rituels spa et services de Moroccan Hammam Products.",
    xmlNotice: "Vous cherchez le flux XML pour moteurs de recherche ?",
    viewXml: "Voir sitemap.xml →",
    secNavigation: "Navigation principale",
    secProducts: "Catalogue produits (pages détaillées)",
    secBlog: "Guides d'achat et protocoles spa",
    secServices: "Fabrication B2B et services",
    secLegal: "Légal et conformité",
    secLanguages: "Langues disponibles",
    privacy: "Politique de confidentialité",
    terms: "Conditions générales de vente",
    xmlSitemap: "Sitemap XML (pour moteurs de recherche)",
    robotsTxt: "Fichier Robots.txt",
    requestQuote: "Demander un devis grossiste",
  },
  ar: {
    eyebrow: "دليل الموقع والفهرس",
    title: "خريطة الموقع",
    subtitle:
      "نظرة شاملة على جميع صفحات الموقع، منتجات الجملة، أدلة طقوس الحمام، وخدمات التصنيع لدى منتجات الحمام المغربي.",
    xmlNotice: "هل تبحث عن تغذية XML لمحركات البحث؟",
    viewXml: "عرض sitemap.xml ←",
    secNavigation: "الصفحات الرئيسية",
    secProducts: "كتالوج المنتجات (صفحات التفاصيل)",
    secBlog: "أدلة الشراء وطقوس الحمام",
    secServices: "خدمات التصنيع B2B والعلامة الخاصة",
    secLegal: "القانونية والامتثال",
    secLanguages: "اللغات المتوفرة",
    privacy: "سياسة الخصوصية",
    terms: "الشروط والأحكام",
    xmlSitemap: "خريطة الموقع بتنسيق XML (لمحركات البحث)",
    robotsTxt: "ملف Robots.txt",
    requestQuote: "طلب عرض أسعار بالجملة",
  },
};

export function SitemapPage({ locale }: { locale: Locale }) {
  const dir = localeDirection(locale);
  const copy = sitemapI18n[locale];
  const nav = getNavLabels(locale);
  const products = getAllProducts(locale);
  const posts = getAllBlogPosts(locale);

  const mainPages = [
    { label: nav.home, href: homePath(locale), desc: "Homepage & hero ritual overview" },
    { label: nav.about, href: localePagePath(locale, "about"), desc: "Company heritage, workshop & quality assurance" },
    { label: nav.products, href: productsPath(locale), desc: "Full catalog of 6 core Moroccan hammam lines" },
    { label: nav.benefits, href: localePagePath(locale, "benefits"), desc: "Ingredient benefits, skin biology & ritual steps" },
    { label: nav.privateLabel, href: localePagePath(locale, "private-label"), desc: "White label cosmetics, custom jars & packaging" },
    { label: nav.blog, href: blogPath(locale), desc: "B2B guides on sourcing, testing & spa rituals" },
    { label: nav.contact, href: localePagePath(locale, "contact"), desc: "Get quotes, request samples & talk on WhatsApp" },
  ];

  const b2bServices = [
    { label: copy.requestQuote, href: localePagePath(locale, "contact") },
    { label: nav.privateLabel, href: localePagePath(locale, "private-label") },
    { label: "Bulk Packaging (5kg - 200L)", href: localePagePath(locale, "private-label") },
    { label: "Lab Test Reports (COA / MSDS / INCI)", href: localePagePath(locale, "contact") },
  ];

  return (
    <div className="bg-white pb-20 pt-28" dir={dir} lang={locale}>
      <div className="mx-auto max-w-6xl px-4">
        <Breadcrumbs
          items={[
            { label: nav.home, href: homePath(locale) },
            { label: copy.title },
          ]}
        />

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-2xl border border-gold/25 bg-cream/30 p-8 md:p-12">
          <MoroccanPattern className="pointer-events-none absolute right-4 top-4 h-36 w-36 text-gold opacity-30" />
          <div className="relative max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
              {copy.eyebrow}
            </span>
            <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-ink md:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-4 text-base font-medium leading-relaxed text-ink/85 md:text-lg">
              {copy.subtitle}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-semibold text-ink">
              <span>{copy.xmlNotice}</span>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-gold/40 bg-white px-3.5 py-1.5 text-xs font-bold text-primary shadow-sm hover:border-gold hover:bg-cream"
              >
                {copy.viewXml}
              </a>
            </div>
          </div>
        </div>

        {/* Section 1: Main Pages */}
        <section className="mt-16">
          <SectionHeading title={copy.secNavigation} />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mainPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group rounded-xl border border-gold/20 bg-white p-5 shadow-sm transition hover:border-gold/50 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-ink transition group-hover:text-primary">
                    {page.label}
                  </h3>
                  <span className="text-primary transition group-hover:translate-x-1">→</span>
                </div>
                <p className="mt-2 text-xs font-medium text-ink/75">{page.desc}</p>
                <span className="mt-3 block font-mono text-[11px] text-accent">
                  {page.href}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 2: Product Detail Pages */}
        <section className="mt-16">
          <SectionHeading title={copy.secProducts} />
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((prod) => (
              <Link
                key={prod.slug}
                href={productPath(locale, prod.slug)}
                className="group flex flex-col justify-between rounded-xl border border-gold/20 bg-cream/20 p-5 shadow-sm transition hover:border-gold/50 hover:shadow-md"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                    {prod.badge}
                  </span>
                  <h3 className="mt-1 font-serif text-lg font-bold text-ink transition group-hover:text-primary">
                    {prod.h1}
                  </h3>
                  <p className="mt-2 text-xs font-medium leading-relaxed text-ink/80 line-clamp-2">
                    {prod.short_description}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-gold/15 pt-3">
                  <span className="font-mono text-[11px] text-ink/60">
                    /products/{prod.slug}
                  </span>
                  <span className="text-xs font-bold text-primary group-hover:underline">
                    View product →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 3: Sourcing Guides & Blog */}
        {posts.length > 0 ? (
          <section className="mt-16">
            <SectionHeading title={copy.secBlog} />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.frontmatter.slug}
                  href={blogPostPath(locale, post.frontmatter.slug)}
                  className="group rounded-xl border border-gold/20 bg-white p-5 shadow-sm transition hover:border-gold/50 hover:shadow-md"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                    {post.frontmatter.category}
                  </span>
                  <h3 className="mt-1 font-serif text-base font-bold text-ink transition group-hover:text-primary line-clamp-2">
                    {post.h1}
                  </h3>
                  <p className="mt-2 text-xs font-medium text-ink/70">
                    {post.frontmatter.date} · {post.frontmatter.reading_time}
                  </p>
                  <span className="mt-3 block font-mono text-[11px] text-primary">
                    /blog/{post.frontmatter.slug}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {/* Section 4: B2B Services & Legal Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {/* B2B Services */}
          <div className="rounded-xl border border-gold/20 bg-cream/30 p-6">
            <h2 className="font-serif text-xl font-bold text-ink">
              {copy.secServices}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {b2bServices.map((srv) => (
                <li key={srv.label}>
                  <Link
                    href={srv.href}
                    className="flex items-center justify-between text-sm font-semibold text-ink hover:text-primary hover:underline"
                  >
                    <span>{srv.label}</span>
                    <span>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Machine Feeds */}
          <div className="rounded-xl border border-gold/20 bg-white p-6 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-ink">
              {copy.secLegal}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm font-semibold text-ink">
              <li>
                <Link href="/privacy-policy" className="hover:text-primary hover:underline">
                  {copy.privacy} (/privacy-policy)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary hover:underline">
                  {copy.terms} (/terms)
                </Link>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {copy.xmlSitemap} (/sitemap.xml)
                </a>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {copy.robotsTxt} (/robots.txt)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Section 5: Language Directories */}
        <section className="mt-16 border-t border-gold/15 pt-10">
          <h2 className="font-serif text-xl font-bold text-ink">
            {copy.secLanguages}
          </h2>
          <div className="mt-4 flex flex-wrap gap-4">
            {(locales as readonly Locale[]).map((loc) => (
              <Link
                key={loc}
                href={localePagePath(loc, "sitemap")}
                className={`rounded-lg border px-4 py-2 text-sm font-bold transition ${
                  loc === locale
                    ? "border-primary bg-primary text-cream"
                    : "border-gold/30 bg-white text-ink hover:border-gold hover:bg-cream/40"
                }`}
              >
                {localeLabels[loc]} ({loc.toUpperCase()}) — /{loc}/sitemap
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}


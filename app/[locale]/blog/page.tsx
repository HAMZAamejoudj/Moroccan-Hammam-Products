import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog/BlogCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getAllBlogPostsCached } from "@/lib/content";
import { blogPath, homePath, isLocale, localeDirection, type Locale } from "@/lib/i18n/config";
import { buildBlogIndexMetadata } from "@/lib/i18n/home-metadata";
import { getBlogUi, getNavLabels } from "@/lib/i18n/messages";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }, { locale: "ar" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return buildBlogIndexMetadata(raw as Locale);
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const posts = await getAllBlogPostsCached(locale);
  const ui = getBlogUi(locale);
  const nav = getNavLabels(locale);
  const blog = blogPath(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: nav.home, path: homePath(locale) },
          { name: nav.blog, path: blog },
        ])}
      />
      <div className="bg-white" dir={localeDirection(locale)} lang={locale}>
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-28">
          <Breadcrumbs
            items={[
              { label: nav.home, href: homePath(locale) },
              { label: nav.blog },
            ]}
          />
          <h1 className="font-serif text-4xl text-ink md:text-5xl">{ui.indexH1}</h1>
          <p className="mt-4 max-w-2xl text-ink/80">{ui.indexIntro}</p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.frontmatter.slug} post={post} locale={locale} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/blog/ArticleLayout";
import {
  getAllBlogSlugs,
  getAllBlogPostsCached,
  getBlogPostCached,
} from "@/lib/content";
import {
  extractFaqSection,
  extractH2s,
  extractHowToSteps,
  markdownToHtml,
  prepareBlogMarkdown,
} from "@/lib/markdown";
import { parseFaq } from "@/lib/parse";
import { blogPostImage } from "@/lib/images";
import { blogPath, homePath, isLocale, type Locale } from "@/lib/i18n/config";
import { buildBlogPostMetadata } from "@/lib/i18n/home-metadata";
import { getNavLabels } from "@/lib/i18n/messages";
import {
  JsonLd,
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  howToSchema,
} from "@/lib/schema";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const locales: Locale[] = ["en", "fr", "ar"];
  return locales.flatMap((locale) =>
    getAllBlogSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  if (!getAllBlogSlugs(locale).includes(slug)) return {};
  return buildBlogPostMetadata(locale, slug);
}

export default async function BlogPostPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  if (!getAllBlogSlugs(locale).includes(slug)) notFound();

  const post = await getBlogPostCached(slug, locale);
  const nav = getNavLabels(locale);

  const { bodyWithoutFaq, faqMarkdown } = extractFaqSection(post.body);
  const md = prepareBlogMarkdown(slug, bodyWithoutFaq, locale);
  const html = await markdownToHtml(md);
  const toc = extractH2s(html);
  const faqs = parseFaq(faqMarkdown);
  const howToSteps = extractHowToSteps(md);

  const heroImage = blogPostImage(post.frontmatter.slug, post.frontmatter.category).src;

  const allPosts = await getAllBlogPostsCached(locale);
  const related = allPosts.filter((p) => p.frontmatter.slug !== slug).slice(0, 3);

  const postPath = `/${locale}/blog/${slug}`;

  const schemas: object[] = [
    articleSchema(post.frontmatter, post.h1, heroImage),
    breadcrumbSchema([
      { name: nav.home, path: homePath(locale) },
      { name: nav.blog, path: blogPath(locale) },
      { name: post.h1, path: postPath },
    ]),
    faqSchema(faqs),
  ].filter(Boolean) as object[];

  if (post.frontmatter.schema.includes("HowTo") && howToSteps.length > 0) {
    schemas.push(howToSchema(post.h1, howToSteps));
  }

  return (
    <>
      <JsonLd data={schemas} />
      <ArticleLayout
        locale={locale}
        post={post}
        html={html}
        toc={toc}
        related={related}
        faqs={faqs}
      />
    </>
  );
}

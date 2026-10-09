import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cacheLife, cacheTag } from "next/cache";
import { defaultLocale, type Locale } from "@/lib/i18n/config";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type PageFrontmatter = {
  url: string;
  seo_title: string;
  meta_description: string;
  main_keyword: string;
  schema: string[];
};

export type BlogFrontmatter = {
  slug: string;
  seo_title: string;
  meta_description: string;
  main_keyword: string;
  category: string;
  author: string;
  date: string;
  reading_time: string;
  schema: string[];
};

export type PageContent = {
  frontmatter: PageFrontmatter;
  body: string;
  h1: string;
};

export type BlogPost = {
  frontmatter: BlogFrontmatter;
  body: string;
  h1: string;
};

function normalizeMarkdownNewlines(text: string): string {
  return text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function extractH1(body: string): string {
  const match = body.match(/^#\s+(.+)$/m);
  if (!match) return "";
  return match[1]
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();
}

function resolvePagePath(name: string, locale?: Locale): string {
  const loc = locale ?? defaultLocale;
  const localized = path.join(CONTENT_DIR, "pages", loc, `${name}.md`);
  if (fs.existsSync(localized)) return localized;
  return path.join(CONTENT_DIR, "pages", `${name}.md`);
}

function readPage(name: string, locale?: Locale): PageContent {
  const filePath = resolvePagePath(name, locale);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const body = normalizeMarkdownNewlines(content).trim();
  return {
    frontmatter: data as PageFrontmatter,
    body,
    h1: extractH1(body),
  };
}

/** Sync read; prefer {@link getPageCached} for locale-specific pages (Cache Components). */
export function getPage(name: string, locale?: Locale): PageContent {
  return readPage(name, locale);
}

/** Locale-scoped cache entry so partial prefetch does not reuse another language's body. */
export async function getPageCached(
  name: string,
  locale: Locale,
): Promise<PageContent> {
  "use cache";
  cacheLife("max");
  cacheTag(`page:${name}:${locale}`);
  return readPage(name, locale);
}

function listMarkdownSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith(".md"))
    .map((e) => e.name.replace(/\.md$/, ""));
}

function resolveBlogPath(slug: string, locale: Locale): string {
  const localized = path.join(CONTENT_DIR, "blog", locale, `${slug}.md`);
  if (fs.existsSync(localized)) return localized;
  return path.join(CONTENT_DIR, "blog", `${slug}.md`);
}

export function getAllBlogSlugs(locale: Locale = defaultLocale): string[] {
  const localizedDir = path.join(CONTENT_DIR, "blog", locale);
  const localized = listMarkdownSlugs(localizedDir);
  if (localized.length > 0) return localized;
  return listMarkdownSlugs(path.join(CONTENT_DIR, "blog"));
}

function readBlogPost(slug: string, locale: Locale): BlogPost {
  const filePath = resolveBlogPath(slug, locale);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Blog post not found: ${slug} (${locale})`);
  }
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const body = normalizeMarkdownNewlines(content).trim();
  return {
    frontmatter: { ...(data as BlogFrontmatter), slug },
    body,
    h1: extractH1(body),
  };
}

/** @deprecated Use {@link getBlogPost} with locale or {@link getBlogPostCached}. */
export function getBlogPost(slug: string, locale: Locale = defaultLocale): BlogPost {
  return readBlogPost(slug, locale);
}

export async function getBlogPostCached(
  slug: string,
  locale: Locale,
): Promise<BlogPost> {
  "use cache";
  cacheLife("max");
  cacheTag(`blog:${slug}:${locale}`);
  return readBlogPost(slug, locale);
}

export function getAllBlogPosts(locale: Locale = defaultLocale): BlogPost[] {
  return getAllBlogSlugs(locale)
    .map((slug) => readBlogPost(slug, locale))
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}

export async function getAllBlogPostsCached(
  locale: Locale,
): Promise<BlogPost[]> {
  "use cache";
  cacheLife("max");
  cacheTag(`blog:index:${locale}`);
  return getAllBlogPosts(locale);
}

import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/content";
import { FaqItem } from "@/lib/parse";
import { blogPostImage } from "@/lib/images";
import {
  blogPath,
  homePath,
  localeDirection,
  type Locale,
} from "@/lib/i18n/config";
import { getBlogUi, getNavLabels } from "@/lib/i18n/messages";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BlogCard } from "./BlogCard";
import { FAQ } from "@/components/sections/FAQ";

export function ArticleLayout({
  locale,
  post,
  html,
  toc,
  related,
  faqs = [],
}: {
  locale: Locale;
  post: BlogPost;
  html: string;
  toc: { id: string; text: string }[];
  related: BlogPost[];
  faqs?: FaqItem[];
}) {
  const hero = blogPostImage(post.frontmatter.slug, post.frontmatter.category);
  const author = post.frontmatter.author.replace(/^\[|\]$/g, "").trim();
  const nav = getNavLabels(locale);
  const ui = getBlogUi(locale);

  return (
    <article
      className="bg-white pb-20 pt-28"
      dir={localeDirection(locale)}
      lang={locale}
    >
      <div className="mx-auto max-w-6xl px-4">
        <Breadcrumbs
          items={[
            { label: nav.home, href: homePath(locale) },
            { label: nav.blog, href: blogPath(locale) },
            { label: post.h1 },
          ]}
        />

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-14">
          <div className="min-w-0">
            <header className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {post.frontmatter.category}
              </p>
              <h1 className="mt-3 font-serif text-4xl leading-tight text-ink md:text-[2.75rem]">
                {post.h1}
              </h1>
              <p className="mt-4 text-sm text-ink/70">
                {post.frontmatter.date} · {post.frontmatter.reading_time} · {author}
              </p>
            </header>

            <div className="relative mt-8 aspect-[2/1] max-w-4xl overflow-hidden rounded-xl bg-stone-100 shadow-sm">
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 896px"
                className="object-cover"
              />
            </div>

            <div
              className="prose-hammam mt-10 max-w-3xl"
              dangerouslySetInnerHTML={{ __html: html }}
            />

          </div>

          {toc.length > 0 ? (
            <aside className="hidden lg:block">
              <nav
                aria-label={ui.tableOfContents}
                className="sticky top-28 border-l border-gold/25 pl-5"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-ink/55">
                  {ui.tableOfContents}
                </p>
                <ol className="mt-4 space-y-2.5 text-sm">
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="link-underline text-ink/80 hover:text-ink">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          ) : null}
        </div>

        {faqs.length > 0 ? (
          <div className="mt-16 max-w-3xl">
            <FAQ items={faqs} title={ui.faqTitle} locale={locale} />
          </div>
        ) : null}

        {related.length > 0 ? (
          <section className="mt-16 pt-4">
            <h2 className="font-serif text-2xl text-ink md:text-3xl">{ui.relatedArticles}</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.frontmatter.slug} post={p} locale={locale} />
              ))}
            </div>
            <p className="mt-8 text-sm">
              <Link href={blogPath(locale)} className="link-underline">
                {ui.viewAllArticles}
              </Link>
            </p>
          </section>
        ) : null}
      </div>
    </article>
  );
}

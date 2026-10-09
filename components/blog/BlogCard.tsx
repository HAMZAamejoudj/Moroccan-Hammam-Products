import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/content";
import { blogPostPath, localeDirection, type Locale } from "@/lib/i18n/config";
import { blogPostImage } from "@/lib/images";

export function BlogCard({ post, locale }: { post: BlogPost; locale: Locale }) {
  const img = blogPostImage(post.frontmatter.slug, post.frontmatter.category);
  const href = blogPostPath(locale, post.frontmatter.slug);
  return (
    <article
      className="group flex flex-col overflow-hidden rounded-lg border border-gold/15 bg-white shadow-sm ring-1 ring-ink/5"
      dir={localeDirection(locale)}
      lang={locale}
    >
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden bg-surface">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          {post.frontmatter.category}
        </p>
        <h2 className="mt-2 font-serif text-xl leading-snug text-ink">
          <Link href={href} className="hover:text-primary">
            {post.h1}
          </Link>
        </h2>
        <p className="mt-2 flex-1 text-sm text-ink/75 line-clamp-3">
          {post.frontmatter.meta_description}
        </p>
        <p className="mt-4 text-xs text-ink/60">
          {post.frontmatter.date} · {post.frontmatter.reading_time}
        </p>
      </div>
    </article>
  );
}

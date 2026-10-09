"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { usePageLocale } from "@/components/i18n/LocaleProvider";
import { localizeHref } from "@/lib/i18n/localize-href";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-primary text-cream hover:bg-primary/90 border border-primary shadow-sm",
  secondary:
    "bg-surface text-ink border border-gold/40 hover:border-gold/70",
  ghost: "text-primary hover:bg-surface/80 border border-transparent",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}) {
  const locale = usePageLocale();
  const resolvedHref =
    external || href.startsWith("http") ? href : localizeHref(href, locale);

  const cls = cn(
    "inline-flex min-h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-md px-5 py-2.5 text-sm font-medium leading-none tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    styles[variant],
    className,
  );
  if (external || href.startsWith("http")) {
    return (
      <a href={resolvedHref} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={resolvedHref} className={cls}>
      {children}
    </Link>
  );
}

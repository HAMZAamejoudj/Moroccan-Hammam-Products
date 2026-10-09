import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 pt-28 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent">404</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">Page not found</h1>
      <p className="mt-4 text-ink/80">
        That page may have moved. Start from home, explore private label, or request a quote.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Home</Button>
        <Button href="/private-label" variant="secondary">
          Private Label
        </Button>
        <Button href="/contact" variant="ghost">
          Contact
        </Button>
      </div>
      <p className="mt-8 text-sm">
        <Link href="/blog" className="link-underline">
          Browse the blog
        </Link>
      </p>
    </div>
  );
}

import { Button } from "@/components/ui/Button";
import { isWhatsAppButton } from "@/lib/home-cta";
import { ButtonSpec, unwrapBracketPlaceholders } from "@/lib/parse";
import { cn } from "@/lib/cn";

const quoteBtn =
  "!border-2 !border-cream !bg-cream !text-primary shadow-lg ring-2 ring-black/10 hover:!bg-white hover:!text-primary";
const whatsAppBtn =
  "!border-2 !border-cream !bg-accent !text-cream shadow-lg ring-2 ring-cream/25 hover:!bg-accent/90 hover:!text-cream";

export function CTABand({
  title,
  body,
  buttons,
  whatsappHref,
}: {
  title: string;
  body?: string;
  buttons: ButtonSpec[];
  whatsappHref?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-primary py-16 text-cream md:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-gold blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-3xl px-4 text-center">
        {title ? (
          <h2 className="font-serif text-3xl md:text-4xl">{title}</h2>
        ) : null}
        {body ? (
          <p className={cn("text-base leading-relaxed text-cream/90", title ? "mt-4" : "")}>
            {unwrapBracketPlaceholders(body)}
          </p>
        ) : null}
        <div
          className={cn(
            "flex flex-wrap items-center justify-center gap-3",
            title || body ? "mt-8" : "",
          )}
        >
          {buttons.map((b) => {
            const wa = isWhatsAppButton(b);
            const href = b.href === "whatsapp" && whatsappHref ? whatsappHref : b.href;
            const external = href.startsWith("http");
            return (
              <Button
                key={b.label}
                href={href}
                variant="ghost"
                className={cn(
                  "px-6 py-3 text-sm font-semibold md:text-base",
                  wa ? whatsAppBtn : quoteBtn,
                )}
                external={external}
              >
                {b.label}
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

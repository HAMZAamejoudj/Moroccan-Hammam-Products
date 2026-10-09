import { cn } from "@/lib/cn";
import { unwrapBracketPlaceholders } from "@/lib/parse";

export function StepsTimeline({
  steps,
  className,
}: {
  steps: string[];
  className?: string;
}) {
  return (
    <ol className={cn("flex flex-col", className)}>
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <li key={i} className="grid grid-cols-[2.75rem_1fr] gap-x-4 md:grid-cols-[3rem_1fr] md:gap-x-5">
            <div className="flex flex-col items-center pt-0.5">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-[0.9375rem] font-semibold leading-none text-cream tabular-nums"
                aria-hidden
              >
                {i + 1}
              </span>
              {!isLast ? (
                <span
                  className="my-1.5 w-0.5 flex-1 min-h-8 rounded-full bg-gold/35"
                  aria-hidden
                />
              ) : null}
            </div>
            <p
              className={cn(
                "pt-1.5 text-base leading-relaxed text-ink/90",
                !isLast && "pb-6 md:pb-8",
              )}
            >
              {unwrapBracketPlaceholders(step)}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  className?: string;
  as?: "h2" | "h3";
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <Tag className="font-serif text-3xl leading-tight text-ink md:text-4xl">
        {title}
      </Tag>
    </div>
  );
}

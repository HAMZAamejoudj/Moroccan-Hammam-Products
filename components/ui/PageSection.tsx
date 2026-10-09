import { cn } from "@/lib/cn";

/** Unified white section below the hero */
export function PageSection({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "bg-white py-14 md:py-20",
        className,
      )}
    >
      {children}
    </section>
  );
}

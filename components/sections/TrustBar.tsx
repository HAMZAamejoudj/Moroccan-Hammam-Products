export function TrustBar({ items }: { items: string[] }) {
  return (
    <div className="bg-white py-4">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 text-center text-xs font-medium uppercase tracking-wider text-ink/80 md:text-sm">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-gold" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

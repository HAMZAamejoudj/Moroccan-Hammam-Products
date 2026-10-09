/** Renders a simple GFM pipe table from markdown text */
export function MarkdownTable({ markdown }: { markdown: string }) {
  const lines = markdown
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("|"));
  if (lines.length < 2) return null;
  const rows = lines
    .filter((l) => !/^\|\s*-/.test(l))
    .map((l) =>
      l
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((c) => c.trim()),
    );
  const [head, ...body] = rows;
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-gold/20">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-surface/80">
          <tr>
            {head.map((cell) => (
              <th key={cell} className="px-4 py-3 font-medium text-ink">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, i) => (
            <tr key={i} className="border-t border-gold/15">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-ink/85">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

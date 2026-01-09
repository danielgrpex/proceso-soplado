// app/soplado/_components/LineTabs.tsx
"use client";

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

export function LineTabs({
  lines,
  active,
  onSelect,
}: {
  lines: Array<{ key: string; count: number }>;
  active: string;
  onSelect: (k: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {lines.map((l) => (
        <button
          key={l.key}
          type="button"
          onClick={() => onSelect(l.key)}
          className={cx(
            "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition",
            active === l.key
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
          )}
        >
          <span>{l.key}</span>
          <span
            className={cx(
              "rounded-full px-2 py-0.5 text-xs font-semibold",
              active === l.key ? "bg-white/15 text-white" : "bg-white text-neutral-700"
            )}
          >
            {l.count}
          </span>
        </button>
      ))}
    </div>
  );
}

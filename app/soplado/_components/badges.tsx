"use client";

/* =========================
   BADGE STYLES
   ========================= */

export function badgeEstadoClass(estado: string) {
  const e = estado.trim().toLowerCase();
  if (e.includes("produ")) return "bg-blue-50 text-blue-700 ring-blue-200";
  if (e.includes("paus")) return "bg-amber-50 text-amber-700 ring-amber-200";
  if (e.includes("final")) return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  if (e.includes("entreg")) return "bg-violet-50 text-violet-700 ring-violet-200";
  return "bg-neutral-100 text-neutral-700 ring-neutral-200";
}

export function badgePriClass(pri: string) {
  const p = pri.trim();
  if (p === "1") return "bg-red-50 text-red-700 ring-red-200";
  if (p === "2") return "bg-orange-50 text-orange-700 ring-orange-200";
  if (p === "3") return "bg-amber-50 text-amber-700 ring-amber-200";
  return "bg-neutral-100 text-neutral-700 ring-neutral-200";
}

/* =========================
   HEADER / EXPLAIN BADGE
   ========================= */

export function ExplainBadge({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      <div className="mb-2 inline-flex items-center gap-2">
        <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-white">
          Programación — Soplado
        </span>
        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
          Operativo
        </span>
      </div>

      <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-1 text-sm text-neutral-600">{subtitle}</p>
      )}
    </div>
  );
}

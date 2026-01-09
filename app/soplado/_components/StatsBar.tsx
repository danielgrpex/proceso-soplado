// app/soplado/_components/StatsBar.tsx
"use client";

export function StatsBar({
  line,
  count,
  undTotal,
}: {
  line: string;
  count: number;
  undTotal: number;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <div className="rounded-2xl border border-neutral-200 bg-white p-4">
        <div className="text-xs font-medium text-neutral-600">Línea seleccionada</div>
        <div className="mt-1 text-lg font-semibold text-neutral-900">{line}</div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-4">
        <div className="text-xs font-medium text-neutral-600">Órdenes en cola</div>
        <div className="mt-1 text-lg font-semibold text-neutral-900">{count}</div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-4">
        <div className="text-xs font-medium text-neutral-600">UND total (cargado)</div>
        <div className="mt-1 text-lg font-semibold text-neutral-900">
          {undTotal.toLocaleString("es-CO")}
        </div>
        <div className="mt-1 text-xs text-neutral-500">
          *Suma solo lo visible en la cola seleccionada.
        </div>
      </div>
    </div>
  );
}

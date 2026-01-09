"use client";

import { useMemo, useState } from "react";

export type Row = Record<string, any>;

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function norm(v: any) {
  return String(v ?? "").trim();
}

function pick(row: Row, key: string) {
  if (!row) return "";
  if (key in row) return row[key];
  const found = Object.keys(row).find((k) => k.toLowerCase() === key.toLowerCase());
  return found ? row[found] : "";
}

function num(v: any) {
  if (v === null || v === undefined) return NaN;

  const s = String(v).trim();

  // Caso típico Sheets LATAM: 10,000 / 2,000
  if (/^\d{1,3}(,\d{3})+$/.test(s)) {
    return Number(s.replace(/,/g, ""));
  }

  // Caso con puntos de miles: 10.000
  if (/^\d{1,3}(\.\d{3})+$/.test(s)) {
    return Number(s.replace(/\./g, ""));
  }

  // Caso simple: 10000
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}


function priorityValue(row: Row) {
  const p = pick(row, "Prioridad");
  const n = num(p);
  if (Number.isFinite(n)) return n;
  // si viene como texto tipo "N/A" => al final
  return 999999;
}

function dateText(row: Row, key: string) {
  const v = norm(pick(row, key));
  return v || "—";
}

function estadoKey(row: Row) {
  return norm(pick(row, "Estado")) || "—";
}

function cantidadText(row: Row) {
  const v = norm(pick(row, "Cantidad"));
  return v || "—";
}

function productoTitle(row: Row) {
  const nombre = norm(pick(row, "Nombre Siigo"));
  const prod = norm(pick(row, "Producto"));
  return nombre || prod || "—";
}

function clienteTitle(row: Row) {
  return norm(pick(row, "Cliente")) || "—";
}

function chipEstadoClass(estado: string) {
  const e = estado.toLowerCase();

  if (e.includes("producción") || e.includes("produccion")) {
    return "bg-blue-50 text-blue-700 ring-1 ring-blue-200";
  }
  if (e.includes("ingres")) {
    return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
  }
  if (e.includes("paus")) {
    return "bg-amber-50 text-amber-800 ring-1 ring-amber-200";
  }
  if (e.includes("final")) {
    return "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
  }
  return "bg-neutral-100 text-neutral-700 ring-1 ring-neutral-200";
}

function prettyLabel(key: string) {
  // Ocultamos ciclo SIEMPRE
  if (key.toLowerCase() === "ciclo") return "";
  return key;
}

function safeDetailEntries(row: Row) {
  // Filtramos keys que jamás deben mostrarse
  const hidden = new Set(["ciclo"]);
  return Object.entries(row).filter(([k]) => !hidden.has(k.trim().toLowerCase()));
}

export function SopladoPlantaView({
  items,
  onRefresh,
  loading,
}: {
  items: Row[];
  onRefresh?: () => void;
  loading?: boolean;
}) {
  const [selected, setSelected] = useState<Row | null>(null);

  // ✅ Orden por prioridad (ASC) + fallback por Inicio Est (ASC) + Consecutivo (ASC)
  const ordered = useMemo(() => {
    const arr = Array.isArray(items) ? [...items] : [];
    arr.sort((a, b) => {
      const pa = priorityValue(a);
      const pb = priorityValue(b);
      if (pa !== pb) return pa - pb;

      const da = dateText(a, "Fecha Estimada Inicio");
      const db = dateText(b, "Fecha Estimada Inicio");
      if (da !== db) return da.localeCompare(db);

      const ca = String(pick(a, "Consecutivo") ?? "");
      const cb = String(pick(b, "Consecutivo") ?? "");
      return ca.localeCompare(cb);
    });
    return arr;
  }, [items]);

  const totalUnd = useMemo(() => {
    let s = 0;
    for (const r of ordered) {
      const c = num(pick(r, "Cantidad"));
      if (Number.isFinite(c)) s += c;
    }
    return s;
  }, [ordered]);

  return (
    <div className="rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
      {/* Header card */}
      <div className="flex items-start justify-between gap-4 border-b border-neutral-200 px-6 py-5">
        <div>
          <div className="text-sm font-semibold text-neutral-900">
            MÁQUINA: SOPLADORA JN-370
          </div>
          <div className="mt-1 text-xs text-neutral-500">
            Ordenada por <span className="font-medium">Prioridad</span>.
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onRefresh ? (
            <button
              type="button"
              onClick={onRefresh}
              className="inline-flex h-9 items-center justify-center rounded-xl border border-neutral-200 bg-white px-3 text-sm font-medium shadow-sm hover:bg-neutral-50"
            >
              {loading ? "Cargando..." : "Refrescar"}
            </button>
          ) : null}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-3 px-6 py-5 md:grid-cols-3">
        <StatCard label="Órdenes en cola" value={String(ordered.length)} />
        <StatCard label="UND total (cargado)" value={formatNumber(totalUnd)} />
      </div>

      {/* List */}
      <div className="px-6 pb-6">
        <div className="grid gap-3">
          {ordered.length === 0 ? (
            <Empty />
          ) : (
            ordered.map((row, idx) => {
              const estado = estadoKey(row);
              const prioridad = norm(pick(row, "Prioridad")) || "—";
              const consecutivo = norm(pick(row, "Consecutivo")) || String(idx + 1);

              const inicioEst = dateText(row, "Fecha Estimada Inicio");
              const entregaEst = dateText(row, "Fecha Estimada Entrega Almacén");

              const isActive =
                selected && String(pick(selected, "Consecutivo")) === String(pick(row, "Consecutivo"));

              return (
                <div
                  key={`${consecutivo}-${idx}`}
                  className={cx(
                    "rounded-2xl border bg-white shadow-sm transition",
                    isActive ? "border-indigo-200 ring-2 ring-indigo-600/10" : "border-neutral-200 hover:bg-neutral-50"
                  )}
                >
                  <div className="flex flex-col gap-3 p-4 md:flex-row md:items-start md:justify-between">
                    {/* Left */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-lg bg-neutral-100 px-2 py-1 text-xs font-semibold text-neutral-700">
                          #{consecutivo}
                        </span>

                        <span className={cx("rounded-full px-2 py-1 text-xs font-medium", chipEstadoClass(estado))}>
                          {estado}
                        </span>

                        <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700 ring-1 ring-neutral-200">
                          Prioridad {prioridad}
                        </span>
                        <span className="rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-200">
                          UND {cantidadText(row)}
                        </span>
                      </div>
                      <div className="mt-2 min-w-0">
                        <div className="truncate text-sm font-semibold text-neutral-900">
                          {clienteTitle(row)} — {productoTitle(row)}
                        </div>

                        <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-neutral-600">
                          {norm(pick(row, "Referencia")) ? <li>Referencia: {norm(pick(row, "Referencia"))}</li> : null}
                          {norm(pick(row, "Color")) ? <li>Color: {norm(pick(row, "Color"))}</li> : null}
                          {norm(pick(row, "Material")) ? <li>Material: {norm(pick(row, "Material"))}</li> : null}
                        </ul>
                      </div>
                    </div>

                    {/* Right controls */}
                    <div className="flex flex-wrap items-center gap-2 md:justify-end">
                      {/* ✅ Chips de fechas (sutiles) */}
                      <div className="flex flex-wrap gap-2">
                        <DateChip label="Inicio Est." value={inicioEst} />
                        <DateChip label="Entrega Est." value={entregaEst} />
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelected(row)}
                        className="inline-flex h-9 items-center justify-center rounded-xl bg-indigo-600 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
                      >
                        Ver detalle
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modal detalle */}
      <SopladoModal
        open={!!selected}
        row={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
      <div className="text-xs font-medium text-neutral-600">{label}</div>
      <div className="mt-2 text-xl font-semibold text-neutral-900">{value}</div>
    </div>
  );
}

function Empty() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
      No hay datos para mostrar.
    </div>
  );
}

function DateChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs">
      <div className="text-[11px] font-medium text-neutral-500">{label}</div>
      <div className="mt-0.5 font-semibold text-neutral-900">{value}</div>
    </div>
  );
}

function formatNumber(n: number) {
  try {
    return new Intl.NumberFormat("es-CO").format(n);
  } catch {
    return String(n);
  }
}

/* ===================== Modal ===================== */

export function SopladoModal({
  open,
  row,
  onClose,
}: {
  open: boolean;
  row: Row | null;
  onClose: () => void;
}) {
  if (!open || !row) return null;

  const entries = safeDetailEntries(row);

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      {/* dialog */}
      <div className="absolute left-1/2 top-1/2 w-[min(920px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white shadow-2xl ring-1 ring-black/10">
        <div className="flex items-start justify-between gap-4 border-b border-neutral-200 px-6 py-5">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-neutral-900">
              Detalle — Consecutivo {norm(pick(row, "Consecutivo")) || "—"}
            </div>
            <div className="mt-1 text-xs text-neutral-500">
              Vista completa del registro.
            </div>
          </div>

          <button
            onClick={onClose}
            className="inline-flex h-9 items-center justify-center rounded-xl border border-neutral-200 bg-white px-3 text-sm font-medium hover:bg-neutral-50"
          >
            Cerrar
          </button>
        </div>

        <div className="max-h-[70vh] overflow-auto px-6 py-5">
          <div className="grid gap-3 md:grid-cols-2">
            {entries.map(([k, v]) => {
              const label = prettyLabel(k);
              if (!label) return null;

              return (
                <div key={k} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                  <div className="text-xs font-semibold text-neutral-600">{label}</div>
                  <div className="mt-1 break-words text-sm text-neutral-900">{norm(v) || "—"}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-neutral-200 px-6 py-4 text-xs text-neutral-500">
          
        </div>
      </div>
    </div>
  );
}

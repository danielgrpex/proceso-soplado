// app/soplado/_components/DetailModal.tsx
"use client";

import type { Row } from "./types";
import { norm } from "./utils";

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function prettyLabel(k: string) {
  return k.replace(/\s+/g, " ").trim();
}

const HIDE_KEYS = new Set([
  "Ciclo",
  "ciclo",
  "CICLO",
]);

export function DetailModal({
  open,
  row,
  onClose,
}: {
  open: boolean;
  row: Row | null;
  onClose: () => void;
}) {
  if (!open || !row) return null;

  const entries = Object.entries(row)
    .filter(([k]) => !HIDE_KEYS.has(String(k)))
    .filter(([_, v]) => norm(v))
    .sort(([a], [b]) => String(a).localeCompare(String(b)));

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="absolute left-1/2 top-1/2 w-[min(920px,92vw)] -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-3xl bg-white shadow-xl ring-1 ring-black/10 overflow-hidden">
          <div className="flex items-start justify-between gap-3 border-b border-neutral-200 px-6 py-4">
            <div>
              <div className="text-sm font-semibold text-neutral-900">
                Detalle de solicitud
              </div>
              <div className="mt-1 text-xs text-neutral-500">
                Vista tipo PEX · “Ciclo” está oculto por regla.
              </div>
            </div>

            <button
              onClick={onClose}
              className="inline-flex h-9 items-center justify-center rounded-xl border border-neutral-200 bg-white px-3 text-sm font-medium hover:bg-neutral-50"
            >
              Cerrar
            </button>
          </div>

          <div className="max-h-[70vh] overflow-auto p-6">
            <div className="grid gap-3 md:grid-cols-2">
              {entries.map(([k, v]) => (
                <div
                  key={k}
                  className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4"
                >
                  <div className="text-xs font-semibold text-neutral-600">
                    {prettyLabel(String(k))}
                  </div>
                  <div className={cx("mt-1 text-sm text-neutral-900 break-words")}>
                    {norm(v) || "-"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-neutral-200 px-6 py-4 text-xs text-neutral-500">
            *Más adelante aquí ponemos botones: “Cambiar estado”, “Registrar inicio”, “Entregar a almacén”, etc.
          </div>
        </div>
      </div>
    </div>
  );
}

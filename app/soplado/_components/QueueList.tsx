// app/soplado/_components/QueueList.tsx
"use client";

import type { Row } from "./types";
import { badgeEstadoClass, badgePriClass } from "./badges";
import { norm, pick, safeInt } from "./utils";

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

export function QueueList({
  items,
  onUp,
  onDown,
  onOpen,
}: {
  items: Row[];
  onUp: (id: string) => void;
  onDown: (id: string) => void;
  onOpen: (row: Row) => void;
}) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
        No hay órdenes en esta línea.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((row, idx) => {
        const id = String(pick(row, "Consecutivo") ?? "").trim();
        const cliente = norm(pick(row, "Cliente")) || "-";
        const producto = norm(pick(row, "Nombre Siigo")) || norm(pick(row, "Producto")) || "-";
        const estado = norm(pick(row, "Estado")) || "Ingresado";
        const prioridad = norm(pick(row, "Prioridad")) || "";
        const und = safeInt(pick(row, "Cantidad"));

        // mini resumen en bullets (tipo extrusión)
        const ref = norm(pick(row, "Referencia"));
        const color = norm(pick(row, "Color"));
        const material = norm(pick(row, "Material"));

        return (
          <div
            key={idx}
            className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-sm font-semibold text-neutral-900">
                    #{id || "-"}
                  </div>

                  <span className={cx("rounded-full px-2 py-1 text-xs font-semibold ring-1", badgeEstadoClass(estado))}>
                    {estado}
                  </span>

                  {prioridad ? (
                    <span className={cx("rounded-full px-2 py-1 text-xs font-semibold ring-1", badgePriClass(prioridad))}>
                      Prioridad {prioridad}
                    </span>
                  ) : null}

                  <span className="rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-700">
                    UND {und.toLocaleString("es-CO")}
                  </span>

                  <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700">
                    pos {idx + 1}
                  </span>
                </div>

                <div className="mt-2 text-sm text-neutral-800">
                  <b className="text-neutral-900">{cliente}</b> —{" "}
                  <span className="text-neutral-700">{producto}</span>
                </div>

                <div className="mt-2 text-xs text-neutral-600">
                  <ul className="list-disc space-y-1 pl-5">
                    {ref ? <li>Referencia: {ref}</li> : null}
                    {color ? <li>Color: {color}</li> : null}
                    {material ? <li>Material: {material}</li> : null}
                  </ul>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => onUp(id)}
                  className="inline-flex h-9 items-center justify-center rounded-xl border border-neutral-200 bg-white px-3 text-sm font-medium hover:bg-neutral-50"
                >
                  ↑ Subir
                </button>
                <button
                  onClick={() => onDown(id)}
                  className="inline-flex h-9 items-center justify-center rounded-xl border border-neutral-200 bg-white px-3 text-sm font-medium hover:bg-neutral-50"
                >
                  ↓ Bajar
                </button>
                <button
                  onClick={() => onOpen(row)}
                  className="inline-flex h-9 items-center justify-center rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
                >
                  Ver detalle
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

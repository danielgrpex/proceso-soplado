// app/soplado/linea/[lineaId]/page.tsx
import Link from "next/link";
import { Shell } from "@/components/layout/Shell";
import { TopBar } from "@/components/layout/Topbar";

export default function LineaPage({ params }: { params: { lineaId: string } }) {
  const lineaId = params.lineaId;

  return (
    <>
      <TopBar />
      <Shell>
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
              Línea: {lineaId}
            </div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900">
              Programación
            </h1>
            <p className="mt-1 text-sm text-neutral-600">
              Aquí vamos a mostrar tarjetas / timeline / tabla bonita.
            </p>
          </div>

          <Link
            href="/soplado"
            className="inline-flex h-9 items-center justify-center rounded-xl border border-neutral-200 bg-white px-3 text-sm font-medium hover:bg-neutral-50"
          >
            Volver
          </Link>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-neutral-900">
            Próximo: conectar Google Sheets
          </div>
          <div className="mt-1 text-sm text-neutral-600">
            Vamos a leer la programación y renderizarla por fecha / prioridad / estado.
          </div>
        </div>
      </Shell>
    </>
  );
}

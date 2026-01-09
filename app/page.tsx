// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-140px)] bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            Programación de Soplado 2026
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Consulta operativa (solo lectura). Inicia sesión con tu correo @inplastgr.com.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/soplado"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-neutral-900 px-4 text-sm font-semibold text-white hover:bg-neutral-800"
            >
              Ir a Soplado
            </Link>

            <a
              href="mailto:daniel.alfonso@inplastgr.com"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 text-sm font-medium hover:bg-neutral-50"
            >
              Soporte
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

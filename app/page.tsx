// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-140px)]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          {/* header suave dentro del card */}
          <div className="border-b border-neutral-200 bg-gradient-to-b from-neutral-50 to-white px-8 py-7">
            <div className="inline-flex items-center gap-2">
              <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-white">
                Programación 2026
              </span>
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                Soplado
              </span>
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                Solo lectura
              </span>
            </div>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900">
              Programación de Soplado
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-neutral-600">
              Consulta operativa (solo lectura). Inicia sesión con tu correo{" "}
              <span className="font-medium text-neutral-800">@inplastgr.com</span>.
            </p>
          </div>

          {/* contenido */}
          <div className="px-8 py-8">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                <div className="text-xs font-medium text-neutral-500">Módulo</div>
                <div className="mt-1 text-sm font-semibold text-neutral-900">Programación</div>
                <div className="mt-2 text-xs text-neutral-600">
                  Órdenes activas (En cola / En producción).
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                <div className="text-xs font-medium text-neutral-500">Módulo</div>
                <div className="mt-1 text-sm font-semibold text-neutral-900">Historial</div>
                <div className="mt-2 text-xs text-neutral-600">
                  Órdenes finalizadas para consulta.
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                <div className="text-xs font-medium text-neutral-500">Acceso</div>
                <div className="mt-1 text-sm font-semibold text-neutral-900">Dominio</div>
                <div className="mt-2 text-xs text-neutral-600">
                  Solo correos <span className="font-medium">@inplastgr.com</span>.
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-2">
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

              <div className="ml-auto text-xs text-neutral-500">
                Tip: si no estás logueado, te pedirá iniciar sesión al entrar a los módulos.
              </div>
            </div>
          </div>

          {/* detalle visual suave */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-indigo-200/30 blur-3xl" />
          <div className="pointer-events-none absolute -left-28 -bottom-24 h-56 w-56 rounded-full bg-sky-200/25 blur-3xl" />
        </div>
      </div>
    </div>
  );
}

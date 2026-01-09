import Link from "next/link";
import { ReactNode } from "react";

export default function SopladoLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">

          {/* ✅ Branding clickeable -> Inicio */}
          <Link href="/soplado" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white">
              GR
            </div>
            <div className="text-sm font-semibold text-neutral-900">
              Programación · Soplado
            </div>
          </Link>

          <nav className="flex items-center gap-1">
            <Tab href="/soplado/programacion" label="Programación" />
            <Tab href="/soplado/historial" label="Historial" />
          </nav>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}

function Tab({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-xl px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
    >
      {label}
    </Link>
  );
}

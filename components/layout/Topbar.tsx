// components/layout/TopBar.tsx
"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

function shortEmail(email?: string | null) {
  if (!email) return "";
  // opcional: acortar visualmente
  return email.length > 28 ? email.slice(0, 24) + "…" : email;
}

export function TopBar() {
  const { data: session, status } = useSession();
  const email = session?.user?.email ?? null;
  const isAuthed = !!email;

  return (
    <div className="sticky top-0 z-30 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="block">
          <div className="text-sm font-semibold text-neutral-900">
            Programación de Soplado
          </div>
          <div className="text-xs text-neutral-500">
            Vista operativa · Proceso Soplado 2026
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {/* Link principal: si no hay sesión, lo "deshabilitamos" visualmente */}
          <Link
            href={isAuthed ? "/soplado" : "/"}
            className={[
              "inline-flex h-9 items-center justify-center rounded-xl border px-3 text-sm font-medium",
              isAuthed
                ? "border-neutral-200 bg-white hover:bg-neutral-50"
                : "border-neutral-200 bg-neutral-100 text-neutral-400 cursor-not-allowed pointer-events-none",
            ].join(" ")}
            aria-disabled={!isAuthed}
          >
            Soplado
          </Link>

          {/* Estado auth */}
          {status === "loading" ? (
            <span className="text-xs text-neutral-500 px-2">Cargando…</span>
          ) : isAuthed ? (
            <>
              <span className="hidden sm:inline text-xs text-neutral-600 px-2">
                {shortEmail(email)}
              </span>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="inline-flex h-9 items-center justify-center rounded-xl bg-neutral-900 px-3 text-sm font-semibold text-white hover:bg-neutral-800"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn("google", { callbackUrl: "/soplado" })}
              className="inline-flex h-9 items-center justify-center rounded-xl bg-neutral-900 px-3 text-sm font-semibold text-white hover:bg-neutral-800"
            >
              Iniciar sesión
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

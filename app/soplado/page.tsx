import Link from "next/link";

export default function SopladoHome() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
        Soplado
      </h1>
      <p className="mt-1 text-sm text-neutral-600">
        Selecciona un módulo para continuar.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ModuleCard
          title="Programación"
          description="Vista tipo planta · ordenada por prioridad."
          href="/soplado/programacion"
        />

        <ModuleCard
          title="Historial"
          description="Órdenes finalizadas y entregadas."
          href="/soplado/historial"
        />
      </div>
    </div>
  );
}

function ModuleCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:border-neutral-300 hover:shadow-md"
    >
      <div className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-950">
        {title}
      </div>
      <p className="mt-1 text-sm text-neutral-600">{description}</p>

      <div className="mt-4 text-sm font-medium text-neutral-900">
        Entrar →
      </div>
    </Link>
  );
}

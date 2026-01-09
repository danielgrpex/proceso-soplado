"use client";

import { useEffect, useMemo, useState } from "react";
import { SopladoPlantaView, type Row } from "../_components/SopladoPlantaView";
import { ESTADOS_PROGRAMACION } from "../_components/constants";
import { hasEstado } from "../_components/utils";
import { ExplainBadge } from "../_components/badges"; // ✅ ojo aquí

export default function Page() {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    try {
      setLoading(true);
      const res = await fetch("/api/soplado/programacion", { cache: "no-store" });
      const data = await res.json();
      if (data?.success && Array.isArray(data?.items)) setItems(data.items);
      else setItems([]);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(
    () => items.filter((r) => hasEstado(r?.Estado, ESTADOS_PROGRAMACION)),
    [items]
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <ExplainBadge
        title="Programación — Soplado"
        subtitle="Órdenes activas (En cola / En producción)"
      />

      <SopladoPlantaView items={filtered} onRefresh={load} loading={loading} />
    </div>
  );
}

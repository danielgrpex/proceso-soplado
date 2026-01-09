import type { Row } from "./types";

export function norm(v: any) {
  return String(v ?? "").trim();
}

export function pick(row: Row, key: string) {
  if (key in row) return row[key];
  const found = Object.keys(row).find((k) => k.toLowerCase() === key.toLowerCase());
  return found ? row[found] : "";
}

export function safeInt(v: any) {
  const s = String(v ?? "").replace(/\./g, "").replace(",", ".").trim();
  const n = Number(s);
  return Number.isFinite(n) ? Math.round(n) : 0;
}

// 🔥 por ahora derivamos línea desde una columna si existe, si no: Linea 1
export function deriveLineKey(row: Row) {
  const v =
    pick(row, "Línea") ||
    pick(row, "Linea") ||
    pick(row, "Linea Produccion") ||
    pick(row, "Linea producción");
  const s = norm(v);
  return s || "Linea 1";
}

export function normText(v: any) {
  return String(v ?? "").trim().toLowerCase();
}

export function hasEstado(estadoValue: any, allowed: readonly string[]) {
  const e = normText(estadoValue);
  return allowed.some((s) => normText(s) === e);
}

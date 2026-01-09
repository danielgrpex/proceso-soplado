export const ESTADOS_PROGRAMACION = ["En cola", "En producción"] as const;
export const ESTADOS_HISTORIAL = ["Finalizada"] as const;

export type EstadoProgramacion = (typeof ESTADOS_PROGRAMACION)[number];
export type EstadoHistorial = (typeof ESTADOS_HISTORIAL)[number];

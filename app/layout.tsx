// app/layout.tsx
/// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { TopBar } from "@/components/layout/Topbar";
import { Footer } from "@/components/layout/Footer";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Programación Soplado",
  description: "Planificación y control de la línea de soplado",
  other: {
    "color-scheme": "light",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="light">
      <head>
        {/* 🔒 Fuerza modo claro (Chrome / Windows / Edge) */}
        <meta name="color-scheme" content="light" />
      </head>

      <body className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
        {/* ✅ Providers (NextAuth, Session, etc) */}
        <Providers>
          <TopBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

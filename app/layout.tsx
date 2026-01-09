// app/layout.tsx
// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { TopBar } from "@/components/layout/Topbar";
import { Footer } from "@/components/layout/Footer";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Programación Soplado",
  description: "Planificación y control de la línea de soplado",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-neutral-50 antialiased">
        {/* ✅ NextAuth Provider (cliente) */}
        <Providers>
          <TopBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

// middleware.ts
export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    // ✅ Protege todo lo de soplado (UI)
    "/soplado/:path*",

    // ✅ Protege tu API de soplado (evita lectura sin login)
    "/api/soplado/:path*",
  ],
};

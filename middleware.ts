// middleware.ts
// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Archivos públicos (imágenes, etc.)
const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Dejar público:
  // - Home (/)
  // - NextAuth (/api/auth)
  // - assets internos de Next
  // - favicon / archivos estáticos
  if (
    pathname === "/" ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // ✅ Todo lo demás requiere sesión + dominio @inplastgr.com
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const email = String((token as any)?.email || "").toLowerCase();
  const allowed = email.endsWith("@inplastgr.com");

  if (!token || !allowed) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("auth", "required");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Aplica a todo excepto assets internos comunes
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

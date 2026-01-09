// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // Si hay sesión → OK
      return !!token;
    },
  },
  pages: {
    signIn: "/?auth=required",
  },
});

export const config = {
  matcher: [
    /*
     * Protegemos SOLO soplado
     * Dejamos libre:
     * - /
     * - /api/auth
     */
    "/soplado/:path*",
  ],
};

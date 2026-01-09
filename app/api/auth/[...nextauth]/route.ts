import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

function assertEnv(name: string, value: string | undefined) {
  if (!value) throw new Error(`[auth] Missing env var: ${name}`);
  return value;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: assertEnv("GOOGLE_CLIENT_ID", process.env.GOOGLE_CLIENT_ID),
      clientSecret: assertEnv("GOOGLE_CLIENT_SECRET", process.env.GOOGLE_CLIENT_SECRET),
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user }) {
      const email = (user.email || "").toLowerCase().trim();
      const domain = (process.env.ALLOWED_DOMAIN || "inplastgr.com").toLowerCase();

      // ✅ Solo @inplastgr.com
      if (!email.endsWith(`@${domain}`)) return false;

      return true;
    },
    async jwt({ token }) {
      // Guardar email en token
      if (token.email) token.email = String(token.email).toLowerCase();
      return token;
    },
    async session({ session, token }) {
      if (session.user?.email) {
        session.user.email = String(token.email || session.user.email).toLowerCase();
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

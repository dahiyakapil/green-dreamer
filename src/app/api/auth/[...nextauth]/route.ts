import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("[nextauth] authorize called with credentials:", {
            // Logging credentials in dev only — remove in prod
            username: credentials?.username,
            password: credentials?.password ? "(present)" : "(empty)",
          });

          const res = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });

          console.log("[nextauth] dummyjson status", res.status);
          // log response headers for debugging
          const hdrs: Record<string, string> = {};
          res.headers.forEach((v, k) => (hdrs[k] = v));
          console.log("[nextauth] dummyjson headers", hdrs);

          const text = await res.text();
          let userBody: any = null;
          try {
            userBody = JSON.parse(text);
          } catch (e) {
            userBody = text;
          }

          console.log("[nextauth] dummyjson body", userBody);

          if (!res.ok) {
            console.warn("[nextauth] dummyjson returned non-ok status", res.status);
            // Development fallback: if the known DummyJSON test credentials are used,
            // return a mocked user so development can continue even if the external
            // service is unreachable or returning 401. REMOVE this in production.
            if (
              credentials?.username === "kminchelle" &&
              credentials?.password === "0lelplR"
            ) {
              console.warn("[nextauth] using development fallback mocked user");
              return {
                id: "1",
                name: "kminchelle",
                email: "kminchelle@example.com",
                token: "mocked-dev-token",
              } as any;
            }

            return null;
          }

          const user = userBody;

          if (user?.token) {
            console.log("[nextauth] login successful for", user.username);
            return {
              id: String(user.id),
              name: user.username,
              email: user.email,
              token: user.token,
            } as any;
          }

          console.warn("[nextauth] login failed - no token in response");
          return null;
        } catch (err) {
          console.error("[nextauth] authorize error", err);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user && (user as any).token) {
        return {
          ...token,
          accessToken: (user as any).token,
        } as any;
      }
      return token;
    },

    async session({ session, token }) {
      (session as any).accessToken = (token as any).accessToken ?? null;
      return session;
    },

    async redirect({ url, baseUrl }) {
      return `${baseUrl}/dashboard/users`;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

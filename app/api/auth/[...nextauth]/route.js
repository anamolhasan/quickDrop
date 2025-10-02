import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${apiUrl}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
          const data = await res.json();

          if (data.success && data.user) {
            return {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              image: data.user.photo || "https://i.ibb.co/2n8qPkw/default-avatar.png",
              role: data.user.role || "user",
              accessToken: data.token,
            };
          }
          return null;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {
      try {
        // Social login হলে user create/update করা
        await fetch(`${apiUrl}/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            photo: user.image,
          }),
        });
      } catch (error) {
        console.error("Error saving social login user:", error);
      }
      return true;
    },

    async jwt({ token, user }) {
      // Initial login (Credentials বা Social)
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.role = user.role || "user";
        token.accessToken = user.accessToken || null;
      }

      // Social login হলে backend JWT fetch করা
      if (!token.accessToken) {
        try {
          const res = await fetch(`${apiUrl}/login/social`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: token.email }),
          });
          const data = await res.json();
          if (data?.token) token.accessToken = data.token;
        } catch (err) {
          console.error("Error fetching social login token:", err);
        }
      }

      // Always fetch latest role
      try {
        const res = await fetch(`${apiUrl}/users/${token.email}`);
        const freshUser = await res.json();
        if (freshUser?.user?.role) token.role = freshUser.user.role;
      } catch (err) {
        console.error("Error fetching latest user role:", err);
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      session.token = token.accessToken; // ✅ session.token এখন সব login এর জন্য থাকবে
      return session;
    },
  },

  pages: {
    signIn: "/login", 
  },

  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

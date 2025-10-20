// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import GithubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";

// const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     GithubProvider({      
//       clientId: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           const res = await fetch(`${apiUrl}/login`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               email: credentials.email,
//               password: credentials.password,
//             }),
//           });

//           // ✅ Check if response is successful
//           if (!res.ok) {
//             const errorText = await res.text();
//             console.error("Login API failed:", errorText);
//             return null;
//           }

//           const data = await res.json();

//           if (data.success && data.user) {
//             return {
//               id: data.user.id,
//               name: data.user.name,
//               email: data.user.email,
//               image: data.user.photo || "https://i.ibb.co/2n8qPkw/default-avatar.png",
//               role: data.user.role || "user",
//             };
//           }
//           return null;
//         } catch (error) {
//           console.error("Authorize error:", error);
//           return null;
//         }
//       },
//     }),
//   ],

//   // ✅ UPDATED: Session configuration for better persistence
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 days - session longer রাখবে
//   },

//   // ✅ ADDED: JWT configuration
//   jwt: {
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },

//   callbacks: {
//     async signIn({ user, account }) {
//       try {
//         // ✅ Social login হলে user create/update করা (Google/Github)
//         if (account?.provider !== "credentials") {
//           await fetch(`${apiUrl}/login/social`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               name: user.name,
//               email: user.email,
//               photo: user.image,
//             }),
//           });
//         }
//       } catch (error) {
//         console.error("Error in social login:", error);
//       }
//       return true;
//     },

//     async jwt({ token, user, trigger, session }) {
//       // ✅ Initial login (Credentials বা Social)
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.email = user.email;
//         token.image = user.image;
//         token.role = user.role || "user";
//       }

//       // ✅ ADDED: Session update handling
//       if (trigger === "update" && session?.user) {
//         token.name = session.user.name;
//         token.image = session.user.image;
//         token.role = session.user.role;
//       }

//       // ✅ Always fetch latest role from backend (with better error handling)
//       try {
//         const res = await fetch(`${apiUrl}/users/${encodeURIComponent(token.email)}`);
        
//         if (res.ok) {
//           const freshUser = await res.json();
//           if (freshUser?.user?.role) {
//             token.role = freshUser.user.role;
//           }
//         }
//         // If API fails, continue with current token (no error thrown)
//       } catch (err) {
//         console.error("Error fetching latest user role:", err);
//         // Continue with current token
//       }

//       return token;
//     },

//     async session({ session, token }) {
//       session.user.id = token.id;
//       session.user.role = token.role;
//       session.user.name = token.name;
//       session.user.email = token.email;
//       session.user.image = token.image;
      
//       // ✅ ADDED: Session expiry information
//       session.expires = token.exp;
      
//       return session;
//     },
//   },

//   pages: {
//     signIn: "/login", 
//   },

//   // ✅ ADDED: Vercel production optimizations
//   // cookies: {
//   //   sessionToken: {
//   //     name: `next-auth.session-token`,
//   //     options: {
//   //       httpOnly: true,
//   //       sameSite: 'lax',
//   //       path: '/',
//   //       secure: process.env.NODE_ENV === 'production',
//   //       // domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : undefined
//   //     }
//   //   }
//   // },

//   cookies: {
//   sessionToken: {
//     name: `next-auth.session-token`,
//     options: {
//       httpOnly: true,
//       sameSite: 'lax',
//       path: '/',
//       secure: true, // ✅ Always true for production
    
//     }
//   }
// },



//   // ✅ ADDED: Security settings for production
//   useSecureCookies: process.env.NODE_ENV === 'production',
  
//   debug: process.env.NODE_ENV === "development",
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };



import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_AUTH_URL;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({      
      clientId: process.env.GITHUB_CLIENT_ID,
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
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const res = await fetch(`${apiUrl}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            const errorText = await res.text();
            console.error("Login API failed:", res.status, errorText);
            return null;
          }

          const data = await res.json();

          if (data.success && data.user) {
            return {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              image: data.user.photo || "https://i.ibb.co/2n8qPkw/default-avatar.png",
              role: data.user.role || "user",
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
    maxAge: 30 * 24 * 60 * 60,
  },

  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider !== "credentials") {
          const socialRes = await fetch(`${apiUrl}/login/social`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              photo: user.image,
            }),
          });
          
          if (!socialRes.ok) {
            console.error("Social login API failed:", await socialRes.text());
          }
        }
      } catch (error) {
        console.error("Error in social login:", error);
      }
      return true;
    },

    async jwt({ token, user }) {
      // ✅ শুধু user data দিয়ে token populate করুন, প্রতিবার API call নয়
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.role = user.role || "user";
      }

      // ✅ REMOVED: প্রতিটি JWT callback-এ API call করা
      // এটি timeout এবং extra latency সৃষ্টি করে

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      
      return session;
    },
  },

  pages: {
    signIn: "/login", 
  },

  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      }
    }
  },

  useSecureCookies: process.env.NODE_ENV === 'production',
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };




































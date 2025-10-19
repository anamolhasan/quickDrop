


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
//               // ❌ REMOVED: accessToken: data.token, (JWT removed from backend)
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

//   session: {
//     strategy: "jwt",
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

//     async jwt({ token, user }) {
//       // ✅ Initial login (Credentials বা Social)
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.email = user.email;
//         token.image = user.image;
//         token.role = user.role || "user";
//         // ❌ REMOVED: token.accessToken = user.accessToken || null; (JWT removed)
//       }

//       // ❌ REMOVED: Social login JWT fetch section (Not needed anymore)

//       // ✅ Always fetch latest role from backend
//       try {
//         const res = await fetch(`${apiUrl}/users/${encodeURIComponent(token.email)}`);
        
//         // ✅ Check if response is successful
//         if (!res.ok) {
//           const errorText = await res.text();
//           console.error(`API Error fetching role (${res.status}):`, errorText.slice(0, 200) + '...');
//           // Don't throw error, just use current role
//           return token;
//         }

//         const freshUser = await res.json();
//         if (freshUser?.user?.role) {
//           token.role = freshUser.user.role;
//         }
//       } catch (err) {
//         console.error("Error fetching latest user role:", err);
//         // Continue with current token if error
//       }

//       return token;
//     },

//     async session({ session, token }) {
//       session.user.id = token.id;
//       session.user.role = token.role;
//       session.user.name = token.name;
//       session.user.email = token.email;
//       session.user.image = token.image;
//       // ❌ REMOVED: session.token = token.accessToken; (JWT removed)
//       return session;
//     },
//   },

//   pages: {
//     signIn: "/login", 
//   },

//   debug: process.env.NODE_ENV === "development", // Only debug in development
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };






























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
          const res = await fetch(`${apiUrl}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          // ✅ Check if response is successful
          if (!res.ok) {
            const errorText = await res.text();
            console.error("Login API failed:", errorText);
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

  // ✅ UPDATED: Session configuration for better persistence
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days - session longer রাখবে
  },

  // ✅ ADDED: JWT configuration
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async signIn({ user, account }) {
      try {
        // ✅ Social login হলে user create/update করা (Google/Github)
        if (account?.provider !== "credentials") {
          await fetch(`${apiUrl}/login/social`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              photo: user.image,
            }),
          });
        }
      } catch (error) {
        console.error("Error in social login:", error);
      }
      return true;
    },

    async jwt({ token, user, trigger, session }) {
      // ✅ Initial login (Credentials বা Social)
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.role = user.role || "user";
      }

      // ✅ ADDED: Session update handling
      if (trigger === "update" && session?.user) {
        token.name = session.user.name;
        token.image = session.user.image;
        token.role = session.user.role;
      }

      // ✅ Always fetch latest role from backend (with better error handling)
      try {
        const res = await fetch(`${apiUrl}/users/${encodeURIComponent(token.email)}`);
        
        if (res.ok) {
          const freshUser = await res.json();
          if (freshUser?.user?.role) {
            token.role = freshUser.user.role;
          }
        }
        // If API fails, continue with current token (no error thrown)
      } catch (err) {
        console.error("Error fetching latest user role:", err);
        // Continue with current token
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      
      // ✅ ADDED: Session expiry information
      session.expires = token.exp;
      
      return session;
    },
  },

  pages: {
    signIn: "/login", 
  },

  // ✅ ADDED: Vercel production optimizations
  // cookies: {
  //   sessionToken: {
  //     name: `next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: 'lax',
  //       path: '/',
  //       secure: process.env.NODE_ENV === 'production',
  //       // domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : undefined
  //     }
  //   }
  // },

  cookies: {
  sessionToken: {
    name: `next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: true, // ✅ Always true for production
    
    }
  }
},



  // ✅ ADDED: Security settings for production
  useSecureCookies: process.env.NODE_ENV === 'production',
  
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };









































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
//           // ✅ Better error handling
//           if (!credentials?.email || !credentials?.password) {
//             throw new Error("Email and password required");
//           }

//           const res = await fetch(`${apiUrl}/login`, {
//             method: "POST",
//             headers: { 
//               "Content-Type": "application/json",
//               "Accept": "application/json"
//             },
//             body: JSON.stringify({
//               email: credentials.email,
//               password: credentials.password,
//             }),
//           });

//           // ✅ Handle non-JSON responses
//           const contentType = res.headers.get("content-type");
//           if (!contentType || !contentType.includes("application/json")) {
//             const text = await res.text();
//             console.error("Non-JSON response:", text.substring(0, 200));
//             throw new Error("Server error: Invalid response format");
//           }

//           const data = await res.json();

//           if (data.success && data.user) {
//             return {
//               id: data.user.id || data.user._id,
//               name: data.user.name,
//               email: data.user.email,
//               image: data.user.photo || "https://i.ibb.co/2n8qPkw/default-avatar.png",
//               role: data.user.role || "user",
//             };
//           }
          
//           throw new Error(data.error || "Invalid credentials");
          
//         } catch (error) {
//           console.error("Authorize error:", error.message);
//           return null;
//         }
//       },
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//     maxAge: 24 * 60 * 60, // 1 day (কমিয়ে দাও)
//   },

//   callbacks: {
//     async signIn({ user, account, profile }) {
//       try {
//         // ✅ Social login হলে user create/update করা
//         if (account?.provider === "google" || account?.provider === "github") {
//           const socialRes = await fetch(`${apiUrl}/login/social`, {
//             method: "POST",
//             headers: { 
//               "Content-Type": "application/json",
//               "Accept": "application/json"
//             },
//             body: JSON.stringify({
//               name: user.name || profile?.name,
//               email: user.email || profile?.email,
//               photo: user.image || profile?.picture,
//             }),
//           });

//           if (!socialRes.ok) {
//             console.error("Social login API failed");
//             // But still allow signin
//           }
//         }
//         return true;
//       } catch (error) {
//         console.error("Error in social login:", error);
//         return true; // Still allow signin
//       }
//     },

//     async jwt({ token, user, trigger, session }) {
//       // ✅ Initial sign in
//       if (user) {
//         token.role = user.role || "user";
//         token.id = user.id;
//       }

//       // ✅ Session update
//       if (trigger === "update" && session?.user) {
//         token.name = session.user.name;
//         token.image = session.user.image;
//         token.role = session.user.role;
//       }

//       // ✅ REMOVED: Real-time role fetching (কারণ এটি error create করছে)
//       // Session এর সময় শুধু token return করো

//       return token;
//     },

//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//         session.user.role = token.role;
//         session.user.name = token.name;
//         session.user.email = token.email;
//         session.user.image = token.image;
//       }
//       return session;
//     },

//     // ✅ ADDED: Redirect callback
//     async redirect({ url, baseUrl }) {
//       // Allows relative callback URLs
//       if (url.startsWith("/")) return `${baseUrl}${url}`
//       // Allows callback URLs on the same origin
//       else if (new URL(url).origin === baseUrl) return url
//       return baseUrl
//     }
//   },

//   pages: {
//     signIn: "/login",
//     error: "/login", // ✅ Error handling page
//   },

//   // ✅ Better error handling
//   debug: process.env.NODE_ENV === "development",
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
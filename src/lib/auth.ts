import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await dbConnect();
        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },

    async session({ session, token }) {
      if (token.user) session.user = token.user;
      return session;
    },

    // ❗ NextAuth v5: redirect KHÔNG nhận token
    async redirect({ url, baseUrl }) {
      //if (url.startsWith("/")) return `${baseUrl}${url}`;
      return baseUrl;
    },
  },
};

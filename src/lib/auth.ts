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
      session.user = token.user as any;
      return session;
    },

    // ✅ Phần này thêm mới — điều hướng sau đăng nhập
    async redirect({ url, baseUrl }) {
      // Nếu người dùng truy cập từ trong site, giữ nguyên
      if (url.startsWith("/")) return `${baseUrl}${url}`;

      // Gọi lại API để lấy session hiện tại
      try {
        const res = await fetch(`${baseUrl}/api/auth/session`);
        const session = await res.json();

        if (session?.user?.role === "ADMIN") return `${baseUrl}/admin/dashboard`;
        if (session?.user?.role === "LECTURER") return `${baseUrl}/lecturer`;
        if (session?.user?.role === "STUDENT") return `${baseUrl}/student`;
      } catch (err) {
        console.error("Redirect failed:", err);
      }

      // Nếu không có role → quay về trang chủ
      return baseUrl;
    },
  },
};

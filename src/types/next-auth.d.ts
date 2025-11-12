import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "LECTURER" | "STUDENT" | "user" | "admin";
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  }
}

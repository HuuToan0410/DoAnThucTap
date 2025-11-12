import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.user?.role;

    // ✅ Chặn truy cập trái phép theo vai trò
    const url = req.nextUrl.pathname;

    // Admin chỉ vào /admin
    if (url.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Lecturer chỉ vào /lecturer
    if (url.startsWith("/lecturer") && role !== "LECTURER") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Student chỉ vào /student
    if (url.startsWith("/student") && role !== "STUDENT") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // chỉ cho phép nếu có token
    },
  }
);

// ✅ Cấu hình các route được bảo vệ
export const config = {
  matcher: [
    "/admin/:path*",
    "/lecturer/:path*",
    "/student/:path*",
  ],
};

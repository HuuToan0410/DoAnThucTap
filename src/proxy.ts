import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: Request) {
  const url = new URL(request.url);

  // Lấy token từ NextAuth
  const token = await getToken({ req: request as any });
  const role = token?.user?.role;

  const pathname = url.pathname;

  // Nếu chưa đăng nhập → chặn
  if (!token) {
    return NextResponse.redirect(new URL("/unauthorized", url));
  }

  // Admin chỉ được vào /admin
  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", url));
  }

  // Lecturer chỉ được vào /lecturer
  if (pathname.startsWith("/lecturer") && role !== "LECTURER") {
    return NextResponse.redirect(new URL("/unauthorized", url));
  }

  // Student chỉ được vào /student
  if (pathname.startsWith("/student") && role !== "STUDENT") {
    return NextResponse.redirect(new URL("/unauthorized", url));
  }

  return NextResponse.next();
}

// Cấu hình matcher
export const config = {
  matcher: [
    "/admin/:path*",
    "/lecturer/:path*",
    "/student/:path*",
  ],
};

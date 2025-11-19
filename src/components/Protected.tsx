"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Protected({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    // ❌ Chưa đăng nhập → chuyển login
    if (!session) {
      router.replace("/login");
      return;
    }

    const role = session.user?.role;

    // ❌ Không có role → cũng xem như không hợp lệ
    if (!role) {
      router.replace("/unauthorized");
      return;
    }

    // ❌ Role không nằm trong danh sách được phép
    if (!allowedRoles.includes(role)) {
      router.replace("/unauthorized");
      return;
    }
  }, [session, status, allowedRoles, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Đang tải...</p>
      </div>
    );
  }

  return <>{children}</>;
}

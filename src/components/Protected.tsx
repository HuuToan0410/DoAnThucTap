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
    if (!session) {
      router.push("/login");
      return;
    }

    const userRole = session.user?.role;
    if (!allowedRoles.includes(userRole)) {
      router.push("/unauthorized");
    }
  }, [session, status, router, allowedRoles]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Đang tải...</p>
      </div>
    );
  }

  return <>{children}</>;
}

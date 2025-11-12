"use client";

import { useSession } from "next-auth/react";

export default function Topbar() {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-3">
      <h1 className="text-xl font-semibold text-blue-700">
        Hệ thống Quản lý Thời khóa biểu
      </h1>
      {session && (
        <div className="text-sm text-gray-600">
          Xin chào,{" "}
          <span className="font-medium text-gray-800">
            {session.user.name}
          </span>{" "}
          ({session.user.role})
        </div>
      )}
    </header>
  );
}

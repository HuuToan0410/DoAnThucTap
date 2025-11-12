"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 🧠 Thêm 2 state quản lý sidebar
  const [open, setOpen] = useState(true);        // cho mobile
  const [collapsed, setCollapsed] = useState(false); // cho desktop

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        open={open}
        setOpen={setOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

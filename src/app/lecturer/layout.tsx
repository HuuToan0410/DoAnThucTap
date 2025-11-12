"use client";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { useState } from "react";

export default function LecturerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        open={open}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        setOpen={setOpen}
      />
      <div className="flex-1 flex flex-col">
        <Topbar onMenuClick={() => setOpen(!open)} />
        <main className="p-6 overflow-y-auto flex-1">{children}</main>
      </div>
    </div>
  );
}

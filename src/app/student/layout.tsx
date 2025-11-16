"use client";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { useState } from "react";

export default function StudentLayout({
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
      <div className="flex-2 flex flex-col min-h-screen">
        <Topbar onMenuClick={() => setOpen(!open)} />
        <main className="p-6 overflow-y-auto flex-1">{children}</main>
        <Footer/>
      </div>
    </div>
  );
}

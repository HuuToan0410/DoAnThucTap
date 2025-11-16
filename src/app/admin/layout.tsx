"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        open={sidebarOpen}
        collapsed={collapsed}
        setOpen={setSidebarOpen}
        setCollapsed={setCollapsed}
      />
      <div className="flex-1 flex flex-col">
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          collapsed={collapsed}
          toggleCollapse={() => setCollapsed(!collapsed)}
        />
        <main className="p-6 flex-1 overflow-y-auto">{children}</main>
        <Footer/>
      </div>
    </div>
  );
}

"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  ClipboardList,
  LogOut,
} from "lucide-react";

type SidebarProps = {
  open: boolean;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  setOpen: (value: boolean) => void;
};

// ✅ Di chuyển khai báo menu gốc ra ngoài để không trùng phạm vi
const BASE_MENUS = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Thời khóa biểu", href: "/admin/timetable", icon: BookOpen },
  { name: "Lịch thi", href: "/admin/exam", icon: CalendarDays },
  { name: "Kế hoạch học kỳ", href: "/admin/plan", icon: ClipboardList },
];

export default function Sidebar({
  open,
  collapsed,
  setCollapsed,
  setOpen,
}: SidebarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const role = session?.user?.role;

  // ✅ Dùng useMemo hoặc biến trung gian để lọc menu theo role
  const filteredMenus = BASE_MENUS.filter((item) => {
    if (role === "STUDENT") {
      // Student có Dashboard, TKB, và Lịch thi
      return (
        item.name === "Dashboard" ||
        item.name === "Thời khóa biểu" ||
        item.name === "Lịch thi"
      );
    }
    if (role === "LECTURER") {
      // Lecturer có Dashboard, TKB, Lịch thi, Kế hoạch
      return (
        item.name === "Dashboard" ||
        item.name === "Thời khóa biểu" ||
        item.name === "Lịch thi" ||
        item.name === "Kế hoạch học kỳ"
      );
    }
    return true; // ADMIN có tất cả
  });

  // ✅ Tự động đổi đường dẫn theo role
  const rolePathPrefix =
    role === "STUDENT"
      ? "/student"
      : role === "LECTURER"
      ? "/lecturer"
      : "/admin";

  const menusWithRolePath = filteredMenus.map((item) => ({
    ...item,
    href: item.href.replace("/admin", rolePathPrefix),
  }));

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return <aside className="w-0" />;

  return (
    <>
      {/* Overlay khi mở trên mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <motion.aside
        initial={{ x: -250 }}
        animate={{
          x:
            open || (typeof window !== "undefined" && window.innerWidth >= 768)
              ? 0
              : -250,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed md:static z-50 top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg border-r dark:border-gray-700 flex flex-col justify-between transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between px-4 py-4 border-b dark:border-gray-700">
            {!collapsed && (
              <span className="text-blue-600 font-bold">Menu</span>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {collapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>
          </div>

          {/* Danh sách menu */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menusWithRolePath.map(({ name, href, icon: Icon }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                    active
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <Icon size={18} />
                  {!collapsed && <span>{name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* ✅ Phần Đăng xuất */}
        <div className="border-t dark:border-gray-700 p-4">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 text-red-600 hover:text-red-700 dark:text-red-400 w-full"
          >
            <LogOut size={18} />
            {!collapsed && <span>Đăng xuất</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}

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
  GraduationCap,
  FileText,
  Users,
} from "lucide-react";

type SidebarProps = {
  open: boolean;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  setOpen: (value: boolean) => void;
};

const MENU_ITEMS = {
  ADMIN: [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Thời khóa biểu", href: "/admin/timetable", icon: BookOpen },
    { name: "Lịch thi", href: "/admin/exam", icon: CalendarDays },
    { name: "Kế hoạch học kỳ", href: "/admin/plan", icon: ClipboardList },
  ],
  LECTURER: [
    { name: "Dashboard", href: "/lecturer/dashboard", icon: LayoutDashboard },
    { name: "Lịch giảng dạy", href: "/lecturer/timetable", icon: BookOpen },
    { name: "Lịch thi", href: "/lecturer/exam", icon: CalendarDays },
  ],
  STUDENT: [
    { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
    { name: "Thời khóa biểu", href: "/student/timetable", icon: BookOpen },
    { name: "Lịch thi", href: "/student/exam", icon: CalendarDays },
  ],
};

export default function Sidebar({
  open,
  collapsed,
  setCollapsed,
  setOpen,
}: SidebarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const role = session?.user?.role as keyof typeof MENU_ITEMS;

  const menuItems = role ? MENU_ITEMS[role] || [] : [];

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return <aside className="w-0" />;

  const getRoleColor = () => {
    switch (role) {
      case "ADMIN":
        return "from-blue-600 to-blue-700";
      case "LECTURER":
        return "from-purple-600 to-purple-700";
      case "STUDENT":
        return "from-green-600 to-green-700";
      default:
        return "from-gray-600 to-gray-700";
    }
  };

  const getRoleName = () => {
    switch (role) {
      case "ADMIN":
        return "Quản trị viên";
      case "LECTURER":
        return "Giảng viên";
      case "STUDENT":
        return "Sinh viên";
      default:
        return "Người dùng";
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
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
        className={`md:static z-50 top-0 left-0  bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Header with Role Badge */}
        <div className={`bg-gradient-to-br ${getRoleColor()} text-white p-4`}>
          <div className="flex items-center justify-between mb-2">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <GraduationCap size={24} />
                <span className="font-bold text-lg">Menu</span>
              </div>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded-lg hover:bg-white/20 transition"
              aria-label="Toggle sidebar"
            >
              {collapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>
          </div>
          {!collapsed && (
            <div className="mt-2">
              <p className="text-xs opacity-80">Vai trò</p>
              <p className="text-sm font-semibold">{getRoleName()}</p>
            </div>
          )}
        </div>

        {/* User Info Card */}
        {!collapsed && session && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className={`bg-gradient-to-br ${getRoleColor()} p-2 rounded-lg`}>
                <Users size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                  {session.user.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {session.user.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map(({ name, href, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-gradient-to-r " + getRoleColor() + " text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <Icon size={20} className={collapsed ? "mx-auto" : ""} />
                {!collapsed && <span>{name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-2">
          {/* Help/Support */}
          {!collapsed && (
            <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-3 mb-2">
              <p className="text-xs font-semibold text-blue-800 dark:text-blue-300 mb-1">
                Cần hỗ trợ?
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                Hotline: 1900-xxxx
              </p>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className={`flex items-center gap-3 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg px-3 py-2 w-full transition ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut size={18} />
            {!collapsed && <span className="font-medium">Đăng xuất</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
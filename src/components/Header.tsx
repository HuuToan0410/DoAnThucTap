"use client";
import { Menu, Search, Bell, UserCircle, GraduationCap } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";


type HeaderProps = {
  onMenuClick: () => void;
  collapsed: boolean;
  toggleCollapse: () => void;
};

export default function Header({
  onMenuClick,
  collapsed,
  toggleCollapse,
}: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      case "LECTURER":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";
      case "STUDENT":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "Quản trị viên";
      case "LECTURER":
        return "Giảng viên";
      case "STUDENT":
        return "Sinh viên";
      default:
        return role;
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md flex items-center justify-between px-4 lg:px-6 py-3 sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          aria-label="Toggle menu"
        >
          <Menu size={20} className="text-gray-700 dark:text-gray-300" />
        </button>

        {/* Logo & Title */}
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <GraduationCap size={20} className="text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-blue-600 dark:text-blue-400 text-base lg:text-lg leading-tight">
              {collapsed ? "TKB" : "Hệ thống Quản lý Đào tạo"}
            </h1>
            {!collapsed && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Trường Cao đẳng Nghề TP.HCM
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Center - Search (Hidden on mobile) */}
      <div className="hidden lg:flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 flex-1 max-w-md mx-4">
        <Search size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Tìm kiếm môn học, giảng viên..."
          className="bg-transparent outline-none text-sm w-full text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* Notifications */}
        <button 
          className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          aria-label="Notifications"
        >
          <Bell size={20} className="text-gray-600 dark:text-gray-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 p-1 pr-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-1 rounded-lg">
            <UserCircle size={24} className="text-white" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {session?.user?.name || "Người dùng"}
            </p>
            {session?.user?.role && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getRoleBadgeColor(session.user.role)}`}>
                {getRoleName(session.user.role)}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
"use client";
import { Menu, Search, Bell, UserCircle } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useEffect,useState } from "react";

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
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Chỉ thêm dòng này (không thay đổi logic)
  if (!mounted) return null;


  return (
    <header className="bg-white dark:bg-gray-800 shadow flex items-center justify-between px-4 py-3 sticky top-0 z-40 border-b dark:border-gray-700">
      {/* Trái */}
      <div className="flex items-center gap-3">
        {/* Nút ☰ (mobile) */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Menu size={20} />
        </button>

        <h1 className="font-semibold text-blue-600 dark:text-blue-400 text-lg">
          {collapsed ? "IT" : "Trường IT HCM"}
        </h1>
      </div>

      {/* Giữa */}
      <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-1">
        <Search size={18} className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="bg-transparent outline-none text-sm w-64"
        />
      </div>

      {/* Phải */}
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <Bell
          size={20}
          className="text-gray-600 dark:text-gray-300 cursor-pointer"
        />
        <UserCircle
          size={24}
          className="text-gray-600 dark:text-gray-300 cursor-pointer"
        />
      </div>
    </header>
  );
}

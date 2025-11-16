"use client";

import { useSession } from "next-auth/react";
import { GraduationCap, Bell } from "lucide-react";

export default function Topbar() {
  const { data: session } = useSession();

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-blue-100 text-blue-700";
      case "LECTURER":
        return "bg-purple-100 text-purple-700";
      case "STUDENT":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
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
    <header className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg px-6 py-4">
      {/* Left Section - Logo & Title */}
      <div className="flex items-center gap-3">
        <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
          <GraduationCap size={28} />
        </div>
        <div>
          <h1 className="text-xl font-bold leading-tight">
            Hệ thống Quản lý Đào tạo
          </h1>
          <p className="text-xs text-blue-100">
            Trường Cao đẳng Nghề TP. Hồ Chí Minh
          </p>
        </div>
      </div>

      {/* Right Section - User Info */}
      {session && (
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-white/20 transition">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Info */}
          <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <div>
              <p className="text-sm font-semibold">
                {session.user.name || "Người dùng"}
              </p>
              <p className="text-xs text-blue-100">
                {session.user.email}
              </p>
            </div>
            {session.user.role && (
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${getRoleBadgeColor(session.user.role)}`}>
                {getRoleName(session.user.role)}
              </span>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
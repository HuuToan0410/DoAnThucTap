"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";
import {
  GraduationCap,
  Bell,
  Calendar,
  BookOpen,
  Users,
  Award,
  ChevronRight,
  Clock,
  Pin,
} from "lucide-react";
import path from "path";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
const router = useRouter();

//  Nếu đã đăng nhập → tự điều hướng đúng role
useEffect(() => {
  if (session?.user?.role === "ADMIN") {
    router.push("/admin/dashboard");
  } else if (session?.user?.role === "LECTURER") {
    router.push("/lecturer/dashboard");
  } else if (session?.user?.role === "STUDENT") {
    router.push("/student/dashboard");
  }
}, [session, router]);

//  Logic xử lý đăng nhập thật
const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (res?.error) {
    setError("Sai email hoặc mật khẩu");
    setIsLoading(false);
  } else {
    router.push("/dashboard");
  }
};

  const announcements = [
    {
      id: 1,
      title: "Thông báo đăng ký học phần học kỳ 1 năm học 2025-2026",
      date: "05/11/2025",
      category: "ĐĂNG KÝ HỌC PHẦN",
      isPinned: true,
      excerpt:
        "Nhà trường thông báo lịch đăng ký học phần cho sinh viên các khoa. Thời gian đăng ký từ 10/11 đến 20/11/2025.",
    },
    {
      id: 2,
      title: "Lịch thi giữa kỳ và cuối kỳ học kỳ 1 năm 2025",
      date: "03/11/2025",
      category: "THI CỬ",
      isPinned: true,
      excerpt:
        "Phòng Đào tạo công bố lịch thi giữa kỳ và cuối kỳ. Sinh viên vui lòng kiểm tra và chuẩn bị.",
    },
    {
      id: 3,
      title: "Hướng dẫn sử dụng hệ thống quản lý đào tạo mới",
      date: "01/11/2025",
      category: "HƯỚNG DẪN",
      isPinned: false,
      excerpt:
        "Hệ thống quản lý đào tạo đã được nâng cấp với nhiều tính năng mới. Xem hướng dẫn chi tiết tại đây.",
    },
    {
      id: 4,
      title: "Thông báo về học phí học kỳ 1 năm học 2025-2026",
      date: "28/10/2025",
      category: "HỌC PHÍ",
      isPinned: false,
      excerpt:
        "Thông báo về mức học phí và thời gian đóng học phí cho học kỳ 1. Hạn cuối: 30/11/2025.",
    },
  ];

  const quickLinks = [
    { icon: Calendar, label: "Thời khóa biểu", color: "bg-blue-500", path: "/student/timetable" },
    { icon: Calendar, label: "Lịch thi", color: "bg-green-500",path: "/student/exam" },
    { icon: BookOpen, label: "Xem kế hoạch", color: "bg-purple-500",path: "/student/plan" },
    // { icon: Award, label: "Chứng chỉ", color: "bg-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* ==== HEADER ==== */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-lg">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-lg">
                <img
                  src="/logo.png"
                  alt="Logo trường"
                  width={40}
                  height={40}
                  className="rounded-md object-contain"
                />
              </div>
              <div>
                <h1 className="font-bold text-lg md:text-xl leading-tight">
                  Trường Cao Đẳng Nghề
                </h1>
                <p className="text-sm text-blue-200">Thành Phố Hồ Chí Minh</p>
              </div>
            </div>

            <nav className="hidden md:flex gap-6 text-sm">
              <a
                href="/"
                className="hover:text-yellow-300 transition flex items-center gap-1"
              >
                <span>Trang chủ</span>
              </a>
             
            </nav>
          </div>
        </div>
      </header>

      {/* ==== MAIN CONTENT ==== */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN - Announcements */}
          <section className="lg:col-span-2 space-y-6">
            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Truy cập nhanh
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {quickLinks.map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => router.push(link.path)}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 transition group"
                  >
                    <div
                      className={`${link.color} p-3 rounded-lg group-hover:scale-110 transition`}
                    >
                      <link.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm text-gray-700 text-center">
                      {link.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Announcements */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Bell className="h-6 w-6 text-blue-600" />
                  Thông báo mới nhất
                </h2>
                <a
                  href="#"
                  className="text-blue-600 text-sm hover:text-blue-700 flex items-center gap-1"
                >
                  Xem tất cả
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>

              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      {announcement.isPinned && (
                        <Pin className="h-4 w-4 text-red-500 flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded">
                            {announcement.category}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {announcement.date}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition mb-2">
                          {announcement.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {announcement.excerpt}
                        </p>
                        <a
                          href="#"
                          className="text-blue-600 text-sm mt-2 inline-flex items-center gap-1 hover:gap-2 transition-all"
                        >
                          Xem chi tiết
                          <ChevronRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN - Login */}
          <aside className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600">
              <div className="text-center mb-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Đăng nhập hệ thống
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Quản lý đào tạo trực tuyến
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Email / Mã sinh viên
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder=""
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder=""
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>

                <div className="text-center space-y-2">
                  {/* <a
                    href="#"
                    className="text-sm text-blue-600 hover:text-blue-700 block"
                  >
                    Quên mật khẩu?
                  </a> */}
                  <div className="border-t pt-3">
                    <p className="text-xs text-gray-600">
                      Sinh viên mới?{" "}
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Hướng dẫn kích hoạt tài khoản
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Info */}
            <div className="bg-blue-50 rounded-xl p-5 mt-6 border border-blue-100">
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">
                Hỗ trợ kỹ thuật
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  📞 Hotline: <span className="font-medium">1900-xxxx</span>
                </p>
                <p>
                  📧 Email: <span className="font-medium">support@tkb.edu</span>
                </p>
                <p className="text-xs text-gray-600 mt-3">
                  Thời gian: 8:00 - 17:00 (T2-T6)
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* ==== FOOTER ==== */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div>
              <h4 className="font-bold mb-3 text-blue-400">Về trường</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Giới thiệu
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Tuyển sinh
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Đào tạo
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-blue-400">Liên kết</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Thư viện
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Nghiên cứu khoa học
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Hợp tác doanh nghiệp
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-blue-400">Liên hệ</h4>
              <p className="text-gray-300 leading-relaxed">
                Địa chỉ: Quận 1, TP. Hồ Chí Minh
                <br />
                Điện thoại: (028) xxxx-xxxx
                <br />
                Email: info@tkb.edu.vn
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-xs">
            © 2025 Trường Cao Đẳng Nghề Thành Phố Hồ Chí Minh - Phòng Quản lý
            Đào tạo. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

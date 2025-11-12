"use client";

import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ✅ Khi đăng nhập thành công → chuyển hướng theo role
  useEffect(() => {
    if (session?.user?.role) {
      const role = session.user.role;
      if (role === "ADMIN") router.push("/admin/dashboard");
      else if (role === "LECTURER") router.push("/lecturer/dashboard");
      else if (role === "STUDENT") router.push("/student/dashboard");
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Sai email hoặc mật khẩu!");
    }
  };

  // 🕑 Nếu đang load session → chờ
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen text-blue-600 font-semibold">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ==== HEADER ==== */}
      <header className="bg-blue-800 text-white py-3 shadow">
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-10" />
            <h1 className="font-bold uppercase">
              Trường Cao Đẳng Nghề Thành Phố Hồ Chí Minh
            </h1>
          </div>

          <nav className="flex gap-6 text-sm">
            <a href="/" className="hover:text-yellow-300">Trang chủ</a>
          </nav>
        </div>
      </header>

      {/* ==== MAIN ==== */}
      <main className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
        {/* CỘT TRÁI */}
        <section className="md:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-blue-700 border-b pb-2">
            Thông báo mới nhất
          </h2>

          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-blue-800 font-semibold">
                [THÔNG BÁO] Về việc đăng ký học phần kỳ {i}
              </h3>
              <p className="text-gray-500 text-sm mt-1">Ngày đăng: 0{i}/11/2025</p>
              <p className="mt-2 text-gray-700">
                Sinh viên vui lòng đăng nhập để xem chi tiết kế hoạch học tập.
              </p>
            </div>
          ))}
        </section>

        {/* CỘT PHẢI */}
        <aside className="bg-white rounded-lg shadow p-6 h-fit">
          <h2 className="text-center text-blue-700 font-bold text-lg mb-4">
            Đăng nhập hệ thống
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-md px-3 py-2 bg-blue-50 focus:ring-2 focus:ring-blue-400"
                placeholder="student@tkb.edu"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-1">Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-md px-3 py-2 bg-blue-50 focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Đăng nhập
            </button>
          </form>
        </aside>
      </main>

      {/* ==== FOOTER ==== */}
      <footer className="bg-blue-900 text-white text-center py-4 text-sm mt-auto">
        © 2025 Trường Cao Đẳng Nghề Thành Phố Hồ Chí Minh - Phòng Quản lý Đào tạo
      </footer>
    </div>
  );
}

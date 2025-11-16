"use client";

import Protected from "@/components/Protected";
import { useEffect, useState } from "react";
import { BookOpen, Calendar, Users, Award, Clock, Bell, TrendingUp, FileText } from "lucide-react";

export default function LecturerDashboard() {
  const [stats, setStats] = useState({ classes: 0, exams: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [timetableRes, examRes] = await Promise.all([
          fetch("/api/timetable").then((r) => r.json()),
          fetch("/api/exam").then((r) => r.json()),
        ]);
        setStats({
          classes: timetableRes.length,
          exams: examRes.length,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const StatCard = ({ icon: Icon, title, value, color, bgColor, subtitle }) => (
    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 hover:shadow-lg transition-shadow" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 font-medium mb-1">{title}</p>
          <h3 className="text-4xl font-bold text-gray-800 mb-2">{loading ? "..." : value}</h3>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        <div className="rounded-full p-4" style={{ backgroundColor: bgColor }}>
          <Icon className="h-8 w-8" style={{ color }} />
        </div>
      </div>
    </div>
  );

  const upcomingClasses = [
    { subject: "Lập trình Web", time: "07:30 - 09:00", room: "A203", class: "CNTT-K18", day: "Thứ Hai", students: 45 },
    { subject: "Cơ sở dữ liệu", time: "09:15 - 10:45", room: "B105", class: "CNTT-K18", day: "Thứ Ba", students: 42 },
    { subject: "Mạng máy tính", time: "13:00 - 14:30", room: "C301", class: "CNTT-K19", day: "Thứ Tư", students: 38 },
  ];

  const upcomingExams = [
    { subject: "Cơ sở dữ liệu", date: "20/11/2025", time: "07:30", room: "A203", class: "CNTT-K18", type: "Giữa kỳ" },
    { subject: "Lập trình Java", date: "22/11/2025", time: "09:00", room: "B105", class: "CNTT-K19", type: "Cuối kỳ" },
  ];

  const notifications = [
    { title: "Thông báo cập nhật điểm thi giữa kỳ", time: "2 giờ trước", priority: "high" },
    { title: "Yêu cầu nộp đề cương môn học mới", time: "5 giờ trước", priority: "medium" },
    { title: "Thông báo họp khoa ngày 18/11", time: "1 ngày trước", priority: "low" },
  ];

  const teachingStats = [
    { label: "Lớp đang giảng dạy", value: "5", icon: Users, color: "#3b82f6" },
    { label: "Sinh viên", value: "187", icon: Users, color: "#10b981" },
    { label: "Môn học", value: "3", icon: BookOpen, color: "#f59e0b" },
  ];

  return (
    <Protected allowedRoles={["LECTURER"]}>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Chào mừng giảng viên! 👨‍🏫</h1>
              <p className="text-purple-100">Theo dõi lịch giảng dạy và quản lý công việc giảng dạy</p>
            </div>
            <div className="text-right">
              <p className="text-purple-100 text-sm">Hôm nay</p>
              <p className="text-xl font-semibold">
                {new Date().toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long" })}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            icon={BookOpen}
            title="Tổng số buổi giảng dạy"
            value={stats.classes}
            color="#8b5cf6"
            bgColor="#ede9fe"
            subtitle="Trong học kỳ này"
          />
          <StatCard
            icon={Calendar}
            title="Lịch thi phụ trách"
            value={stats.exams}
            color="#ec4899"
            bgColor="#fce7f3"
            subtitle="Cần giám sát"
          />
        </div>

        {/* Teaching Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teachingStats.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="rounded-full p-3" style={{ backgroundColor: item.color + "20" }}>
                  <item.icon className="h-6 w-6" style={{ color: item.color }} />
                </div>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-1">{item.value}</p>
              <p className="text-sm text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Classes */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-600" />
              Lịch giảng dạy sắp tới
            </h2>
            <div className="space-y-3">
              {upcomingClasses.map((cls, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:shadow-sm transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                          {cls.day}
                        </span>
                        <span className="text-sm text-gray-500">{cls.time}</span>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">{cls.subject}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          Lớp {cls.class}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Phòng {cls.room}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {cls.students} SV
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-orange-500" />
              Thông báo
            </h2>
            <div className="space-y-3">
              {notifications.map((notif, idx) => (
                <div
                  key={idx}
                  className="border-l-4 pl-3 py-2"
                  style={{
                    borderLeftColor:
                      notif.priority === "high" ? "#ef4444" : notif.priority === "medium" ? "#f59e0b" : "#6b7280",
                  }}
                >
                  <p className="text-sm font-medium text-gray-800 mb-1">{notif.title}</p>
                  <p className="text-xs text-gray-500">{notif.time}</p>
                </div>
              ))}
              <button className="w-full text-center text-purple-600 text-sm font-medium hover:text-purple-700 py-2">
                Xem tất cả thông báo →
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-pink-500" />
            Lịch thi cần giám sát
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingExams.map((exam, idx) => (
              <div key={idx} className="border-2 border-pink-200 bg-pink-50 rounded-lg p-4 hover:border-pink-300 transition">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">{exam.subject}</h3>
                    <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded text-xs font-semibold">{exam.type}</span>
                  </div>
                  <Calendar className="h-5 w-5 text-pink-500" />
                </div>
                <div className="space-y-1 text-sm text-gray-700">
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {exam.date} - {exam.time}
                  </p>
                  <p className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Phòng {exam.room}
                  </p>
                  <p className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Lớp {exam.class}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-md p-6 border border-purple-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Truy cập nhanh</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-white p-4 rounded-lg hover:shadow-md transition text-center">
              <BookOpen className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Lịch giảng dạy</p>
            </button>
            <button className="bg-white p-4 rounded-lg hover:shadow-md transition text-center">
              <Calendar className="h-6 w-6 text-pink-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Lịch thi</p>
            </button>
            <button className="bg-white p-4 rounded-lg hover:shadow-md transition text-center">
              <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Danh sách lớp</p>
            </button>
            <button className="bg-white p-4 rounded-lg hover:shadow-md transition text-center">
              <Award className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Nhập điểm</p>
            </button>
          </div>
        </div>
      </div>
    </Protected>
  );
}

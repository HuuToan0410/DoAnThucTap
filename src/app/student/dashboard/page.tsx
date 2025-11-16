"use client";

import Protected from "@/components/Protected";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BookOpen,
  Calendar,
  Clock,
  Award,
  TrendingUp,
  Bell,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function StudentDashboard() {
  const [stats, setStats] = useState({ timetables: 0, exams: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [timetableRes, examRes] = await Promise.all([
          fetch("/api/timetable").then((r) => r.json()),
          fetch("/api/exam").then((r) => r.json()),
        ]);
        setStats({
          timetables: timetableRes.length,
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
    <div
      className="bg-white rounded-xl shadow-md p-6 border-l-4 hover:shadow-lg transition-shadow"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 font-medium mb-1">{title}</p>
          <h3 className="text-4xl font-bold text-gray-800 mb-2">
            {loading ? "..." : value}
          </h3>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        <div className="rounded-full p-4" style={{ backgroundColor: bgColor }}>
          <Icon className="h-8 w-8" style={{ color }} />
        </div>
      </div>
    </div>
  );

  const upcomingClasses = [
    {
      subject: "Lập trình Web",
      time: "07:30 - 09:00",
      room: "A203",
      teacher: "Nguyễn Văn A",
      day: "Thứ Hai",
    },
    {
      subject: "Cơ sở dữ liệu",
      time: "09:15 - 10:45",
      room: "B105",
      teacher: "Trần Thị B",
      day: "Thứ Ba",
    },
    {
      subject: "Mạng máy tính",
      time: "13:00 - 14:30",
      room: "C301",
      teacher: "Lê Văn C",
      day: "Thứ Tư",
    },
  ];

  const upcomingExams = [
    {
      subject: "Cơ sở dữ liệu",
      date: "20/11/2025",
      time: "07:30",
      room: "A203",
      type: "Giữa kỳ",
    },
    {
      subject: "Lập trình Java",
      date: "22/11/2025",
      time: "09:00",
      room: "B105",
      type: "Cuối kỳ",
    },
  ];

  const announcements = [
    {
      title: "Thông báo đăng ký học phần học kỳ 2",
      time: "2 giờ trước",
      priority: "high",
    },
    {
      title: "Lịch thi giữa kỳ đã được cập nhật",
      time: "5 giờ trước",
      priority: "medium",
    },
    {
      title: "Hướng dẫn sử dụng hệ thống mới",
      time: "1 ngày trước",
      priority: "low",
    },
  ];

  const achievements = [
    { label: "Điểm trung bình", value: "8.5", icon: Award, color: "#f59e0b" },
    {
      label: "Số tín chỉ đã học",
      value: "48",
      icon: BookOpen,
      color: "#8b5cf6",
    },
    {
      label: "Số môn đã qua",
      value: "12",
      icon: CheckCircle,
      color: "#10b981",
    },
  ];

  return (
    <Protected allowedRoles={["STUDENT"]}>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Chào mừng trở lại! 👋</h1>
              <p className="text-blue-100">
                Hãy cùng xem tình hình học tập của bạn hôm nay
              </p>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm">Hôm nay</p>
              <p className="text-xl font-semibold">
                {new Date().toLocaleDateString("vi-VN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            icon={BookOpen}
            title="Tổng số tiết học"
            value={stats.timetables}
            color="#3b82f6"
            bgColor="#dbeafe"
            subtitle="Trong học kỳ này"
          />
          <StatCard
            icon={Calendar}
            title="Lịch thi sắp tới"
            value={stats.exams}
            color="#ef4444"
            bgColor="#fee2e2"
            subtitle="Cần chuẩn bị"
          />
        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="rounded-full p-3"
                  style={{ backgroundColor: item.color + "20" }}
                >
                  <item.icon
                    className="h-6 w-6"
                    style={{ color: item.color }}
                  />
                </div>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-1">
                {item.value}
              </p>
              <p className="text-sm text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Classes */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Lịch học sắp tới
            </h2>
            <div className="space-y-3">
              {upcomingClasses.map((cls, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                          {cls.day}
                        </span>
                        <span className="text-sm text-gray-500">
                          {cls.time}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {cls.subject}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {cls.teacher}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Phòng {cls.room}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-orange-500" />
              Thông báo
            </h2>
            <div className="space-y-3">
              {announcements.map((ann, idx) => (
                <div
                  key={idx}
                  className="border-l-4 pl-3 py-2"
                  style={{
                    borderLeftColor:
                      ann.priority === "high"
                        ? "#ef4444"
                        : ann.priority === "medium"
                        ? "#f59e0b"
                        : "#6b7280",
                  }}
                >
                  <p className="text-sm font-medium text-gray-800 mb-1">
                    {ann.title}
                  </p>
                  <p className="text-xs text-gray-500">{ann.time}</p>
                </div>
              ))}
              <button className="w-full text-center text-blue-600 text-sm font-medium hover:text-blue-700 py-2">
                Xem tất cả thông báo →
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Lịch thi cần chú ý
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingExams.map((exam, idx) => (
              <div
                key={idx}
                className="border-2 border-red-200 bg-red-50 rounded-lg p-4 hover:border-red-300 transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">
                      {exam.subject}
                    </h3>
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">
                      {exam.type}
                    </span>
                  </div>
                  <Calendar className="h-5 w-5 text-red-500" />
                </div>
                <div className="space-y-1 text-sm text-gray-700">
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {exam.date}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {exam.time}
                  </p>
                  <p className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Phòng {exam.room}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-md p-6 border border-purple-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Truy cập nhanh
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
            <Link href="/student/timetable" className="block">
              <div className="bg-white p-4 rounded-lg hover:shadow-md transition text-center w-full cursor-pointer">
                <BookOpen className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">
                  Thời khóa biểu
                </p>
              </div>
            </Link>
            <Link href="/student/exam" className="block">
              <div className="bg-white p-4 rounded-lg hover:shadow-md transition text-center w-full cursor-pointer">
                <Calendar className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Lịch thi</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Protected>
  );
}

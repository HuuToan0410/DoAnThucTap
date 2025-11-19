"use client";
import { BookOpen, Calendar, Award, Bell, TrendingUp, Clock, CheckCircle, Users } from "lucide-react";



export default function StudentHome() {
  const quickLinks = [
    { 
      icon: Calendar, 
      title: "Thời khóa biểu", 
      description: "Xem lịch học của bạn",
      color: "from-blue-500 to-blue-600",
      link: "/student/timetable"
    },
    { 
      icon: BookOpen, 
      title: "Lịch thi", 
      description: "Chuẩn bị cho kỳ thi",
      color: "from-red-500 to-red-600",
      link: "/student/exam"
    },
    { 
      icon: Award, 
      title: "Kết quả học tập", 
      description: "Xem điểm và thành tích",
      color: "from-green-500 to-green-600",
      link: "/student/results"
    },
    { 
      icon: Users, 
      title: "Đăng ký học phần", 
      description: "Đăng ký môn học mới",
      color: "from-purple-500 to-purple-600",
      link: "/student/register"
    },
  ];

  const announcements = [
    { 
      title: "Thông báo đăng ký học phần học kỳ 2 năm 2025", 
      time: "2 giờ trước",
      type: "important"
    },
    { 
      title: "Lịch thi giữa kỳ đã được cập nhật", 
      time: "5 giờ trước",
      type: "normal"
    },
    { 
      title: "Hướng dẫn sử dụng hệ thống mới", 
      time: "1 ngày trước",
      type: "info"
    },
  ];

  const upcomingEvents = [
    { title: "Thi giữa kỳ Cơ sở dữ liệu", date: "20/11/2025", type: "exam" },
    { title: "Nộp báo cáo Lập trình Web", date: "18/11/2025", type: "assignment" },
    { title: "Thi cuối kỳ Mạng máy tính", date: "25/11/2025", type: "exam" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 rounded-xl shadow-lg p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-3">Chào mừng trở lại! 👋</h1>
          <p className="text-blue-100 text-lg mb-6">
            Sẵn sàng cho một ngày học tập hiệu quả
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-sm text-blue-100">Học kỳ hiện tại</p>
              <p className="font-bold">Học kỳ 1 - 2025</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-sm text-blue-100">Hôm nay</p>
              <p className="font-bold">{new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-blue-100 rounded-lg p-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">8.5</p>
          <p className="text-sm text-gray-600">Điểm TB</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-green-100 rounded-lg p-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">12</p>
          <p className="text-sm text-gray-600">Môn đã qua</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-purple-100 rounded-lg p-2">
              <Award className="h-5 w-5 text-purple-600" />
            </div>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">48</p>
          <p className="text-sm text-gray-600">Tín chỉ</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-orange-100 rounded-lg p-2">
              <Calendar className="h-5 w-5 text-orange-600" />
            </div>
            <Clock className="h-4 w-4 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">3</p>
          <p className="text-sm text-gray-600">Thi sắp tới</p>
        </div>
      </div>

      {/* Quick Access */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Truy cập nhanh</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.link}
              className="group cursor-pointer"
            >
              <div className={`bg-gradient-to-br ${link.color} rounded-xl p-6 text-white hover:scale-105 transition-transform shadow-lg hover:shadow-xl`}>
                <link.icon className="h-10 w-10 mb-4 opacity-90" />
                <h3 className="font-bold text-lg mb-1">{link.title}</h3>
                <p className="text-sm opacity-90">{link.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Sự kiện sắp tới
          </h2>
          <div className="space-y-3">
            {upcomingEvents.map((event, idx) => (
              <div
                key={idx}
                className={`border-l-4 pl-4 py-3 rounded-r-lg ${
                  event.type === "exam" 
                    ? "border-red-500 bg-red-50" 
                    : "border-blue-500 bg-blue-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{event.title}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                      <Calendar className="h-3 w-3" />
                      {event.date}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    event.type === "exam"
                      ? "bg-red-200 text-red-700"
                      : "bg-blue-200 text-blue-700"
                  }`}>
                    {event.type === "exam" ? "Thi" : "Bài tập"}
                  </span>
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
                className="border-l-4 pl-3 py-2 cursor-pointer hover:bg-gray-50 rounded-r transition"
                style={{
                  borderLeftColor: 
                    ann.type === "important" ? "#ef4444" : 
                    ann.type === "normal" ? "#f59e0b" : "#6b7280"
                }}
              >
                <p className="text-sm font-medium text-gray-800">{ann.title}</p>
                <p className="text-xs text-gray-500 mt-1">{ann.time}</p>
              </div>
            ))}
            <button className="w-full text-center text-blue-600 text-sm font-medium hover:text-blue-700 py-2 hover:bg-blue-50 rounded transition">
              Xem tất cả →
            </button>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-md p-6 border border-green-200">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-green-600" />
          Mẹo học tập hiệu quả
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span className="text-sm text-gray-700">Xem trước thời khóa biểu mỗi tuần</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span className="text-sm text-gray-700">Chuẩn bị bài trước khi đến lớp</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span className="text-sm text-gray-700">Tham gia đầy đủ các buổi học</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span className="text-sm text-gray-700">Kiểm tra thông báo thường xuyên</span>
          </div>
        </div>
      </div>
    </div>
  );
}
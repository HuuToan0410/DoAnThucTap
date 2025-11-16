"use client";
import { BookOpen, Calendar, Users, Bell, TrendingUp, Clock, Award, FileText } from "lucide-react";
import Link from "next/link";
export default function LecturerHome() {
  const quickLinks = [
    { 
      icon: BookOpen, 
      title: "Lịch giảng dạy", 
      description: "Xem lịch dạy của bạn",
      color: "from-purple-500 to-purple-600",
      link: "/lecturer/timetable"
    },
    { 
      icon: Calendar, 
      title: "Lịch thi", 
      description: "Lịch giám thị và coi thi",
      color: "from-pink-500 to-pink-600",
      link: "/lecturer/exam"
    },
    { 
      icon: Users, 
      title: "Danh sách lớp", 
      description: "Quản lý sinh viên",
      color: "from-blue-500 to-blue-600",
      link: "/lecturer/classes"
    },
    { 
      icon: Award, 
      title: "Nhập điểm", 
      description: "Cập nhật kết quả học tập",
      color: "from-green-500 to-green-600",
      link: "/lecturer/grades"
    },
  ];

  const todaySchedule = [
    { subject: "Lập trình Web", time: "07:30 - 09:00", room: "A203", class: "CNTT-K18", students: 45 },
    { subject: "Cơ sở dữ liệu", time: "09:15 - 10:45", room: "B105", class: "CNTT-K18", students: 42 },
    { subject: "Thực hành Java", time: "13:00 - 14:30", room: "C301", class: "CNTT-K19", students: 38 },
  ];

  const notifications = [
    { title: "Yêu cầu nộp điểm thi giữa kỳ trước 20/11", time: "2 giờ trước", priority: "high" },
    { title: "Họp khoa ngày 18/11 lúc 14:00", time: "5 giờ trước", priority: "medium" },
    { title: "Cập nhật đề cương môn học mới", time: "1 ngày trước", priority: "low" },
  ];

  const upcomingExams = [
    { subject: "Cơ sở dữ liệu", date: "20/11/2025", time: "07:30", room: "A203" },
    { subject: "Lập trình Java", date: "22/11/2025", time: "09:00", room: "B105" },
  ];

  const teachingStats = [
    { label: "Lớp giảng dạy", value: "5", icon: Users, color: "#8b5cf6" },
    { label: "Tổng sinh viên", value: "187", icon: Users, color: "#3b82f6" },
    { label: "Môn phụ trách", value: "3", icon: BookOpen, color: "#10b981" },
    { label: "Lịch thi", value: "8", icon: Calendar, color: "#ec4899" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 rounded-xl shadow-lg p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-3">Chào mừng giảng viên! 👨‍🏫</h1>
          <p className="text-purple-100 text-lg mb-6">
            Quản lý công việc giảng dạy hiệu quả và chuyên nghiệp
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-sm text-purple-100">Học kỳ hiện tại</p>
              <p className="font-bold">Học kỳ 1 - 2025</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-sm text-purple-100">Hôm nay</p>
              <p className="font-bold">{new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {teachingStats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-2">
              <div className="rounded-lg p-2" style={{ backgroundColor: stat.color + "20" }}>
                <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
  {quickLinks.map((item, idx) => (
    <Link key={idx} href={item.link} className="group block">
      <div
        className={`bg-gradient-to-br ${item.color} rounded-xl p-6 text-white 
        shadow-lg hover:shadow-xl hover:scale-105 transition-transform cursor-pointer`}
      >
        <item.icon className="h-10 w-10 mb-4 opacity-90" />
        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
        <p className="text-sm opacity-90">{item.description}</p>
      </div>
    </Link>
  ))}
</div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-600" />
            Lịch dạy hôm nay
          </h2>
          <div className="space-y-3">
            {todaySchedule.map((schedule, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:shadow-sm transition">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                        {schedule.time}
                      </span>
                      <span className="text-sm text-gray-500">Phòng {schedule.room}</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">{schedule.subject}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        Lớp {schedule.class}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {schedule.students} sinh viên
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
                className="border-l-4 pl-3 py-2 cursor-pointer hover:bg-gray-50 rounded-r transition"
                style={{
                  borderLeftColor: 
                    notif.priority === "high" ? "#ef4444" : 
                    notif.priority === "medium" ? "#f59e0b" : "#6b7280"
                }}
              >
                <p className="text-sm font-medium text-gray-800">{notif.title}</p>
                <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
              </div>
            ))}
            <button className="w-full text-center text-purple-600 text-sm font-medium hover:text-purple-700 py-2 hover:bg-purple-50 rounded transition">
              Xem tất cả →
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
                  <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded text-xs font-semibold">
                    Giám thị
                  </span>
                </div>
                <Calendar className="h-5 w-5 text-pink-500" />
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

      {/* Teaching Tips */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-md p-6 border border-purple-200">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-purple-600" />
          Ghi nhớ quan trọng
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">✓</span>
            <span className="text-sm text-gray-700">Chuẩn bị giáo án trước mỗi buổi học</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">✓</span>
            <span className="text-sm text-gray-700">Điểm danh và quản lý sinh viên nghiêm túc</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">✓</span>
            <span className="text-sm text-gray-700">Nộp điểm đúng hạn theo quy định</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">✓</span>
            <span className="text-sm text-gray-700">Thông báo khi có thay đổi lịch dạy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
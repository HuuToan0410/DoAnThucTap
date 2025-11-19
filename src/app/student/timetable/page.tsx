"use client";
import Protected from "@/components/Protected";
import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, User, BookOpen, Search, Filter, Download } from "lucide-react";

type Timetable = {
  _id?: string;
  subject?: string;
  teacher?: string;   
  classCode?: string;
  room?: string;
  day?: string;
  period?: string;
  week?: string;
  type?: string;      
  duration?: string;  
};



export default function StudentTimetablePage() {
  const [timetables, setTimetables] = useState<Timetable[]>([]);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDay, setFilterDay] = useState("");

  // === Giữ nguyên logic fetch như code của bạn ===
  useEffect(() => {
    fetch("/api/timetable")
      .then((res) => res.json())
      .then((data) => {
        setTimetables(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching timetables:", err);
        setLoading(false);
      });
  }, []);

  const filteredTimetables = timetables.filter((item) => {
    const matchesSearch =
      item.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.teacher?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.room?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDay = !filterDay || item.day?.includes(filterDay);
    return matchesSearch && matchesDay;
  });

  const groupedByWeek = filteredTimetables.reduce<Record<string, Timetable[]>>(
  (acc, item) => {
    const week = item.week || "Chưa xác định";
    if (!acc[week]) acc[week] = [];
    acc[week].push(item);
    return acc;
  },
  {}
);


  const weekDays = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"];

  return (
    <Protected allowedRoles={["STUDENT"]}>
      <div className="space-y-6">
        
        {/* Giữ nguyên UI — Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <Calendar className="h-8 w-8" />
                Thời khóa biểu của bạn
              </h1>
              <p className="text-blue-100">Xem lịch học và thông tin lớp học</p>
            </div>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition flex items-center gap-2">
              <Download className="h-4 w-4" />
              Tải xuống
            </button>
          </div>
        </div>

        {/* Giữ nguyên UI — Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
            <p className="text-sm text-gray-600 mb-1">Tổng số tiết</p>
            <p className="text-2xl font-bold text-gray-800">{timetables.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
            <p className="text-sm text-gray-600 mb-1">Tiết học tuần này</p>
            <p className="text-2xl font-bold text-gray-800">15</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-500">
            <p className="text-sm text-gray-600 mb-1">Số môn học</p>
            <p className="text-2xl font-bold text-gray-800">{new Set(timetables.map(t => t.subject)).size}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
            <p className="text-sm text-gray-600 mb-1">Tiết hôm nay</p>
            <p className="text-2xl font-bold text-gray-800">3</p>
          </div>
        </div>

        {/* Giữ nguyên UI — Search + Filter */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm môn học, giảng viên, phòng học..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filterDay}
                onChange={(e) => setFilterDay(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tất cả các ngày</option>
                {weekDays.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Giữ nguyên UI — Content */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
            <p className="text-gray-500 mt-4">Đang tải thời khóa biểu...</p>
          </div>
        ) : Object.keys(groupedByWeek).length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Không tìm thấy lịch học nào</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedByWeek).sort().map(([week, items]) => (
              <div key={week} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-3 border-b border-blue-200">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Tuần: {week}
                  </h3>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item._id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition"
                      >
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          
                          {/* Day and Period */}
                          <div className="flex items-center gap-3 md:w-1/4">
                            <div className="bg-blue-100 rounded-lg p-3">
                              <Calendar className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{item.day}</p>
                              <p className="text-sm text-gray-600 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Tiết {item.period}
                              </p>
                            </div>
                          </div>

                          {/* Subject Info */}
                          <div className="flex-1 md:w-1/2">
                            <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                              <BookOpen className="h-5 w-5 text-blue-600" />
                              {item.subject}
                            </h3>
                            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {item.teacher}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                Phòng {item.room}
                              </span>
                            </div>
                          </div>

                          {/* Type Badge */}
                          <div className="md:w-1/4 flex justify-end">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                item.type === "Lý thuyết"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {item.type}
                            </span>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Help Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-md p-6 border border-blue-200">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Lưu ý
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Vui lòng đến lớp đúng giờ, mang đầy đủ tài liệu học tập</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Kiểm tra thời khóa biểu thường xuyên để cập nhật những thay đổi</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Liên hệ phòng đào tạo nếu có thắc mắc: daotao@tkb.edu.vn</span>
            </li>
          </ul>
        </div>
      </div>
    </Protected>
  );
}

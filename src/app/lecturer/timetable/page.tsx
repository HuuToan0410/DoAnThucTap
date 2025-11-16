"use client";

import Protected from "@/components/Protected";
import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, Users, BookOpen, Search, Filter, Download, FileText } from "lucide-react";

export default function LecturerTimetablePage() {
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDay, setFilterDay] = useState("");

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
      item.room?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.classCode?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDay = !filterDay || item.day?.includes(filterDay);
    return matchesSearch && matchesDay;
  });

  const groupedByWeek = filteredTimetables.reduce((acc, item) => {
    const week = item.week || "Chưa xác định";
    if (!acc[week]) acc[week] = [];
    acc[week].push(item);
    return acc;
  }, {});

  const weekDays = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"];

  const totalClasses = timetables.length;
  const uniqueSubjects = new Set(timetables.map(t => t.subject)).size;
  const uniqueClasses = new Set(timetables.map(t => t.classCode)).size;

  return (
    <Protected allowedRoles={["LECTURER"]}>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <Calendar className="h-8 w-8" />
                Lịch giảng dạy
              </h1>
              <p className="text-purple-100">Quản lý và xem lịch giảng dạy của bạn</p>
            </div>
            <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition flex items-center gap-2">
              <Download className="h-4 w-4" />
              Tải xuống
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
            <p className="text-sm text-gray-600 mb-1">Tổng số buổi</p>
            <p className="text-2xl font-bold text-gray-800">{totalClasses}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
            <p className="text-sm text-gray-600 mb-1">Môn giảng dạy</p>
            <p className="text-2xl font-bold text-gray-800">{uniqueSubjects}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
            <p className="text-sm text-gray-600 mb-1">Số lớp</p>
            <p className="text-2xl font-bold text-gray-800">{uniqueClasses}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-500">
            <p className="text-sm text-gray-600 mb-1">Tuần này</p>
            <p className="text-2xl font-bold text-gray-800">12</p>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm môn học, phòng, lớp..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filterDay}
                onChange={(e) => setFilterDay(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Tất cả các ngày</option>
                {weekDays.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Timetable Content */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
            <p className="text-gray-500 mt-4">Đang tải lịch giảng dạy...</p>
          </div>
        ) : Object.keys(groupedByWeek).length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Không tìm thấy lịch giảng dạy nào</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedByWeek).sort().map(([week, items]) => (
              <div key={week} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-3 border-b border-purple-200">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    Tuần: {week}
                  </h3>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item._id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:shadow-md transition"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                          
                          {/* Day & Period */}
                          <div className="flex items-center gap-3 lg:w-1/4">
                            <div className="bg-purple-100 rounded-lg p-3">
                              <Calendar className="h-6 w-6 text-purple-600" />
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
                          <div className="flex-1 lg:w-1/2">
                            <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                              <BookOpen className="h-5 w-5 text-purple-600" />
                              {item.subject}
                            </h3>
                            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                Lớp {item.classCode}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                Phòng {item.room}
                              </span>
                            </div>
                          </div>

                          {/* Type Badge */}
                          <div className="lg:w-1/4 flex justify-end">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              item.type === "Lý thuyết"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                            }`}>
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

        {/* Notes */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-md p-6 border border-purple-200">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-600" />
            Ghi chú giảng dạy
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span>Chuẩn bị tài liệu giảng dạy trước 1 ngày</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span>Kiểm tra thiết bị phòng học trước khi lên lớp</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span>Điểm danh sinh viên đầu giờ học</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span>Liên hệ phòng đào tạo nếu cần thay đổi lịch: daotao@tkb.edu.vn</span>
            </li>
          </ul>
        </div>

      </div>
    </Protected>
  );
}

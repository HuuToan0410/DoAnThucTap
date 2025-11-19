"use client";

import Protected from "@/components/Protected";
import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, Users, AlertTriangle, CheckCircle, Download, Search, BookOpen, FileText } from "lucide-react";

type Exam = {
  _id?: string;
  subject?: string;
  room?: string;
  classCode?: string;
  date?: string;
  time?: string;
  duration?: string;
  type?: string;
};


export default function LecturerExamPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/exam")
      .then((res) => res.json())
      .then((data) => {
        setExams(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching exams:", err);
        setLoading(false);
      });
  }, []);

  const filteredExams = exams.filter((exam: Exam) =>
    exam.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.room?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.classCode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedExams = filteredExams.reduce((acc: Record<string, Exam[]>, exam: Exam) => {
    const date = exam.date || "Chưa xác định";
    if (!acc[date]) acc[date] = [];
    acc[date].push(exam);
    return acc;
  }, {});

  const getDaysUntil = (examDate: string) => {
    const today = new Date();
    const exam = new Date(examDate);
    const diffTime = exam.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyColor = (days: number) => {
    if (days < 0) return "bg-gray-100 text-gray-700 border-gray-200";
    if (days <= 3) return "bg-pink-100 text-pink-700 border-pink-200";
    if (days <= 7) return "bg-orange-100 text-orange-700 border-orange-200";
    return "bg-purple-100 text-purple-700 border-purple-200";
  };

  const getUrgencyIcon = (days: number) => {
    if (days < 0) return <CheckCircle className="h-5 w-5" />;
    if (days <= 7) return <AlertTriangle className="h-5 w-5" />;
    return <Clock className="h-5 w-5" />;
  };

  return (
    <Protected allowedRoles={["LECTURER"]}>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-pink-700 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <Calendar className="h-8 w-8" />
                Lịch thi giảng viên phụ trách
              </h1>
              <p className="text-pink-100">Theo dõi và quản lý lịch thi các môn học</p>
            </div>
            <button className="bg-white text-pink-600 px-4 py-2 rounded-lg font-medium hover:bg-pink-50 transition flex items-center gap-2">
              <Download className="h-4 w-4" />
              Tải lịch thi
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-pink-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tổng số kỳ thi</p>
                <p className="text-2xl font-bold text-gray-800">{exams.length}</p>
              </div>
              <FileText className="h-8 w-8 text-pink-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Sắp diễn ra (7 ngày)</p>
                <p className="text-2xl font-bold text-gray-800">
                  {exams.filter(e => {
                    const days = getDaysUntil(e.date as string);
                    return days >= 0 && days <= 7;
                  }).length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Đã hoàn thành</p>
                <p className="text-2xl font-bold text-gray-800">
                  {exams.filter(e => getDaysUntil(e.date as string) < 0).length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm môn thi, phòng thi, lớp..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Exam Schedule */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
            <p className="text-gray-500 mt-4">Đang tải lịch thi...</p>
          </div>
        ) : Object.keys(groupedExams).length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Không tìm thấy lịch thi nào</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedExams).sort().map(([date, dateExams]) => {
              const daysUntil = getDaysUntil(date);
              
              return (
                <div key={date} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className={`px-6 py-3 border-b ${getUrgencyColor(daysUntil)}`}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        {new Date(date + "T00:00:00").toLocaleDateString("vi-VN", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </h3>
                      <div className="flex items-center gap-2">
                        {getUrgencyIcon(daysUntil)}
                        <span className="font-semibold">
                          {daysUntil < 0 ? "Đã thi" : daysUntil === 0 ? "Hôm nay" : `Còn ${daysUntil} ngày`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {(dateExams as Exam[]).map((exam) => (
                      <div
                        key={exam._id}
                        className={`border-2 rounded-lg p-4 ${
                          getDaysUntil(date) <= 3 && getDaysUntil(date) >= 0
                            ? "border-pink-300 bg-pink-50"
                            : "border-gray-200 hover:border-purple-300"
                        } hover:shadow-md transition`}
                      >
                        <div className="flex flex-col md:flex-row gap-4">
                          
                          {/* Time & room */}
                          <div className="flex items-center gap-3 md:w-1/4">
                            <div className={`rounded-lg p-3 ${
                              getDaysUntil(date) <= 3 && getDaysUntil(date) >= 0
                                ? "bg-pink-100"
                                : "bg-purple-100"
                            }`}>
                              <Clock className={`h-6 w-6 ${
                                getDaysUntil(date) <= 3 && getDaysUntil(date) >= 0
                                  ? "text-pink-600"
                                  : "text-purple-600"
                              }`} />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{exam.time}</p>
                              <p className="text-sm text-gray-600 flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                Phòng {exam.room}
                              </p>
                            </div>
                          </div>

                          {/* Exam Info */}
                          <div className="flex-1 md:w-1/2">
                            <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                              <BookOpen className="h-5 w-5 text-purple-600" />
                              {exam.subject}
                            </h3>
                            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                Lớp {exam.classCode}
                              </span>
                              {exam.duration && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {exam.duration}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Type */}
                          <div className="md:w-1/4 flex justify-end items-start">
                            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-pink-100 text-pink-700">
                              {exam.type || "Thi"}
                            </span>
                          </div>

                        </div>

                        {/* Reminder */}
                        {getDaysUntil(date) >= 0 && getDaysUntil(date) <= 3 && (
                          <div className="mt-3 pt-3 border-t border-pink-200">
                            <div className="flex items-center gap-2 text-pink-700">
                              <AlertTriangle className="h-4 w-4" />
                              <span className="text-sm font-medium">
                                Nhớ chuẩn bị đề thi và có mặt đúng giờ giám thị!
                              </span>
                            </div>
                          </div>
                        )}

                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Supervisor Guidelines */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-md p-6 border border-purple-200">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-600" />
            Nhiệm vụ giám thị thi
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">Có mặt trước giờ thi 30 phút</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">Kiểm tra danh sách sinh viên dự thi</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">Phát đề thi và giấy thi đầy đủ</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">Theo dõi sinh viên trong suốt buổi thi</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">Thu bài thi và lập biên bản</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">Liên hệ: phongthithi@tkb.edu.vn nếu có vấn đề</span>
            </div>
          </div>
        </div>

      </div>
    </Protected>
  );
}

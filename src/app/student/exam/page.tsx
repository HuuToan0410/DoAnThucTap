"use client";
import Protected from "@/components/Protected";
import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, User, AlertTriangle, CheckCircle, Download, Search, BookOpen } from "lucide-react";

type Exam = {
  _id?: string;
  subject?: string;
  teacher?: string;
  room?: string;
  date?: string;
  time?: string;
  duration?: string;
  type?: string;
  classCode?: string;
};


export default function StudentExamPage() {
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

  const filteredExams = exams.filter((exam) => 
    exam.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.teacher?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.room?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedExams = filteredExams.reduce<Record<string, Exam[]>>(
  (acc, exam) => {
    const date = exam.date || "Chưa xác định";
    if (!acc[date]) acc[date] = [];
    acc[date].push(exam);
    return acc;
  },
  {}
);


  const getDaysUntil = (examDate) => {
    const today = new Date();
    const exam = new Date(examDate);
    const diffTime = exam - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyColor = (days) => {
    if (days < 0) return "bg-gray-100 text-gray-700 border-gray-200";
    if (days <= 3) return "bg-red-100 text-red-700 border-red-200";
    if (days <= 7) return "bg-orange-100 text-orange-700 border-orange-200";
    return "bg-green-100 text-green-700 border-green-200";
  };

  const getUrgencyIcon = (days) => {
    if (days < 0) return <CheckCircle className="h-5 w-5" />;
    if (days <= 7) return <AlertTriangle className="h-5 w-5" />;
    return <Clock className="h-5 w-5" />;
  };

  return (
    <Protected allowedRoles={["STUDENT"]}>
      <div className="space-y-6">
        
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <Calendar className="h-8 w-8" />
                Lịch thi của bạn
              </h1>
              <p className="text-red-100">Xem lịch thi và chuẩn bị tốt nhất</p>
            </div>
            <button className="bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-50 transition flex items-center gap-2">
              <Download className="h-4 w-4" />
              Tải lịch thi
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tổng số kỳ thi</p>
                <p className="text-2xl font-bold text-gray-800">{exams.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Sắp thi (7 ngày tới)</p>
                <p className="text-2xl font-bold text-gray-800">
                  {exams.filter(e => {
                    const days = getDaysUntil(e.date);
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
                  {exams.filter(e => getDaysUntil(e.date) < 0).length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm môn thi, giảng viên, phòng thi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

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
                    {dateExams.map((exam) => (
                      <div
                        key={exam._id}
                        className={`border-2 rounded-lg p-4 ${
                          getDaysUntil(date) <= 3 && getDaysUntil(date) >= 0
                            ? "border-red-300 bg-red-50"
                            : "border-gray-200 hover:border-blue-300"
                        } hover:shadow-md transition`}
                      >
                        <div className="flex flex-col md:flex-row gap-4">

                          <div className="flex items-center gap-3 md:w-1/4">
                            <div className={`rounded-lg p-3 ${
                              getDaysUntil(date) <= 3 && getDaysUntil(date) >= 0
                                ? "bg-red-100"
                                : "bg-blue-100"
                            }`}>
                              <Clock className={`h-6 w-6 ${
                                getDaysUntil(date) <= 3 && getDaysUntil(date) >= 0
                                  ? "text-red-600"
                                  : "text-blue-600"
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

                          <div className="flex-1 md:w-1/2">
                            <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                              <BookOpen className="h-5 w-5 text-blue-600" />
                              {exam.subject}
                            </h3>
                            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {exam.teacher}
                              </span>
                              {exam.duration && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {exam.duration}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="md:w-1/4 flex justify-end items-start">
                            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-700">
                              {exam.type || "Thi"}
                            </span>
                          </div>
                        </div>

                        {getDaysUntil(date) >= 0 && getDaysUntil(date) <= 3 && (
                          <div className="mt-3 pt-3 border-t border-red-200">
                            <div className="flex items-center gap-2 text-red-700">
                              <AlertTriangle className="h-4 w-4" />
                              <span className="text-sm font-medium">
                                Chuẩn bị kỹ lưỡng và đến đúng giờ!
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

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-md p-6 border border-blue-200">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Lưu ý quan trọng
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">Mang theo thẻ sinh viên và CMND/CCCD</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">Đến trước giờ thi ít nhất 15 phút</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">Chuẩn bị đầy đủ dụng cụ học tập cần thiết</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">Tắt điện thoại hoặc để chế độ im lặng</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">Không mang tài liệu không được phép vào phòng thi</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">Liên hệ: phongthithi@tkb.edu.vn nếu có thắc mắc</span>
            </div>
          </div>
        </div>

      </div>
    </Protected>
  );
}

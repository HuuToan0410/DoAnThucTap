"use client";

import { useState, useEffect } from "react";
import { FileText, Plus, Search, Filter, Download, Trash2, Calendar, Clock, MapPin } from "lucide-react";
type Exam = {
  _id: string;
  date: string;
  time: string;
  room: string;
  subject: string;
  classCode: string;
  teacher: string;
  type: string;
  duration: string;
};

export default function AdminExamPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [form, setForm] = useState<Partial<Exam>>({
  date: "",
  time: "",
  room: "",
  subject: "",
  classCode: "",
  teacher: "",
  type: "",
  duration: "",
});
  

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");

  //  LẤY DỮ LIỆU API — giữ nguyên nhưng theo logic code dưới
  useEffect(() => {
    fetch("/api/exam")
      .then((res) => res.json())
      .then((data) => setExams(data));
  }, []);

  //  THÊM MỚI — thay logic giống code dưới
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/exam", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const newExam = await res.json();
    setExams([...exams, newExam]);

    setForm({
      date: "",
      time: "",
      room: "",
      subject: "",
      classCode: "",
      teacher: "",
      type: "",
      duration: "",
    });
  };

  //  XÓA — logic giống code dưới
  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa lịch thi này?")) return;

    await fetch("/api/exam", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setExams(exams.filter((exam) => exam._id !== id));
  };

  // Search + filter giữ nguyên
  const filteredExams = exams.filter((exam) => {
    const matchesSearch =
      exam.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.teacher?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.classCode?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = !filterType || exam.type === filterType;

    return matchesSearch && matchesFilter;
  });

  // Group theo ngày — giữ nguyên UI
  const groupedExams = filteredExams.reduce<Record<string, Exam[]>>(
  (acc, exam) => {
    const date = exam.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(exam);
    return acc;
  },
  {}
);


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <FileText className="h-8 w-8" />
              Quản lý Lịch thi
            </h1>
            <p className="text-green-100">Lập và quản lý lịch thi các môn học</p>
          </div>
          <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition flex items-center gap-2">
            <Download className="h-4 w-4" />
            Xuất lịch thi
          </button>
        </div>
      </div>

      {/* Add Form */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Plus className="h-5 w-5 text-green-600" />
          Thêm lịch thi mới
        </h2>

        {/* ✔ FORM SUBMIT — thay onclick bằng onSubmit */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar className="h-4 w-4 inline mr-1" />
                Ngày thi
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Clock className="h-4 w-4 inline mr-1" />
                Giờ thi
              </label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="h-4 w-4 inline mr-1" />
                Phòng thi
              </label>
              <input
                type="text"
                placeholder="VD: A203"
                value={form.room}
                onChange={(e) => setForm({ ...form, room: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Môn học</label>
              <input
                type="text"
                placeholder="Tên môn học"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mã lớp</label>
              <input
                type="text"
                placeholder="VD: CNTT-K18"
                value={form.classCode}
                onChange={(e) => setForm({ ...form, classCode: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Giảng viên</label>
              <input
                type="text"
                placeholder="Họ tên giảng viên"
                value={form.teacher}
                onChange={(e) => setForm({ ...form, teacher: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hình thức</label>
              <input
                type="text"
                placeholder="VD: Giữa kỳ, Cuối kỳ"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Thời lượng</label>
              <input
                type="text"
                placeholder="VD: 90'"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Thêm lịch thi
          </button>
        </form>
      </div>

      {/* Search + filter giữ nguyên... */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm môn học, giảng viên, lớp..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Lọc theo hình thức"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Group exam UI giữ nguyên */}
      <div className="space-y-4">
        {Object.entries(groupedExams).sort().map(([date, dateExams]) => (
          <div key={date} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-3 border-b border-green-200">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                {new Date(date + "T00:00:00").toLocaleDateString("vi-VN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Giờ</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Phòng</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Môn học</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Lớp</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Giảng viên</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Hình thức</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Thời lượng</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Thao tác</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {(dateExams as Exam[]).map((exam) => (
                    <tr key={exam._id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 text-sm text-gray-600 font-medium">{exam.time}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-md font-medium">
                          <MapPin className="h-3 w-3" />
                          {exam.room}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">{exam.subject}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{exam.classCode}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{exam.teacher}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                          {exam.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 text-center">{exam.duration}</td>
                      <td className="px-4 py-3 text-sm text-center">
                        <button
                          onClick={() => handleDelete(exam._id)}
                          className="text-red-600 hover:text-red-800 transition p-1"
                          title="Xóa"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        ))}

        {Object.keys(groupedExams).length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Chưa có lịch thi nào được thêm</p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

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

export default function ExamPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [searchClass, setSearchClass] = useState("");
  const [searchTeacher, setSearchTeacher] = useState("");
  const [searchDate, setSearchDate] = useState("");

  // Lấy dữ liệu từ MongoDB qua API
  useEffect(() => {
    fetch("/api/exam")
      .then((res) => res.json())
      .then((data) => setExams(data));
  }, []);

  // Lọc dữ liệu
  const filteredExams = exams.filter((exam) => {
    const matchClass =
      !searchClass ||
      exam.classCode.toLowerCase().includes(searchClass.toLowerCase());
    const matchTeacher =
      !searchTeacher ||
      exam.teacher.toLowerCase().includes(searchTeacher.toLowerCase());
    const matchDate =
      !searchDate || exam.date.includes(searchDate);
    return matchClass && matchTeacher && matchDate;
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6">
        Lịch thi
      </h2>

      {/* Bộ lọc */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mã lớp
          </label>
          <input
            type="text"
            placeholder="VD: C23LRMT2"
            value={searchClass}
            onChange={(e) => setSearchClass(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Giảng viên
          </label>
          <input
            type="text"
            placeholder="VD: Nguyễn Văn A"
            value={searchTeacher}
            onChange={(e) => setSearchTeacher(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ngày thi
          </label>
          <input
            type="text"
            placeholder="VD: 12-11-2025"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Bảng hiển thị */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-300 px-2 py-2">Ngày</th>
              <th className="border border-gray-300 px-2 py-2">Giờ</th>
              <th className="border border-gray-300 px-2 py-2">Phòng</th>
              <th className="border border-gray-300 px-2 py-2">Môn học</th>
              <th className="border border-gray-300 px-2 py-2">Lớp</th>
              <th className="border border-gray-300 px-2 py-2">Giảng viên</th>
              <th className="border border-gray-300 px-2 py-2">Hình thức</th>
              <th className="border border-gray-300 px-2 py-2">Thời lượng</th>
            </tr>
          </thead>
          <tbody>
            {filteredExams.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-4 text-gray-500 italic"
                >
                  Không có dữ liệu lịch thi
                </td>
              </tr>
            ) : (
              filteredExams.map((exam) => (
                <tr
                  key={exam._id}
                  className={`${
                    exam.type.includes("Thực hành")
                      ? "bg-yellow-100"
                      : exam.type.includes("Bài tập")
                      ? "bg-green-100"
                      : "bg-blue-100"
                  } hover:bg-gray-50 border-b`}
                >
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    {exam.date}
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    {exam.time}
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    {exam.room}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    {exam.subject}
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    {exam.classCode}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    {exam.teacher}
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    {exam.type}
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    {exam.duration}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Ghi chú */}
      <div className="mt-6 text-sm text-gray-600 border-t pt-3">
        <p>
          <span className="font-semibold">Ghi chú:</span> 
          Màu <span className="bg-yellow-200 px-1 rounded">vàng</span> là Thực hành, 
          <span className="bg-green-200 px-1 rounded ml-1">xanh lá</span> là Bài tập lớn, 
          <span className="bg-blue-200 px-1 rounded ml-1">xanh dương</span> là Thi lý thuyết.
        </p>
      </div>
    </div>
  );
}

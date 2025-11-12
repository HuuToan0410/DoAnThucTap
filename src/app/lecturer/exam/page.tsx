"use client";
import Protected from "@/components/Protected";
import { useEffect, useState } from "react";

export default function LecturerExamPage() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetch("/api/exam")
      .then((res) => res.json())
      .then((data) => setExams(data));
  }, []);

  return (
    <Protected allowedRoles={["LECTURER"]}>
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          Lịch thi giảng viên phụ trách
        </h2>
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-2">Ngày</th>
              <th className="border px-2 py-2">Giờ</th>
              <th className="border px-2 py-2">Phòng</th>
              <th className="border px-2 py-2">Môn học</th>
              <th className="border px-2 py-2">Lớp</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam: any) => (
              <tr key={exam._id} className="hover:bg-gray-50">
                <td className="border px-2 py-2 text-center">{exam.date}</td>
                <td className="border px-2 py-2 text-center">{exam.time}</td>
                <td className="border px-2 py-2 text-center">{exam.room}</td>
                <td className="border px-2 py-2">{exam.subject}</td>
                <td className="border px-2 py-2 text-center">{exam.classCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Protected>
  );
}

"use client";
import Protected from "@/components/Protected";
import { useEffect, useState } from "react";

export default function LecturerTimetablePage() {
  const [timetables, setTimetables] = useState([]);

  useEffect(() => {
    fetch("/api/timetable")
      .then((res) => res.json())
      .then((data) => setTimetables(data));
  }, []);

  return (
    <Protected allowedRoles={["LECTURER"]}>
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          Lịch giảng dạy của giảng viên
        </h2>
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-2">Ngày</th>
              <th className="border px-2 py-2">Tiết</th>
              <th className="border px-2 py-2">Môn học</th>
              <th className="border px-2 py-2">Phòng</th>
              <th className="border px-2 py-2">Lớp</th>
            </tr>
          </thead>
          <tbody>
            {timetables.map((t: any) => (
              <tr key={t._id} className="hover:bg-gray-50">
                <td className="border px-2 py-2 text-center">{t.day}</td>
                <td className="border px-2 py-2 text-center">{t.period}</td>
                <td className="border px-2 py-2">{t.subject}</td>
                <td className="border px-2 py-2 text-center">{t.room}</td>
                <td className="border px-2 py-2 text-center">{t.classCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Protected>
  );
}

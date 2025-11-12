"use client";
import Protected from "@/components/Protected";
import { useEffect, useState } from "react";

export default function StudentTimetablePage() {
  const [timetables, setTimetables] = useState([]);

  useEffect(() => {
    fetch("/api/timetable")
      .then((res) => res.json())
      .then((data) => setTimetables(data));
  }, []);

  return (
    <Protected allowedRoles={["STUDENT"]}>
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          Thời khóa biểu của bạn
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-2">Tuần</th>
                <th className="border px-2 py-2">Ngày</th>
                <th className="border px-2 py-2">Tiết</th>
                <th className="border px-2 py-2">Môn học</th>
                <th className="border px-2 py-2">Giảng viên</th>
                <th className="border px-2 py-2">Phòng</th>
              </tr>
            </thead>
            <tbody>
              {timetables.map((item: any) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="border px-2 py-2 text-center">{item.week}</td>
                  <td className="border px-2 py-2 text-center">{item.day}</td>
                  <td className="border px-2 py-2 text-center">{item.period}</td>
                  <td className="border px-2 py-2">{item.subject}</td>
                  <td className="border px-2 py-2">{item.teacher}</td>
                  <td className="border px-2 py-2 text-center">{item.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Protected>
  );
}

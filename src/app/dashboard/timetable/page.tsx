"use client";

import { useState } from "react";

type Schedule = {
  day: string;
  periods: {
    period: number;
    subject?: string;
    teacher?: string;
    room?: string;
    type?: string; // "Thực hành" hoặc "Lý thuyết"
  }[];
};

const mockTimetable: Schedule[] = [
  {
    day: "Thứ Hai",
    periods: [
      { period: 7, subject: "Xây dựng Portfolio cá nhân", teacher: "Cô S.Mai", room: "A101", type: "Thực hành" },
    ],
  },
  {
    day: "Thứ Ba",
    periods: [
      { period: 1, subject: "Dựng hình nhân vật 3D", teacher: "Thầy H.Hào", room: "A103", type: "Thực hành" },
    ],
  },
  {
    day: "Thứ Tư",
    periods: [
      { period: 7, subject: "Dựng hình nhân vật 3D", teacher: "Thầy H.Hào", room: "A103", type: "Thực hành" },
    ],
  },
  {
    day: "Thứ Năm",
    periods: [
      { period: 1, subject: "Thiết kế Banner động", teacher: "Cô T.Oanh", room: "A112", type: "Thực hành" },
    ],
  },
  {
    day: "Thứ Sáu",
    periods: [
      { period: 1, subject: "Thiết kế & Dựng video quảng cáo", teacher: "Cô B.Khanh", room: "A112", type: "Thực hành" },
    ],
  },
];

export default function TimetablePage() {
  const [selectedWeek, setSelectedWeek] = useState("03-11-2025");
  const [selectedClass, setSelectedClass] = useState("C23TKDH1");

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6">
        Thời khóa biểu - {selectedClass}
      </h2>

      {/* Bộ lọc chọn tuần & lớp */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tuần áp dụng
          </label>
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option>03-11-2025</option>
            <option>27-10-2025</option>
            <option>20-10-2025</option>
            <option>13-10-2025</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lớp học
          </label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option>C23TKDH1</option>
            <option>C23UDPM1</option>
            <option>T24TKDH2</option>
          </select>
        </div>
      </div>

      {/* Bảng thời khóa biểu */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-300 px-2 py-2 w-16">Tiết</th>
              {mockTimetable.map((day) => (
                <th key={day.day} className="border border-gray-300 px-3 py-2 text-center">
                  {day.day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((period) => (
              <tr key={period} className="hover:bg-gray-50">
                <td className="border border-gray-300 text-center py-2 font-medium">{period}</td>
                {mockTimetable.map((day) => {
                  const subject = day.periods.find((p) => p.period === period);
                  return (
                    <td
                      key={day.day + period}
                      className={`border border-gray-300 text-center py-2 ${
                        subject ? "bg-yellow-100" : ""
                      }`}
                    >
                      {subject ? (
                        <div>
                          <div className="font-semibold text-gray-800">
                            {subject.subject}
                          </div>
                          <div className="text-xs text-gray-600">
                            {subject.teacher}
                          </div>
                          <div className="text-xs text-gray-500">
                            {subject.room} ({subject.type})
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ghi chú */}
      <div className="mt-6 text-sm text-gray-600 border-t pt-3">
        <p>
          <span className="font-semibold">Ghi chú:</span> Môn học có nền màu vàng là thực hành.
        </p>
        <p>Các lịch có thể thay đổi theo thông báo của phòng đào tạo.</p>
      </div>
    </div>
  );
}

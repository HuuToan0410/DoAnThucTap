"use client";
import Protected from "@/components/Protected";

export default function LecturerHome() {
  return (
    <Protected allowedRoles={["LECTURER"]}>
      <div className="bg-white p-6 rounded-xl shadow text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-3">Trang giảng viên</h1>
        <p>Chào mừng giảng viên! Hãy xem lịch giảng dạy và lịch thi tại đây.</p>
      </div>
    </Protected>
  );
}

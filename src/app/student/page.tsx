"use client";
import Protected from "@/components/Protected";

export default function StudentHome() {
  return (
    <Protected allowedRoles={["STUDENT"]}>
      <div className="bg-white p-6 rounded-xl shadow text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-3">Trang sinh viên</h1>
        <p>Chào mừng bạn! Hãy xem thời khóa biểu và lịch thi của bạn tại đây.</p>
      </div>
    </Protected>
  );
}

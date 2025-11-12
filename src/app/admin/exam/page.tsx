"use client";

import { useState, useEffect } from "react";

export default function AdminExamPage() {
  const [exams, setExams] = useState([]);
  const [form, setForm] = useState({
    date: "",
    time: "",
    room: "",
    subject: "",
    classCode: "",
    teacher: "",
    type: "",
    duration: "",
  });

  // Lấy dữ liệu từ API
  useEffect(() => {
    fetch("/api/exam")
      .then((res) => res.json())
      .then((data) => setExams(data));
  }, []);

  // Thêm mới lịch thi
  const handleSubmit = async (e: any) => {
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

  // Xóa lịch thi
  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa lịch thi này?")) return;
    await fetch("/api/exam", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setExams(exams.filter((exam: any) => exam._id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">
        Quản lý Lịch thi
      </h2>

      {/* Form thêm mới */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6"
      >
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border rounded-md px-3 py-2"
          required
        />
        <input
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          className="border rounded-md px-3 py-2"
          required
        />
        <input
          type="text"
          placeholder="Phòng"
          value={form.room}
          onChange={(e) => setForm({ ...form, room: e.target.value })}
          className="border rounded-md px-3 py-2"
        />
        <input
          type="text"
          placeholder="Môn học"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="border rounded-md px-3 py-2"
          required
        />
        <input
          type="text"
          placeholder="Mã lớp"
          value={form.classCode}
          onChange={(e) => setForm({ ...form, classCode: e.target.value })}
          className="border rounded-md px-3 py-2"
          required
        />
        <input
          type="text"
          placeholder="Giảng viên"
          value={form.teacher}
          onChange={(e) => setForm({ ...form, teacher: e.target.value })}
          className="border rounded-md px-3 py-2"
        />
        <input
          type="text"
          placeholder="Hình thức (VD: Thực hành lần 1)"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="border rounded-md px-3 py-2"
        />
        <input
          type="text"
          placeholder="Thời gian (VD: 90’)"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          className="border rounded-md px-3 py-2"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 md:col-span-3"
        >
          ➕ Thêm lịch thi
        </button>
      </form>

      {/* Danh sách lịch thi */}
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-2">Ngày</th>
              <th className="border px-2 py-2">Giờ</th>
              <th className="border px-2 py-2">Phòng</th>
              <th className="border px-2 py-2">Môn học</th>
              <th className="border px-2 py-2">Lớp</th>
              <th className="border px-2 py-2">Giảng viên</th>
              <th className="border px-2 py-2">Hình thức</th>
              <th className="border px-2 py-2">Thời lượng</th>
              <th className="border px-2 py-2">Thao tác</th>
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
                <td className="border px-2 py-2">{exam.teacher}</td>
                <td className="border px-2 py-2 text-center">{exam.type}</td>
                <td className="border px-2 py-2 text-center">{exam.duration}</td>
                <td className="border px-2 py-2 text-center">
                  <button
                    onClick={() => handleDelete(exam._id)}
                    className="text-red-600 hover:underline"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

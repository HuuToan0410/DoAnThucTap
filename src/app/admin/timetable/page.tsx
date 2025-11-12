"use client";

import { useEffect, useState } from "react";

export default function AdminTimetablePage() {
  const [timetables, setTimetables] = useState([]);
  const [form, setForm] = useState({
    week: "",
    day: "",
    period: "",
    subject: "",
    teacher: "",
    room: "",
    type: "",
    classCode: "",
  });

  // Biến lưu item đang chỉnh sửa
  const [editing, setEditing] = useState<any>(null);

  // Lấy danh sách
  useEffect(() => {
    fetch("/api/timetable")
      .then((res) => res.json())
      .then((data) => setTimetables(data));
  }, []);

  // ✅ Khi người dùng chọn ngày "Tuần", tự động tạo danh sách các ngày trong tuần đó
  const [weekDays, setWeekDays] = useState<string[]>([]);

  // ✅ Tự động hiển thị ngày tương ứng với form.week
  useEffect(() => {
    if (!form.week) return;

    const selectedDate = new Date(form.week + "T00:00:00");

    const weekdayName = selectedDate
      .toLocaleDateString("vi-VN", { weekday: "long" })
      .replace(/^\w/, (c) => c.toUpperCase());
    const formattedDate = selectedDate
      .toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })
      .replace(/\//g, "-");

    const formatted = `${weekdayName}, ${formattedDate}`;
    setForm((prev) => ({ ...prev, day: formatted }));
  }, [form.week]);

  // Thêm mới
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/timetable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const newItem = await res.json();
    setTimetables([...timetables, newItem]);
    setForm({
      week: "",
      day: "",
      period: "",
      subject: "",
      teacher: "",
      room: "",
      type: "",
      classCode: "",
    });
  };

  // Xóa
  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa tiết học này không?")) return;
    await fetch("/api/timetable", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTimetables(timetables.filter((item: any) => item._id !== id));
  };

  // Sửa
  const handleEdit = (item: any) => {
    setEditing(item);
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/timetable", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    const updatedItem = await res.json();
    setTimetables(
      timetables.map((t: any) => (t._id === updatedItem._id ? updatedItem : t))
    );
    setEditing(null); // Đóng popup
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">
        Quản lý Thời khóa biểu
      </h2>

      {/* Form thêm mới */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6"
      >
        <input
          type="date"
          value={form.week}
          onChange={(e) => setForm({ ...form, week: e.target.value })}
          className="border rounded-md px-3 py-2"
          required
        />

        <input
          type="text"
          value={form.day}
          readOnly
          className="border rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
          placeholder="Ngày học (tự động hiển thị)"
        />

        <input
          type="text"
          placeholder="Tiết"
          value={form.period}
          onChange={(e) => setForm({ ...form, period: e.target.value })}
          className="border rounded-md px-3 py-2"
        />
        <input
          type="text"
          placeholder="Môn học"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="border rounded-md px-3 py-2"
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
          placeholder="Phòng"
          value={form.room}
          onChange={(e) => setForm({ ...form, room: e.target.value })}
          className="border rounded-md px-3 py-2"
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="border rounded-md px-3 py-2"
        >
          <option value="">-- Loại tiết học --</option>
          <option>Lý thuyết</option>
          <option>Thực hành</option>
        </select>
        <input
          type="text"
          placeholder="Mã lớp"
          value={form.classCode}
          onChange={(e) => setForm({ ...form, classCode: e.target.value })}
          className="border rounded-md px-3 py-2"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 md:col-span-4"
        >
          ➕ Thêm lịch học
        </button>
      </form>

      {/* Bảng danh sách */}
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
              <th className="border px-2 py-2">Loại</th>
              <th className="border px-2 py-2">Lớp</th>
              <th className="border px-2 py-2">Thao tác</th>
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
                <td className="border px-2 py-2 text-center">{item.type}</td>
                <td className="border px-2 py-2 text-center">
                  {item.classCode}
                </td>
                <td className="border px-2 py-2 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:underline"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
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

      {/* Popup chỉnh sửa */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              ✏️ Chỉnh sửa tiết học
            </h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                value={editing.subject}
                onChange={(e) =>
                  setEditing({ ...editing, subject: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2"
              />
              <input
                type="text"
                value={editing.teacher}
                onChange={(e) =>
                  setEditing({ ...editing, teacher: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2"
              />
              <input
                type="text"
                value={editing.room}
                onChange={(e) =>
                  setEditing({ ...editing, room: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2"
              />
              <select
                value={editing.type}
                onChange={(e) =>
                  setEditing({ ...editing, type: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2"
              >
                <option>Lý thuyết</option>
                <option>Thực hành</option>
              </select>

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 rounded-md border"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

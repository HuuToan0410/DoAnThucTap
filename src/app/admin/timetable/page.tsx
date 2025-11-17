"use client";

import { useEffect, useState } from "react";
import { Calendar, Search, Plus, Edit2, Trash2, Filter, Download, X, Save } from "lucide-react";
import { startTransition } from "react";

interface Timetable {
  _id: string;
  week: string;
  day: string;
  period: string;
  subject: string;
  teacher: string;
  room: string;
  type: string;
  classCode: string;
}


export default function AdminTimetablePage() {
  const [timetables, setTimetables] = useState<Timetable[]>([]);
  const [form, setForm] = useState<Partial<Timetable>>({
  week: "",
  day: "",
  period: "",
  subject: "",
  teacher: "",
  room: "",
  type: "",
  classCode: "",
});


  const [editing, setEditing] = useState<Timetable | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");

  // Auto-generate day from week
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

  startTransition(() => {
    setForm((prev) => ({ ...prev, day: formatted }));
  });
}, [form.week]);


  // Fetch data
  useEffect(() => {
    fetch("/api/timetable")
      .then((res) => res.json())
      .then((data) => setTimetables(data))
      .catch((err) => console.error("Error fetching timetables:", err));
  }, []);

  // ✔ THAY ĐỔI LOGIC handleSubmit (dùng form onSubmit)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
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
    } catch (error) {
      console.error("Error adding timetable:", error);
    }
  };

  // Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa tiết học này không?")) return;
    try {
      await fetch("/api/timetable", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setTimetables(timetables.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting timetable:", error);
    }
  };

  
  const handleEdit = (item: Timetable) => {
    setEditing({ ...item });
  };

 
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/timetable", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });

    const updatedItem = await res.json();

    setTimetables(
      timetables.map((t) => (t._id === updatedItem._id ? updatedItem : t))
    );

    setEditing(null);
  };

  // Filter logic
  const filteredTimetables = timetables.filter((item: Timetable) => {
    const matchesSearch =
      item.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.teacher?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.classCode?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterType || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Calendar className="h-8 w-8" />
              Quản lý Thời khóa biểu
            </h1>
            <p className="text-blue-100">Lập và quản lý lịch học các lớp</p>
          </div>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition flex items-center gap-2">
            <Download className="h-4 w-4" />
            Xuất Excel
          </button>
        </div>
      </div>

      {/* Add Form */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Plus className="h-5 w-5 text-blue-600" />
          Thêm tiết học mới
        </h2>

        {/* ✔ FORM SUBMIT */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chọn ngày</label>
              <input
                type="date"
                value={form.week}
                onChange={(e) => setForm({ ...form, week: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày học (tự động)</label>
              <input
                type="text"
                value={form.day}
                readOnly
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
                placeholder="Tự động hiển thị"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tiết</label>
              <input
                type="text"
                placeholder="VD: 1-3"
                value={form.period}
                onChange={(e) => setForm({ ...form, period: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Môn học</label>
              <input
                type="text"
                placeholder="Tên môn học"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Giảng viên</label>
              <input
                type="text"
                placeholder="Họ tên giảng viên"
                value={form.teacher}
                onChange={(e) => setForm({ ...form, teacher: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phòng</label>
              <input
                type="text"
                placeholder="Phòng học"
                value={form.room}
                onChange={(e) => setForm({ ...form, room: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loại tiết học</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">-- Chọn loại --</option>
                <option>Lý thuyết</option>
                <option>Thực hành</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mã lớp</label>
              <input
                type="text"
                placeholder="VD: CNTT-K18"
                value={form.classCode}
                onChange={(e) => setForm({ ...form, classCode: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Thêm lịch học
          </button>
        </form>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm môn học, giảng viên, lớp..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="">Tất cả loại</option>
              <option>Lý thuyết</option>
              <option>Thực hành</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tuần</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Ngày</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tiết</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Môn học</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Giảng viên</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Phòng</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Loại</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Lớp</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Thao tác</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTimetables.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-sm text-gray-600">{item.week}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.day}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 text-center">{item.period}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.subject}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.teacher}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 text-center">{item.room}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.type === "Lý thuyết"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 text-center">
                    {item.classCode}
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-800 transition p-1"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:text-red-800 transition p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Edit2 className="h-5 w-5 text-blue-600" />
                Chỉnh sửa tiết học
              </h3>
              <button
                onClick={() => setEditing(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* ✔ FORM UPDATE */}
            <form onSubmit={handleUpdate} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Môn học</label>
                  <input
                    type="text"
                    value={editing.subject}
                    onChange={(e) => setEditing({ ...editing, subject: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giảng viên</label>
                  <input
                    type="text"
                    value={editing.teacher}
                    onChange={(e) => setEditing({ ...editing, teacher: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phòng</label>
                  <input
                    type="text"
                    value={editing.room}
                    onChange={(e) => setEditing({ ...editing, room: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại tiết học</label>
                  <select
                    value={editing.type}
                    onChange={(e) => setEditing({ ...editing, type: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option>Lý thuyết</option>
                    <option>Thực hành</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Lưu thay đổi
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}

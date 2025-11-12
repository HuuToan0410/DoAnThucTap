"use client";

import { useState, useEffect } from "react";

export default function AdminPlanPage() {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({
    semester: "",
    startDate: "",
    endDate: "",
    status: "",
    description: "",
  });

  // Lấy danh sách kế hoạch
  useEffect(() => {
    fetch("/api/plan")
      .then((res) => res.json())
      .then((data) => setPlans(data));
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const newPlan = await res.json();
    setPlans([...plans, newPlan]);
    setForm({ semester: "", startDate: "", endDate: "", status: "", description: "" });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">
        Quản lý Kế hoạch học kỳ
      </h2>

      {/* Form thêm mới */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Tên học kỳ"
          className="border rounded-md px-3 py-2"
          value={form.semester}
          onChange={(e) => setForm({ ...form, semester: e.target.value })}
        />
        <input
          type="text"
          placeholder="Ngày bắt đầu"
          className="border rounded-md px-3 py-2"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
        />
        <input
          type="text"
          placeholder="Ngày kết thúc"
          className="border rounded-md px-3 py-2"
          value={form.endDate}
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
        />
        <select
          className="border rounded-md px-3 py-2"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="">-- Chọn trạng thái --</option>
          <option>Đang học</option>
          <option>Sắp tới</option>
          <option>Đã kết thúc</option>
        </select>
        <textarea
          placeholder="Mô tả"
          className="border rounded-md px-3 py-2 md:col-span-2"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 md:col-span-2"
        >
          Thêm kế hoạch
        </button>
      </form>

      {/* Danh sách kế hoạch */}
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-2">Học kỳ</th>
            <th className="border px-2 py-2">Thời gian</th>
            <th className="border px-2 py-2">Trạng thái</th>
            <th className="border px-2 py-2">Mô tả</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan: any, i) => (
            <tr key={i}>
              <td className="border px-2 py-2">{plan.semester}</td>
              <td className="border px-2 py-2">
                {plan.startDate} → {plan.endDate}
              </td>
              <td className="border px-2 py-2">{plan.status}</td>
              <td className="border px-2 py-2">{plan.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

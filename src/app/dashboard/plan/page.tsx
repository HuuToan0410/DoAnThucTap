"use client";

import { useEffect, useState } from "react";
import { CalendarDays, CheckCircle, Clock } from "lucide-react";

type Plan = {
  _id: string;
  semester: string;
  startDate: string;
  endDate: string;
  status: string;
  description: string;
};

export default function PlanPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Lấy dữ liệu thật từ MongoDB
  useEffect(() => {
    fetch("/api/plan")
      .then((res) => res.json())
      .then((data) => setPlans(data));
  }, []);

  // Lọc dữ liệu theo năm học & trạng thái
  const filteredPlans = plans.filter((plan) => {
    const matchYear =
      !selectedYear || plan.semester.toLowerCase().includes(selectedYear.toLowerCase());
    const matchStatus =
      !selectedStatus || plan.status.toLowerCase().includes(selectedStatus.toLowerCase());
    return matchYear && matchStatus;
  });

  // Đổi màu và icon theo trạng thái
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đang học":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "Sắp tới":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Đã kết thúc":
        return "bg-green-100 text-green-700 border-green-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Đang học":
        return <Clock className="text-blue-600" size={18} />;
      case "Sắp tới":
        return <CalendarDays className="text-yellow-600" size={18} />;
      case "Đã kết thúc":
        return <CheckCircle className="text-green-600" size={18} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6">
        Kế hoạch học kỳ
      </h2>

      {/* Bộ lọc */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Năm học
          </label>
          <input
            type="text"
            placeholder="VD: 2025-2026"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trạng thái
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Tất cả --</option>
            <option>Đang học</option>
            <option>Sắp tới</option>
            <option>Đã kết thúc</option>
          </select>
        </div>
      </div>

      {/* Danh sách kế hoạch */}
      {filteredPlans.length === 0 ? (
        <p className="text-gray-500 italic text-center">Không có dữ liệu kế hoạch học kỳ.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPlans.map((plan) => (
            <div
              key={plan._id}
              className={`border rounded-lg p-5 ${getStatusColor(
                plan.status
              )} shadow-sm hover:shadow-md transition-all`}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">{plan.semester}</h3>
                {getStatusIcon(plan.status)}
              </div>
              <p className="text-sm text-gray-700 mb-2">{plan.description}</p>
              <div className="flex justify-between text-sm text-gray-600">
                <p>
                  <span className="font-medium">Bắt đầu:</span> {plan.startDate}
                </p>
                <p>
                  <span className="font-medium">Kết thúc:</span> {plan.endDate}
                </p>
              </div>
              <div className="mt-3 text-sm font-semibold">
                Trạng thái: {plan.status}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ghi chú */}
      <div className="mt-6 text-sm text-gray-600 border-t pt-3">
        <p>
          <span className="font-semibold">Ghi chú:</span> 
          Học kỳ <span className="text-blue-600">Đang học</span> có nền xanh, 
          <span className="text-yellow-600">Sắp tới</span> màu vàng, 
          <span className="text-green-600">Đã kết thúc</span> màu xanh lá.
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { BookOpen, Plus, Calendar, CheckCircle, Clock, XCircle } from "lucide-react";

interface Plan {
  _id?: string;
  semester: string;
  startDate: string;
  endDate: string;
  status: string;
  description: string;
}

export default function AdminPlanPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [form, setForm] = useState({
    semester: "",
    startDate: "",
    endDate: "",
    status: "",
    description: "",
  });

  // ✔ LẤY DỮ LIỆU — y như code dưới
  useEffect(() => {
    fetch("/api/plan")
      .then((res) => res.json())
      .then((data: Plan[]) => setPlans(data));
  }, []);

  // ✔ SUBMIT FORM — giống code dưới
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const newPlan = await res.json();
    setPlans([...plans, newPlan as Plan]);

    setForm({
      semester: "",
      startDate: "",
      endDate: "",
      status: "",
      description: "",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Đang học":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "Sắp tới":
        return <Clock className="h-5 w-5 text-orange-500" />;
      case "Đã kết thúc":
        return <XCircle className="h-5 w-5 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đang học":
        return "bg-green-100 text-green-700 border-green-200";
      case "Sắp tới":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Đã kết thúc":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <BookOpen className="h-8 w-8" />
              Quản lý Kế hoạch học kỳ
            </h1>
            <p className="text-purple-100">Thiết lập và theo dõi kế hoạch đào tạo</p>
          </div>
        </div>
      </div>

      {/* Add Form — ✔ CHUYỂN SANG FORM onSubmit */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Plus className="h-5 w-5 text-purple-600" />
          Thêm kế hoạch mới
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên học kỳ
              </label>
              <input
                type="text"
                placeholder="VD: Học kỳ 1 - Năm học 2025-2026"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={form.semester}
                onChange={(e) => setForm({ ...form, semester: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar className="h-4 w-4 inline mr-1" />
                Ngày bắt đầu
              </label>
              <input
                type="date"
                placeholder="VD: 05/09/2025"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar className="h-4 w-4 inline mr-1" />
                Ngày kết thúc
              </label>
              <input
                type="date"
                placeholder="VD: 15/01/2026"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="">-- Chọn trạng thái --</option>
                <option>Đang học</option>
                <option>Sắp tới</option>
                <option>Đã kết thúc</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả chi tiết</label>
              <textarea
                placeholder="Nhập mô tả về kế hoạch học kỳ..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
          </div>

          {/* ✔ ĐỔI onClick → type="submit" */}
          <button
            type="submit"
            className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition font-medium flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Thêm kế hoạch
          </button>
        </form>
      </div>

      {/* Plans List — giữ nguyên UI */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {plans.map((plan: Plan) => (
          <div
            key={plan._id}
            className={`bg-white rounded-xl shadow-md overflow-hidden border-2 hover:shadow-lg transition ${
              plan.status === "Đang học" ? "border-green-200" : "border-gray-200"
            }`}
          >
            <div
              className={`px-6 py-4 border-b ${
                plan.status === "Đang học"
                  ? "bg-gradient-to-r from-green-50 to-green-100"
                  : "bg-gray-50"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {plan.semester}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {plan.startDate} → {plan.endDate}
                    </span>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(
                    plan.status
                  )}`}
                >
                  {getStatusIcon(plan.status)}
                  <span className="text-sm font-semibold">{plan.status}</span>
                </div>
              </div>
            </div>

            <div className="px-6 py-4">
              <p className="text-gray-700 leading-relaxed">
                {plan.description}
              </p>

              {plan.status === "Đang học" && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">8</p>
                    <p className="text-xs text-gray-600 mt-1">Tuần đã học</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">7</p>
                    <p className="text-xs text-gray-600 mt-1">Tuần còn lại</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">245</p>
                    <p className="text-xs text-gray-600 mt-1">Tiết học</p>
                  </div>
                </div>
              )}

              {plan.status === "Sắp tới" && (
                <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-orange-700">
                    <Clock className="h-5 w-5" />
                    <p className="text-sm font-medium">
                      Học kỳ sẽ bắt đầu trong thời gian tới
                    </p>
                  </div>
                </div>
              )}

              {plan.status === "Đã kết thúc" && (
                <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="h-5 w-5" />
                      <p className="text-sm font-medium">
                        Học kỳ đã hoàn thành
                      </p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Xem báo cáo →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {plans.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Chưa có kế hoạch học kỳ nào</p>
        </div>
      )}
    </div>
  );
}

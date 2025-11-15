"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  BookOpen,
  FileText,
  Users,
  TrendingUp,
  Clock,
  AlertCircle,
  Activity,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Protected from "@/components/Protected";
import DashboardLayout from "@/components/dashboards/DashboardLayout";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ timetables: 0, exams: 0, plans: 0 });

  const [planData, setPlanData] = useState([
    { name: "Đang học", value: 0, color: "#10b981" },
    { name: "Sắp tới", value: 0, color: "#f59e0b" },
    { name: "Đã kết thúc", value: 0, color: "#6b7280" },
  ]);

  const [loading, setLoading] = useState(true);

  // FETCH dữ liệu
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [timetableRes, examRes, planRes] = await Promise.all([
          fetch("/api/timetable").then((r) => r.json()),
          fetch("/api/exam").then((r) => r.json()),
          fetch("/api/plan").then((r) => r.json()),
        ]);

        setStats({
          timetables: timetableRes.length,
          exams: examRes.length,
          plans: planRes.length,
        });

        setPlanData([
          {
            name: "Đang học",
            value: planRes.filter((p) => p.status === "Đang học").length,
            color: "#10b981",
          },
          {
            name: "Sắp tới",
            value: planRes.filter((p) => p.status === "Sắp tới").length,
            color: "#f59e0b",
          },
          {
            name: "Đã kết thúc",
            value: planRes.filter((p) => p.status === "Đã kết thúc").length,
            color: "#6b7280",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ==========================
  // UI DASHBOARD CHÍNH
  // ==========================
  const DashboardContent = (
    <div className="space-y-6 mt-8 mb-14">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Activity className="h-8 w-8" />
              Bảng điều khiển quản trị
            </h1>
            <p className="text-blue-100">Tổng quan hệ thống quản lý đào tạo</p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm">Hôm nay</p>
            <p className="text-xl font-semibold">
              {new Date().toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600" />
          Trạng thái kế hoạch học kỳ
        </h2>

        {loading ? (
          <div className="h-[300px] flex items-center justify-center text-gray-400">
            Đang tải dữ liệu...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={planData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {planData.map((item, i) => (
                  <Cell key={i} fill={item.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );

  return (
    <Protected allowedRoles={["ADMIN"]}>
      {/* Layout luôn nằm TRÊN */}
      <DashboardLayout
        title="Bảng thống kê tổng hợp"
        stats={stats}
        role="ADMIN"
        planData={planData}
      />

      {/* Nội dung nằm DƯỚI layout */}
      {DashboardContent}
    </Protected>
  );
}

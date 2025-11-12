"use client";

import { BookOpen, Calendar, ClipboardList, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DashboardLayoutProps = {
  title: string;
  stats: { timetables: number; exams: number; plans: number };
  planData: { name: string; value: number }[];
  role: "ADMIN" | "LECTURER" | "STUDENT";
};

export default function DashboardLayout({
  title,
  stats,
  planData,
  role,
}: DashboardLayoutProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">{title}</h1>

      {/* Thống kê chung */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 p-5 rounded-lg border shadow-sm flex items-center gap-4">
          <BookOpen size={40} className="text-blue-600" />
          <div>
            <h3 className="text-sm text-gray-600">Tổng số lịch học</h3>
            <p className="text-2xl font-semibold text-blue-800">
              {stats.timetables}
            </p>
          </div>
        </div>
        <div className="bg-green-100 p-5 rounded-lg border shadow-sm flex items-center gap-4">
          <Calendar size={40} className="text-green-600" />
          <div>
            <h3 className="text-sm text-gray-600">Tổng số lịch thi</h3>
            <p className="text-2xl font-semibold text-green-800">
              {stats.exams}
            </p>
          </div>
        </div>
        <div className="bg-yellow-100 p-5 rounded-lg border shadow-sm flex items-center gap-4">
          <ClipboardList size={40} className="text-yellow-600" />
          <div>
            <h3 className="text-sm text-gray-600">Tổng số kế hoạch học kỳ</h3>
            <p className="text-2xl font-semibold text-yellow-800">
              {stats.plans}
            </p>
          </div>
        </div>
      </div>

      {/* Biểu đồ */}
      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="text-blue-600" /> Trạng thái học kỳ ({role})
        </h2>

        {planData.length === 0 ? (
          <p className="text-gray-500 italic text-center">
            Chưa có dữ liệu kế hoạch.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={planData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

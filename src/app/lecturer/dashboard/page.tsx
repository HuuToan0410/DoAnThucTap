"use client";

import Protected from "@/components/Protected";
import { useEffect, useState } from "react";
import { BookOpen, Calendar, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

export default function LecturerDashboard() {
  const [stats, setStats] = useState({ classes: 0, exams: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [timetableRes, examRes] = await Promise.all([
        fetch("/api/timetable").then((r) => r.json()),
        fetch("/api/exam").then((r) => r.json()),
      ]);
      setStats({
        classes: timetableRes.length,
        exams: examRes.length,
      });
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) return <p className="text-center py-6">Đang tải dữ liệu...</p>;

  const cards = [
    {
      label: "Tổng số buổi giảng dạy",
      value: stats.classes,
      icon: BookOpen,
      color: "from-purple-400 to-purple-600",
    },
    {
      label: "Tổng số lịch thi phụ trách",
      value: stats.exams,
      icon: Calendar,
      color: "from-pink-400 to-pink-600",
    },
  ];

  return (
    <Protected allowedRoles={["LECTURER"]}>
      <div className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 flex items-center gap-2">
          <LayoutDashboard /> Bảng thống kê giảng viên
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className={`p-5 rounded-xl bg-gradient-to-br ${card.color} text-white flex justify-between items-center shadow-md`}
            >
              <div>
                <p className="text-sm opacity-80">{card.label}</p>
                <p className="text-3xl font-semibold">{card.value}</p>
              </div>
              <card.icon size={40} className="opacity-90" />
            </motion.div>
          ))}
        </div>
      </div>
    </Protected>
  );
}

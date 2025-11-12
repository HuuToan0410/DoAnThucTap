"use client";

import Protected from "@/components/Protected";
import { useEffect, useState } from "react";
import { BookOpen, Calendar, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

export default function StudentDashboard() {
  const [stats, setStats] = useState({ timetables: 0, exams: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [timetableRes, examRes] = await Promise.all([
        fetch("/api/timetable").then((r) => r.json()),
        fetch("/api/exam").then((r) => r.json()),
      ]);
      setStats({
        timetables: timetableRes.length,
        exams: examRes.length,
      });
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) return <p className="text-center py-6">Đang tải dữ liệu...</p>;

  const cards = [
    {
      label: "Số buổi học trong tuần",
      value: stats.timetables,
      icon: BookOpen,
      color: "from-blue-400 to-blue-600",
    },
    {
      label: "Số lịch thi sắp tới",
      value: stats.exams,
      icon: Calendar,
      color: "from-green-400 to-green-600",
    },
  ];

  return (
    <Protected allowedRoles={["STUDENT"]}>
      <div className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 flex items-center gap-2">
          <LayoutDashboard /> Bảng thống kê sinh viên
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

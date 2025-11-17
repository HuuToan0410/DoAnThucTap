"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  BookOpen,
  Calendar,
  ClipboardList,
  TrendingUp,
  PieChart as PieChartIcon,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    timetables: 0,
    exams: 0,
    plans: 0,
  });
  const [planData, setPlanData] = useState<any[]>([]);

  // Fetch data from API
  useEffect(() => {
    const fetchStats = async () => {
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

      const summary = [
        {
          name: "Đang học",
          value: planRes.filter((p: any) => p.status === "Đang học").length,
        },
        {
          name: "Sắp tới",
          value: planRes.filter((p: any) => p.status === "Sắp tới").length,
        },
        {
          name: "Đã kết thúc",
          value: planRes.filter((p: any) => p.status === "Đã kết thúc").length,
        },
      ];
      setPlanData(summary);
    };

    fetchStats();
  }, []);

  const colors = ["#3b82f6", "#facc15", "#22c55e"];

  const cards = [
    {
      label: "Tổng số lịch học",
      value: stats.timetables,
      icon: BookOpen,
      color: "from-blue-400 to-blue-600",
    },
    {
      label: "Tổng số lịch thi",
      value: stats.exams,
      icon: Calendar,
      color: "from-green-400 to-green-600",
    },
    {
      label: "Tổng số kế hoạch học kỳ",
      value: stats.plans,
      icon: ClipboardList,
      color: "from-yellow-400 to-yellow-600",
    },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
      <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-6">
        Bảng thống kê tổng hợp
      </h1>

      {/* ===== Cards thống kê ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ scale: 1.03 }}
            className={`p-5 rounded-xl shadow-md bg-gradient-to-br ${card.color} text-white flex justify-between items-center`}
          >
            <div>
              <p className="text-sm font-medium opacity-90">{card.label}</p>
              <p className="text-3xl font-bold mt-2">
                <CountUp end={card.value} duration={2} />
              </p>
            </div>
            <card.icon size={40} className="opacity-80" />
          </motion.div>
        ))}
      </div>

      {/* ===== Biểu đồ ===== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 border dark:border-gray-700 p-6 rounded-xl shadow-sm"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700 dark:text-gray-100">
          <PieChartIcon className="text-blue-500" /> Tỉ lệ trạng thái học kỳ
        </h2>

        {planData.length === 0 ? (
          <p className="text-gray-500 italic text-center">
            Chưa có dữ liệu kế hoạch.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={planData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(props: any) => {
                  const { name, percent } = props;
                  return `${name} ${(percent * 100).toFixed(0)}%`;
                }}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {planData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </motion.div>
    </div>
  );
}

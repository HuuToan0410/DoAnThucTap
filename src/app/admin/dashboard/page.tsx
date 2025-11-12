"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboards/DashboardLayout";
import Protected from "@/components/Protected";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ timetables: 0, exams: 0, plans: 0 });
  const [planData, setPlanData] = useState<{ name: string; value: number }[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
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
        { name: "Đang học", value: planRes.filter((p: any) => p.status === "Đang học").length },
        { name: "Sắp tới", value: planRes.filter((p: any) => p.status === "Sắp tới").length },
        { name: "Đã kết thúc", value: planRes.filter((p: any) => p.status === "Đã kết thúc").length },
      ]);
    };

    fetchData();
  }, []);

  return (
    <Protected allowedRoles={["ADMIN"]}>
      <DashboardLayout title="Bảng thống kê tổng hợp" stats={stats} planData={planData} role="ADMIN" />
    </Protected>
  );
}

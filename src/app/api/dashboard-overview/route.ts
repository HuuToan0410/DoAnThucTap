// src/app/api/dashboard-overview/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Timetable from "@/models/Timetable";
import Exam from "@/models/Exam";
import Plan from "@/models/Plan";

// Cache this endpoint for 60s
export const revalidate = 60;

export async function GET() {
  await dbConnect();

  const [timetablesCount, examsCount, plans] = await Promise.all([
    Timetable.countDocuments().lean(),
    Exam.countDocuments().lean(),
    Plan.find().lean(),
  ]);

  return NextResponse.json({
    timetablesCount,
    examsCount,
    plans,
  });
}

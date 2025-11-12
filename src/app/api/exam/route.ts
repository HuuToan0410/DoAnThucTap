import { dbConnect } from "@/lib/db";
import Exam from "@/models/Exam";
import { NextResponse } from "next/server";

// Lấy danh sách tất cả lịch thi
export async function GET() {
  await dbConnect();
  const exams = await Exam.find();
  return NextResponse.json(exams);
}

// Tạo mới một lịch thi
export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const newExam = await Exam.create(data);
  return NextResponse.json(newExam);
}

// (Tuỳ chọn) Xóa theo ID
export async function DELETE(req: Request) {
  await dbConnect();
  const { id } = await req.json();
  await Exam.findByIdAndDelete(id);
  return NextResponse.json({ message: "Đã xóa thành công" });
}

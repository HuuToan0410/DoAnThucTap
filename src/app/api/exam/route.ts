import { dbConnect } from "@/lib/db";
import Exam from "@/models/Exam";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export const revalidate = 60;


async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
}
// Lấy danh sách tất cả lịch thi
export async function GET() {
  await dbConnect();
  const exams = await Exam.find();
  return NextResponse.json(exams);
}

// Tạo mới một lịch thi
export async function POST(req: Request) {

  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  await dbConnect();
  const data = await req.json();
  const newExam = await Exam.create(data);
  return NextResponse.json(newExam);
}

// (Tuỳ chọn) Xóa theo ID
export async function DELETE(req: Request) {

  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  await dbConnect();
  const { id } = await req.json();
  await Exam.findByIdAndDelete(id);
  return NextResponse.json({ message: "Đã xóa thành công" });
}

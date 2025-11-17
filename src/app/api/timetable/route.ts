import { dbConnect } from "@/lib/db";
import Timetable from "@/models/Timetable";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export const revalidate = 60;


async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 403 });
  }
  return null;
}
// GET
export async function GET() {
  await dbConnect();
  const timetables = await Timetable.find();
  return NextResponse.json(timetables);
}

// POST
export async function POST(req: Request) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  await dbConnect();
  const data = await req.json();
  const newItem = await Timetable.create(data);
  return NextResponse.json(newItem);
}

// PUT (Cập nhật)
export async function PUT(req: Request) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  await dbConnect();
  const { id, ...updatedData } = await req.json();
  const updatedItem = await Timetable.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return NextResponse.json(updatedItem);
}

// DELETE
export async function DELETE(req: Request) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  await dbConnect();
  const { id } = await req.json();
  await Timetable.findByIdAndDelete(id);
  return NextResponse.json({ message: "Đã xóa thành công" });
}

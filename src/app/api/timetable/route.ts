import { dbConnect } from "@/lib/db";
import Timetable from "@/models/Timetable";
import { NextResponse } from "next/server";

// GET
export async function GET() {
  await dbConnect();
  const timetables = await Timetable.find();
  return NextResponse.json(timetables);
}

// POST
export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const newItem = await Timetable.create(data);
  return NextResponse.json(newItem);
}

// PUT (Cập nhật)
export async function PUT(req: Request) {
  await dbConnect();
  const { id, ...updatedData } = await req.json();
  const updatedItem = await Timetable.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return NextResponse.json(updatedItem);
}

// DELETE
export async function DELETE(req: Request) {
  await dbConnect();
  const { id } = await req.json();
  await Timetable.findByIdAndDelete(id);
  return NextResponse.json({ message: "Đã xóa thành công" });
}

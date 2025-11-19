import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  await dbConnect();

  // ✅ getServerSession phải đặt bên trong POST
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Chưa đăng nhập" },
      { status: 401 }
    );
  }

  const { email, name, password, role } = await req.json();

  // Kiểm tra quyền tạo ADMIN
  if (role === "ADMIN" && session.user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Không có quyền tạo admin" },
      { status: 403 }
    );
  }

  // Kiểm tra email tồn tại
  const exists = await User.findOne({ email });
  if (exists) {
    return NextResponse.json(
      { ok: false, message: "Email đã tồn tại" },
      { status: 400 }
    );
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Tạo user mới
  const user = await User.create({
    email,
    name,
    passwordHash,
    role,
  });

  return NextResponse.json({ ok: true, user });
}

export async function GET() {
  await dbConnect();

  const users = await User.find().lean();
  return NextResponse.json({ ok: true, users });
}

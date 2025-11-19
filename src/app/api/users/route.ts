import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { email, name, password, role } = await req.json();

  // --- Kiểm tra nếu database chưa có user nào ---
  const userCount = await User.countDocuments();

  // Nếu chưa có ai => cho phép tạo ADMIN đầu tiên
  if (userCount === 0) {
    if (role !== "ADMIN") {
      return NextResponse.json(
        { error: "User đầu tiên phải là ADMIN" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const admin = await User.create({
      email,
      name,
      passwordHash,
      role: "ADMIN",
    });

    return NextResponse.json({
      ok: true,
      message: "Tạo ADMIN đầu tiên thành công",
      user: admin,
    });
  }

  // --- Nếu đã có user trong database -> yêu cầu đăng nhập ---
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Chưa đăng nhập" },
      { status: 401 }
    );
  }

  // Chỉ ADMIN được tạo tài khoản ADMIN mới
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

  const passwordHash = await bcrypt.hash(password, 10);

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

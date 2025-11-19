import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  await dbConnect();

  const session = await auth(); 

  const { email, name, password, role } = await req.json();

  const userCount = await User.countDocuments();

  if (userCount > 0 && !session) {
    return NextResponse.json(
      { error: "Chưa đăng nhập" },
      { status: 401 }
    );
  }

  if (role === "ADMIN" && session?.user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Không có quyền tạo admin" },
      { status: 403 }
    );
  }

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

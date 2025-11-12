import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { email, name, password, role } = await req.json();

  const exists = await User.findOne({ email });
  if (exists) {
    return NextResponse.json({ ok: false, message: "Email đã tồn tại" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, name, passwordHash, role });
  return NextResponse.json({ ok: true, user });
}

export async function GET() {
  await dbConnect();
  const users = await User.find().lean();
  return NextResponse.json({ ok: true, users });
}

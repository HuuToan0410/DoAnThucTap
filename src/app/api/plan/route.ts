import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import Plan from "@/models/Plan";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 403 });
  }

  await dbConnect();
  const data = await req.json();
  const plan = await Plan.create(data);

  return NextResponse.json(plan);
}

export async function GET() {
  await dbConnect();
  const plans = await Plan.find();
  return NextResponse.json(plans);
}

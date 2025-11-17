import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import mongoose from "mongoose";

export async function GET() {
  try {
    const conn = await dbConnect();
    const dbName = conn.connection?.db?.databaseName || "unknown";

    return NextResponse.json({
      ok: true,
      message: `✅ Connected to ${dbName}`,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "❌ Connection failed" },
      { status: 500 }
    );
  }
}

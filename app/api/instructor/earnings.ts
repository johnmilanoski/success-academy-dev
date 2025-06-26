import { NextRequest, NextResponse } from "next/server";
import repo from "@/lib/repo";

export async function GET(req: NextRequest) {
  const instructorId = Number(req.cookies.get("instructor_id")?.value);
  if (!instructorId) return NextResponse.json({ error: "Auth" }, { status: 401 });

  const total = await repo.instructorEarnings(instructorId);
  return NextResponse.json({ success: true, total });
}

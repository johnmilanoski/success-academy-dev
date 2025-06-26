import { NextRequest, NextResponse } from "next/server";
import repo from "@/lib/repo";

export async function GET(req: NextRequest) {
  const userId = Number(req.cookies.get("instructor_id")?.value);
  if (!userId) return NextResponse.json({ error: "Auth" }, { status: 401 });

  const list = await repo.listInstructorCourses(userId);
  return NextResponse.json({ success: true, courses: list });
}

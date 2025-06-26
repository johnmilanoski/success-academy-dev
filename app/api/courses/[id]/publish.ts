import { NextRequest, NextResponse } from "next/server";
import repo from "@/lib/repo";

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const userId = Number(_req.cookies.get("instructor_id")?.value);
  if (!userId) return NextResponse.json({ error: "Auth" }, { status: 401 });

  await repo.publishCourse(Number(params.id));
  return NextResponse.json({ success: true });
}

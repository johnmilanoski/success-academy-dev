import repo from "@/lib/repo";
import { NextResponse } from "next/server";

export async function GET() {
  const courses = await repo.catalog();
  const categories = [...new Set(courses.map(c => c.category))];
  return NextResponse.json({ success: true, data: categories });
}

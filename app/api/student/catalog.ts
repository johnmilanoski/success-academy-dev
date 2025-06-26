import repo from "@/lib/repo";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await repo.catalog();
  return NextResponse.json({ success: true, data });
}

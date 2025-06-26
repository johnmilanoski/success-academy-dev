import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });
  // delete only takes the cookie name
  res.cookies.delete("instructor_id");
  return res;
}

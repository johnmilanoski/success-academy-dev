import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import repo from "@/lib/repo";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: "Invalid" }, { status: 400 });

  const { email, password } = parsed.data;
  const user = await repo.findInstructorByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password_hash)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const res = NextResponse.json({ success: true });
  res.cookies.set("instructor_id", String(user.id), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  return res;
}

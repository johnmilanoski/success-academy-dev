import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import repo from "@/lib/repo";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });

  const { name, email, password } = parsed.data;
  const existing = await repo.findInstructorByEmail(email);
  if (existing)
    return NextResponse.json({ error: "Email exists" }, { status: 409 });

  const hash = await bcrypt.hash(password, 10);
  const user = await repo.createInstructor(name, email, hash);

  const res = NextResponse.json({ success: true });
  res.cookies.set("instructor_id", String(user.id), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  return res;
}

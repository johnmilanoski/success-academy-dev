import { NextRequest, NextResponse } from "next/server";
import repo from "@/lib/repo";
import * as z from "zod";

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string(),
  price: z.number().nonnegative(),
});

export async function POST(req: NextRequest) {
  const userId = Number(req.cookies.get("instructor_id")?.value);
  if (!userId) return NextResponse.json({ error: "Auth" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: "Invalid" }, { status: 400 });

  const course = await repo.createCourse({
    instructor_id: userId,
    ...parsed.data,
    visibility: true,
    published: false,
  });
  return NextResponse.json({ success: true, course });
}

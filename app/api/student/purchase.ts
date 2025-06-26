import { NextRequest, NextResponse } from "next/server";
import { pay } from "@/lib/payments";
import repo from "@/lib/repo";
import * as z from "zod";

const schema = z.object({ student_id: z.number(), course_id: z.number() });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });

  const { student_id, course_id } = parsed.data;
  // price lookup ­– for brevity assume $20
  const amountCents = 2000;
  const payment = await pay(amountCents);
  if (payment.status !== "succeeded")
    return NextResponse.json({ error: "Payment failed" }, { status: 402 });

  await repo.recordPurchase(student_id, course_id, amountCents / 100);
  return NextResponse.json({ success: true, payment });
}

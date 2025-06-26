"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const [courseId, setCourseId] = useState(1);
  const [studentId, setStudentId] = useState(1);
  const router = useRouter();

  const handlePay = async () => {
    const res = await fetch("/api/student/purchase", {
      method: "POST",
      body: JSON.stringify({ student_id: studentId, course_id: courseId }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) router.push("/purchase/success");
    else alert("Payment failed");
  };

  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-2xl font-bold">Checkout (Mock)</h1>
      <label className="block">
        Course ID
        <input
          value={courseId}
          onChange={(e) => setCourseId(Number(e.target.value))}
          type="number"
          className="w-full rounded border px-2 py-1"
        />
      </label>
      <label className="block">
        Student ID
        <input
          value={studentId}
          onChange={(e) => setStudentId(Number(e.target.value))}
          type="number"
          className="w-full rounded border px-2 py-1"
        />
      </label>
      <button onClick={handlePay} className="rounded bg-blue-600 px-4 py-2 text-white">
        Pay $20
      </button>
    </div>
  );
}

"use client";
import CourseCard from "@/components/CourseCard";
import { useState, useEffect } from "react";

export default function Catalog() {
  const [data, setData] = useState<{ id: number; title: string; price: number }[]>(
    [],
  );
  useEffect(() => {
    fetch("/api/student/catalog")
      .then((r) => r.json())
      .then((d) => setData(d.data));
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Catalog</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((c) => (
          <CourseCard key={c.id} title={c.title} price={c.price} />
        ))}
      </div>
    </div>
  );
}

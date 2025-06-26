"use client";
import { useEffect, useState } from "react";

interface Course {
  id: number;
  title: string;
  price: number;
  published_at?: string | null;
}

export default function MyCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    fetch("/api/instructor/courses")
      .then((r) => r.json())
      .then((d) => setCourses(d.courses));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">My Courses</h1>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left">
            <th className="p-2">Title</th>
            <th className="p-2">Price</th>
            <th className="p-2">Published</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-2">{c.title}</td>
              <td className="p-2">${c.price}</td>
              <td className="p-2">{c.published_at ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

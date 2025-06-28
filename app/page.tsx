"use client";
import { useState, useEffect } from "react";
import CourseCard from "@/components/CourseCard";
import type { Course } from "@/lib/models";

export default function Page() {
  const [topCourses, setTopCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/courses/top")
      .then((res) => res.json())
      .then((data) => setTopCourses(data.data));

    fetch("/api/courses/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
        setActiveCategory(data.data[0]);
      });

    fetch("/api/student/catalog")
      .then((res) => res.json())
      .then((data) => setCourses(data.data));
  }, []);

  const filteredCourses = activeCategory
    ? courses.filter((c) => c.category === activeCategory)
    : courses;

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-4">Top Courses</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {topCourses.map((c) => (
            <CourseCard key={c.id} title={c.title} price={c.price} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex border-b mb-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 text-sm font-medium ${
                activeCategory === category
                  ? "border-b-2 border-brand-primary text-brand-primary"
                  : "text-slate-500 hover:text-brand-primary"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredCourses.slice(0, 4).map((c) => (
            <CourseCard key={c.id} title={c.title} price={c.price} />
          ))}
        </div>
      </section>
    </div>
  );
}

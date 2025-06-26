import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="hidden w-56 flex-shrink-0 bg-slate-50 p-4 lg:block">
      <nav className="space-y-2 text-sm">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Instructor
        </h3>
        <Link href="/instructor/dashboard" className="block rounded px-2 py-1 hover:bg-slate-100">
          Dashboard
        </Link>
        <Link href="/create-course/step-1-details" className="block rounded px-2 py-1 hover:bg-slate-100">
          Create Course
        </Link>
        <Link href="/instructor/courses" className="block rounded px-2 py-1 hover:bg-slate-100">
          My Courses
        </Link>

        <h3 className="mb-2 mt-6 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Student
        </h3>
        <Link href="/student/catalog" className="block rounded px-2 py-1 hover:bg-slate-100">
          Catalog
        </Link>
        <Link href="/student/dashboard" className="block rounded px-2 py-1 hover:bg-slate-100">
          My Learning
        </Link>
      </nav>
    </aside>
  );
}

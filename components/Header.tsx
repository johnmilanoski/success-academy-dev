import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-slate-800 px-6 py-3 text-white">
      <Link href="/" className="text-xl font-bold">
        Success.Acad
      </Link>
      <nav className="space-x-4">
        <Link href="/instructor/dashboard" className="hover:underline">
          Instructor
        </Link>
        <Link href="/student/dashboard" className="hover:underline">
          Student
        </Link>
      </nav>
    </header>
  );
}

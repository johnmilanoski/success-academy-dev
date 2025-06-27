import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b bg-brand-surface/80 px-6 py-3 backdrop-blur">
      <Link href="/" className="text-xl font-bold">
        Success.Acad
      </Link>
      <nav className="hidden md:flex space-x-6 text-sm">
        <Link href="/student/catalog" className="hover:underline">
          Catalog
        </Link>
        <Link href="/pricing" className="hover:underline">
          Pricing
        </Link>
        <Link href="/faq" className="hover:underline">
          FAQ
        </Link>
      </nav>
      <div>
        <Link href="/login" className="hover:underline text-sm">
          Login
        </Link>
      </div>
    </header>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-surface-alt border-t py-6 text-sm text-center mt-auto">
      <div className="container mx-auto space-y-4">
        <div className="flex justify-center space-x-6">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/legal" className="hover:underline">
            Legal
          </Link>
        </div>
        <p className="text-slate-500">&copy; {new Date().getFullYear()} Success Academy</p>
      </div>
    </footer>
  );
}

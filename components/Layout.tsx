"use client";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noSidebarRoutes = ["/", "/checkout", "/create-course"];

  const showSidebar =
    !noSidebarRoutes.includes(pathname) &&
    !pathname.startsWith("/create-course");

  return (
    <div className="min-h-screen flex flex-col bg-brand-surface text-brand-text">
      <Header />
      <div className="flex flex-1">
        {showSidebar && <Sidebar />}
        <main className="flex-1 p-6">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

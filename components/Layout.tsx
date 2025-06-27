import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-brand-surface text-brand-text">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
      <Footer />
    </div>
  );
}

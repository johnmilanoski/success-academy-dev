import "@/app/globals.css";
import Layout from "@/components/Layout";
import localFont from "next/font/local";

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "Success Academy",
  description: "Multi-tenant course platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}> 
      <body className="font-sans">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

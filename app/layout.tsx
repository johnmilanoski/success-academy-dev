import "@/app/globals.css";
import Layout from "@/components/Layout";

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
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

// import { Navbar } from "@/components/shared/Navbar";
// import { Footer } from "@/components/shared/Footer";

import { Footer } from "@/components/shared/Footer/Footer";
import { Navbar } from "@/components/shared/Navbar/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background font-sans antialiased">
      {/* Public Top Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">{children}</main>

      {/* Public Footer */}
      <Footer />
    </div>
  );
}

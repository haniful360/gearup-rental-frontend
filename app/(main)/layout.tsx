import { Footer } from "@/components/shared/Footer/Footer";
import { NavbarWrapper } from "@/components/shared/Navbar/NavbarWrapper";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background font-sans antialiased">
      <NavbarWrapper />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GearUp | Rent Sports & Outdoor Gear Instantly",
  description:
    "Rent sports and outdoor equipment easily or list your own gear.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} min-h-full bg-background text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

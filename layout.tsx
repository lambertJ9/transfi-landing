import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transfi.app",
  description: "Borderless payments, designed for trust.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

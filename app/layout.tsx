import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Travel App Prototype",
  description: "Sketch-inspired travel UI prototype"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

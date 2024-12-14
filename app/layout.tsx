import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const clash = localFont({
  src: "./ClashGrotesk-Variable.woff2",
});

export const metadata: Metadata = {
  title: "Anas Zouaoui",
  description: "Anas Zouoaui's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${clash.className} antialiased`}>
        <main className={`${clash.className} antialiased`}>{children}</main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import { NAME } from "@/lib/constants";

const myFont = localFont({
  src: './fonts/Noto-Regular.ttf',
  display: 'swap', // Recommended to prevent invisible text while loading
});

export const metadata = {
  title: NAME,
  description: 'App with a custom local font',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 2. Apply the font class to the html or body tag globally
    <html lang="en" className={myFont.className} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
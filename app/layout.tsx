import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import { DESCRIPTION, KEYWORDS, NAME, WEBSITE } from "@/lib/constants";

const myFont = localFont({
  src: './fonts/Noto-Regular.ttf',
  display: 'swap', 
});

// FIX 1: Ensured the fallback WEBSITE constant has a proper protocol (http/https) in your constants file
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || WEBSITE;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  
  title: {
    default: `${NAME} | Portfolio`,
    template: `%s | ${NAME}`, 
  },
  
  // FIX 2: Removed "Portfolio of Ethan McIntyre." if your DESCRIPTION constant already includes your name naturally
  description: DESCRIPTION,
  
  keywords: KEYWORDS,
  
  authors: [{ name: `${NAME}`, url: SITE_URL }],
  creator: `${NAME}`,
  
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: `${NAME} | Portfolio`,
    description: DESCRIPTION,
    siteName: `${NAME} Portfolio`,
    images: [
      {
        url: "/MACC_BANNER.png", 
        width: 1200,
        height: 630,
        alt: `${NAME} Portfolio Preview`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${NAME} | Portfolio`,
    description: DESCRIPTION,
    images: ["/MACC_BANNER.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "z-pAqW-s2EIANRpdmUyZyXZWJYeeHwkKENFXZCplUkk",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={myFont.className} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
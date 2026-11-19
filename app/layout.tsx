import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import { DESCRIPTION, NAME, WEBSITE } from "@/lib/constants";

const myFont = localFont({
  src: './fonts/Noto-Regular.ttf',
  display: 'swap', 
});

const TITLE = `${NAME} | Accounting, Airtable & Small Business Consultant`;

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE),
  
  title: {
    default: TITLE,
    template: `%s | ${NAME}`, 
  },
  
  description: DESCRIPTION,
  
  alternates: { canonical: "/" },

  authors: [{ name: `${NAME}`, url: WEBSITE }],
  creator: `${NAME}`,
  
  openGraph: {
    type: "website",
    locale: "en_US",
    url: WEBSITE,
    title: TITLE,
    description: DESCRIPTION,
    siteName: `${NAME} Portfolio`,
    images: [
      {
        url: "/MACC_BANNER.jpg", 
        width: 1200,
        height: 630,
        alt: `${NAME} Portfolio Preview`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/MACC_BANNER.jpg"],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={myFont.className} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
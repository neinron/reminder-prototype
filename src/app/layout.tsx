import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Albert_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wemolo",
  description: "Wemolo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="Wemolo Parkzeit Erinnerung" />
        <meta property="og:description" content="Nie wieder Strafzettel! Lass dich per SMS oder WhatsApp rechtzeitig an das Ende deiner Parkzeit erinnern!" />
        <meta property="og:image" content="/wemolo-meta.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://reminder.wemolo.com" />
      </head>
      <body
        className={`${albertSans.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <div className="flex items-center justify-between w-full px-6">
          <Link href="/">
            <img src="/logo-wemolo-black@4x.png" alt="Wemolo Logo" style={{height: "auto", width: 200, cursor: 'pointer'}} />
          </Link>
          <img src="/DEKRA Standard.png" alt="DEKRA" style={{height: 130, width: "auto"}} />
        </div>
        <div className="flex-1 w-full">{children}</div>
        <footer className="w-full h-[149px] bg-black flex flex-col justify-between px-6 py-4">
          <div className="flex flex-col items-center">
            {/* Logo links oben */}
            <div className="flex flex-col items-center z-10 mt-4">
              <a href="/">
                <img src="/logo-wemolo-white@4x.png" alt="Wemolo Logo" style={{height: "auto", width: 170, marginBottom: 16, cursor: 'pointer'}} />
              </a>
              <span className="text-xs text-white mb-0"> 2025 Wemolo GmbH</span>
            </div>
          </div>
          <div className="flex flex-col items-center w-full mt-4">
            <div className="flex flex-row items-center justify-center gap-6">
              <a href="/impressum" className="text-xs text-white hover:text-gray-300 transition-colors px-2 mb-6">Impressum</a>
              <a href="/datenschutz" className="text-xs text-white hover:text-gray-300 transition-colors px-2 mb-6">Datenschutz</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

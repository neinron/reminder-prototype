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
        <meta property="og:url" content="https://wemolo-reminders.vercel.app" />
      </head>
      <body
        className={`${albertSans.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <div className="pt-8 pl-8">
          <Link href="/">
            <img src="/logo-wemolo-black@4x.png" alt="Wemolo Logo" style={{height: "auto", width: 124, cursor: 'pointer'}} />
          </Link>
        </div>
        <div className="flex-1 w-full mt-8">{children}</div>
        <footer className="w-full h-[149px] bg-black flex flex-col justify-between px-6 py-4">
  <div className="relative flex items-start w-full h-full">
    {/* Logo links oben */}
    <div className="flex flex-col z-10">
      <a href="/">
        <img src="/logo-wemolo-white@4x.png" alt="Wemolo Logo" style={{height: "auto", width: 124, marginBottom: 16, cursor: 'pointer'}} />
      </a>
      <span className="text-xs text-white mt-10 block"> 2025 Wemolo GmbH</span>
    </div>
    {/* Links exakt zentriert im Footer */}
    <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-[40%] flex flex-row items-center justify-center gap-4 px-2">
      <a href="/impressum" className="text-xs text-white hover:text-gray-300 transition-colors px-2">Impressum</a>
      <a href="/datenschutz" className="text-xs text-white hover:text-gray-300 transition-colors px-2">Datenschutz</a>
    </div>
    {/* Rechts bleibt leer, für optische Balance */}
    <div className="flex-1" />
  </div>
</footer>
      </body>
    </html>
  );
}

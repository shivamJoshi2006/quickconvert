import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import { ToastProvider } from "@/lib/toast-provider";
import { ToastContainer } from "@/components/ToastContainer";
import { PWAInstaller } from "@/components/PWAInstaller";
import { SiteFooter } from "@/components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuickConvert - JSON ↔ CSV Converter",
  description:
    "QuickConvert — Fast, private file format conversion in your browser. Convert JSON to CSV and CSV to JSON instantly. No uploads, no tracking, completely free.",
  verification: {
    google: "wNLLBArcWl7sYcxO5vyOCsUDzp8z0rDW9PsHRV3CFq8",
  },
  keywords: [
    "JSON to CSV converter",
    "CSV to JSON tool",
    "online file converter",
    "data format conversion",
    "browser-based converter",
    "privacy-first conversion",
  ],
  metadataBase: new URL("https://quickconvert.dev"),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "QuickConvert",
  },
  openGraph: {
    title: "QuickConvert - Fast File Conversion",
    description: "Convert JSON to CSV and CSV to JSON instantly in your browser",
    url: "https://quickconvert.dev",
    siteName: "QuickConvert",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickConvert - JSON ↔ CSV",
    description: "Fast, private file format conversion in your browser",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content="wNLLBArcWl7sYcxO5vyOCsUDzp8z0rDW9PsHRV3CFq8"
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' fill='%23000'>⚡</text></svg>" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50`}
      >
        <ThemeProvider>
          <ToastProvider>
            <PWAInstaller />
            {children}
            <SiteFooter />
            <ToastContainer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import "../styles/enhanced.css";

// ── Fonts ────────────────────────────────────────────────────────────────────
// Inter is the primary UI font (variable font — no weight needed)
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Poppins is used for headings in several themes
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

// Playfair Display is used for luxury/editorial themes
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "GetEasyCV - Professional Resume Builder",
  description:
    "Create professional resumes with our easy-to-use resume builder. Choose from ATS-friendly templates, customize easily, and export as PDF in minutes.",
  keywords: "resume builder, CV maker, ATS friendly resume, professional resume templates",
  authors: [{ name: "GetEasyCV Team" }],
  openGraph: {
    title: "GetEasyCV - Professional Resume Builder",
    description: "Build your professional resume in minutes with our drag-and-drop editor and expert-designed templates.",
    url: "https://geteasycv.com",
    siteName: "GetEasyCV",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GetEasyCV - Professional Resume Builder",
    description: "Build your professional resume in minutes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${inter.variable} ${poppins.variable} ${playfairDisplay.variable}`}
      suppressHydrationWarning
    >
      {/*
       * bg-slate-50 is the canonical background for this project.
       * globals.css sets the same value (#f8fafc) on body directly —
       * the Tailwind class here keeps Tailwind-generated purge working
       * and removes the previous bg-gray-50 mismatch.
       */}
      <body className="min-h-full flex flex-col bg-slate-50">{children}</body>
    </html>
  );
}

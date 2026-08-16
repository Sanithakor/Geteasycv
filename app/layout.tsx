import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import "../styles/enhanced.css";

// ── Fonts ────────────────────────────────────────────────────────────────────
// Single global Roboto font loader for Turbopack & Next.js
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
  variable: "--font-roboto",
  fallback: ["system-ui", "sans-serif"],
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
      className={`h-full antialiased ${roboto.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-slate-50 font-roboto">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import "../styles/enhanced.css";

export const metadata: Metadata = {
  title: "GetEasyCV - Professional Resume Builder",
  description: "Create professional resumes with our easy-to-use resume builder. Choose from 200+ templates and export as PDF.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-gray-50">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import "../styles/enhanced.css";
import AuthModal from "@/components/auth/AuthModal";
import { OrganizationSchema, SoftwareAppSchema } from "@/components/seo/SchemaOrg";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.geteasycv.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Free ATS Resume Builder & Professional CV Maker | GetEasyCV",
    template: "%s | GetEasyCV",
  },
  description:
    "Build a recruiter-approved resume in 10 minutes. Clean formatting, ATS-tested templates, and instant PDF download with zero layout shifts.",
  keywords: [
    "resume builder",
    "free CV maker",
    "ATS friendly resume templates",
    "professional resume builder",
    "ATS checker",
    "resume PDF download",
  ],
  authors: [{ name: "GetEasyCV Team", url: baseUrl }],
  creator: "GetEasyCV",
  publisher: "GetEasyCV",
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Free ATS Resume Builder & Professional CV Maker | GetEasyCV",
    description: "Build a recruiter-approved resume in minutes. Clean formatting, ATS-tested templates, and instant PDF download.",
    url: baseUrl,
    siteName: "GetEasyCV",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/images/templates/modern_professional.png`,
        width: 1200,
        height: 630,
        alt: "GetEasyCV Professional Resume Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free ATS Resume Builder & Professional CV Maker | GetEasyCV",
    description: "Build a recruiter-approved resume in minutes with ATS-tested templates.",
    images: [`${baseUrl}/images/templates/modern_professional.png`],
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
      <body className="min-h-full flex flex-col bg-slate-50 font-sans">
        <OrganizationSchema />
        <SoftwareAppSchema />
        {children}
        <AuthModal />
      </body>
    </html>
  );
}

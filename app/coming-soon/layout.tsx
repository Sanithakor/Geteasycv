import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "We're Getting Ready — GetEasyCV",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

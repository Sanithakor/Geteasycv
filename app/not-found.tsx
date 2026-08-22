import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 – Page Not Found | GetEasyCV',
  description: 'The page you are looking for is not available.',
};

export default function NotFound() {
  return (
    <section className="min-h-screen bg-white flex items-center py-10 sm:py-12 lg:py-20">
      <div className="w-full max-w-[900px] mx-auto px-4 text-center">

        {/* Animated GIF background with 404 number overlaid */}
        <div
          className="flex h-[240px] items-center justify-center bg-contain bg-center bg-no-repeat sm:h-[300px] lg:h-[400px]"
          style={{
            backgroundImage:
              "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
          }}
          aria-hidden="true"
        >
          <h1 className="m-0 text-[48px] font-bold leading-none text-black sm:text-[60px] lg:text-[80px]">
            404
          </h1>
        </div>

        {/* Text content */}
        <div className="relative -mt-5 sm:-mt-7 lg:-mt-12">
          <h2 className="mb-3 text-[23px] font-bold leading-tight text-[#222] sm:text-[26px] lg:text-[32px]">
            Look like you&apos;re lost
          </h2>
          <p className="mb-6 text-[15px] leading-[1.6] text-[#666] sm:text-base">
            The page you are looking for is not available!
          </p>
          <Link
            href="/"
            className="inline-block rounded bg-[#FF570F] px-5 py-3 text-[15px] font-semibold leading-tight text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E04800] sm:px-6 sm:text-base"
          >
            Go to Home
          </Link>
        </div>

      </div>
    </section>
  );
}

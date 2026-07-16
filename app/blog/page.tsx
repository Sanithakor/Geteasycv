import Navigation from "@/components/Navigation";
import Link from "next/link";

export const metadata = {
  title: "Blog — GetEasyCV",
  description: "Resume tips, career advice, and product updates from the GetEasyCV team.",
};

// Placeholder posts — replace with CMS or DB fetch when content is ready.
const PLACEHOLDER_POSTS = [
  {
    slug: "#",
    title: "How to Write an ATS-Friendly Resume in 2024",
    excerpt:
      "Applicant Tracking Systems scan your resume before a human ever reads it. Here's how to make sure yours passes.",
    date: "Coming soon",
    tag: "Resume Tips",
  },
  {
    slug: "#",
    title: "The 5 Most Common Resume Mistakes (and How to Fix Them)",
    excerpt:
      "From generic objective statements to inconsistent formatting — avoid these pitfalls to stand out.",
    date: "Coming soon",
    tag: "Career Advice",
  },
  {
    slug: "#",
    title: "Introducing GetEasyCV Templates v2",
    excerpt:
      "We redesigned our entire template library with new layouts, themes, and ATS optimisations.",
    date: "Coming soon",
    tag: "Product Update",
  },
];

export default function BlogPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50">
        {/* Header */}
        <section className="bg-white border-b border-slate-100 py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Blog</h1>
            <p className="text-lg text-slate-600">
              Resume tips, career advice, and product updates from the GetEasyCV team.
            </p>
          </div>
        </section>

        {/* Posts */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          {/* Coming soon banner */}
          <div className="mb-10 p-4 rounded-xl bg-indigo-50 border border-indigo-100 text-center text-sm text-indigo-700 font-medium">
            Full blog coming soon — check back later for new articles.
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PLACEHOLDER_POSTS.map((post) => (
              <article
                key={post.title}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-3 hover:shadow-lg hover:border-indigo-200 transition-all"
              >
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 w-fit">
                  {post.tag}
                </span>
                <h2 className="text-lg font-bold text-slate-900 leading-snug">{post.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-auto">
                  <span className="text-xs text-slate-400">{post.date}</span>
                  <span className="text-xs text-indigo-400 font-medium">Coming soon</span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-slate-500 text-sm">
              Want to be notified when we publish?{" "}
              <Link href="/contact" className="text-indigo-600 hover:underline">
                Get in touch
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

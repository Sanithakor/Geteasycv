import Navigation from "@/components/Navigation";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg mb-6 animate-fadeIn">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-gray-700">200+ Professional Templates Available</span>
              </div>
              
              <h1 className="text-4xl font-bold mb-6 leading-tight sm:text-5xl lg:text-6xl">
                Build Your Dream Resume in{' '}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Minutes
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed sm:text-xl">
                Create professional, ATS-friendly resumes with our powerful builder. 
                Choose from 200+ templates, customize everything, and land your dream job.
              </p>
              
              <div className="flex flex-col gap-4 justify-center mb-12 sm:flex-row">
                <Link href="/templates">
                  <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-xl shadow-indigo-200 transform hover:scale-105">
                    Browse Templates
                  </button>
                </Link>
                <Link href="/editor">
                  <button className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-lg border border-gray-200">
                    Start Building
                  </button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6 text-center sm:gap-8">
                <div>
                  <div className="text-3xl font-bold text-indigo-600">200+</div>
                  <div className="text-sm text-gray-600">Templates</div>
                </div>
                <div className="hidden w-px h-12 bg-gray-200 sm:block"></div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">20</div>
                  <div className="text-sm text-gray-600">Layouts</div>
                </div>
                <div className="hidden w-px h-12 bg-gray-200 sm:block"></div>
                <div>
                  <div className="text-3xl font-bold text-pink-600">10</div>
                  <div className="text-sm text-gray-600">Themes</div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Why Choose Our Resume Builder?</h2>
              <p className="text-gray-600 text-lg">Everything you need to create a professional resume</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">200+ Templates</h3>
                <p className="text-gray-600">Choose from a vast collection of professional, ATS-friendly templates designed by experts.</p>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100 hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Live Editing</h3>
                <p className="text-gray-600">See your changes in real-time with our powerful live preview editor.</p>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-white border border-pink-100 hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-red-600 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Full Customization</h3>
                <p className="text-gray-600">Customize colors, fonts, layouts, and every detail to match your style.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-4xl font-bold mb-4">Simple Pricing</h2>
              <p className="text-gray-600 text-lg">Start for free, build confidently, and export when your resume is ready.</p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {['Starter', 'Professional', 'Career Pro'].map((plan, index) => (
                <div key={plan} className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg shadow-slate-100">
                  <h3 className="text-xl font-bold text-gray-900">{plan}</h3>
                  <p className="mt-2 text-gray-600">{index === 0 ? 'Explore templates and build your first resume.' : index === 1 ? 'Export polished resumes for active applications.' : 'Advanced customization for serious job searches.'}</p>
                  <div className="mt-6 text-3xl font-bold text-indigo-600">{index === 0 ? 'Free' : index === 1 ? '$9' : '$19'}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Build Your Resume?</h2>
            <p className="text-xl text-indigo-100 mb-8">Join thousands of job seekers who landed their dream jobs</p>
            <Link href="/templates">
              <button className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-xl transform hover:scale-105">
                Get Started for Free
              </button>
            </Link>
          </div>
        </section>
      </main>

    </>
  );
}

import Navigation from "@/components/Navigation";
import ReadyToBuild from "@/components/sections/ReadyToBuild";
import BlogSection from "@/components/sections/BlogSection";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  CheckCircle,
  Users,
  Globe,
  Clock,
  Shield,
  Zap,
  Heart,
  Target,
  Award,
  Sparkles,
  FileText,
  ArrowRight,
  Star,
  TrendingUp,
  Download,
  Eye,
  Briefcase,
  Database,
  Lock,
  UserCheck,
  Rocket,
  Trophy,
  Headphones,
  Building
} from "lucide-react";

export const metadata = {
  title: "About Us — GetEasyCV | Professional Resume Builder",
  description: "Learn about GetEasyCV's mission to help job seekers create professional, ATS-friendly resumes. Trusted by 50,000+ users worldwide.",
  keywords: "about geteasycv, resume builder company, professional resume templates, ATS-friendly resumes, career services",
};

export default function AboutPage() {
  const stats = [
    { label: "Active Job Seekers", value: "50,000+", icon: Users, change: "+12% this month" },
    { label: "Resumes Generated", value: "150,000+", icon: FileText, change: "Over 5k daily" },
    { label: "ATS Pass Rate", value: "96%", icon: CheckCircle, change: "Tested against Top ATS" },
    { label: "Global Coverage", value: "120+ Countries", icon: Globe, change: "Multi-language ready" },
  ];

  const values = [
    {
      icon: Target,
      title: "Career Empowerment",
      description: "We believe everyone deserves a fair chance at their dream job, regardless of their background or design skills."
    },
    {
      icon: Zap,
      title: "Efficiency First",
      description: "Building a professional resume shouldn't take hours. Our intuitive builder lets you finish in under 10 minutes."
    },
    {
      icon: Shield,
      title: "ATS Optimization",
      description: "Every template is engineered to pass Applicant Tracking Systems with flying colors, ensuring your resume gets read by humans."
    },
    {
      icon: Heart,
      title: "User-Centric Design",
      description: "We constantly refine our tools based on feedback from real recruiters and successful job seekers."
    }
  ];

  const milestones = [
    { year: "2023", title: "Founded", description: "GetEasyCV was launched with 5 basic templates and a vision to simplify resume creation." },
    { year: "2024", title: "10k Users", description: "Reached 10,000 active users and introduced AI-assisted bullet point suggestions." },
    { year: "2025", title: "50k Users", description: "Expanded to 20+ ATS-friendly templates, multi-format export, and instant preview tools." },
    { year: "2026", title: "Global Scale", description: "Now supporting 120+ countries with professional career solutions." }
  ];

  const faqs = [
    {
      question: "Is GetEasyCV free to use?",
      answer: "Yes! We offer a free tier that allows you to create and download standard resumes. Premium templates and advanced AI features are available on our paid plans."
    },
    {
      question: "Are GetEasyCV templates ATS-friendly?",
      answer: "Absolutely. All our templates are rigorously tested against leading Applicant Tracking Systems (Workday, Taleo, Greenhouse, Lever, etc.) to guarantee clean text parsing."
    },
    {
      question: "Can I download my resume as a PDF?",
      answer: "Yes, you can export your resume as a high-resolution, vector-backed PDF or image file ready for printing or direct online job application submission."
    },
    {
      question: "Do you store my personal data securely?",
      answer: "We take privacy seriously. Your data is encrypted using industry-standard protocols and is never sold to third parties."
    }
  ];

  return (
    <>
      <Navigation />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full shadow-md mb-6 backdrop-blur border border-purple-100/50">
                <Building className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">
                  Trusted by 50,000+ professionals worldwide
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-slate-900">
                We're Building the Future of{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Career Success
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                At GetEasyCV, our mission is simple: eliminate resume anxiety and empower job seekers worldwide to create stand-out, ATS-friendly resumes in minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/templates"
                  className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200 text-center text-sm"
                >
                  Explore Templates
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3.5 bg-white text-slate-700 rounded-md font-semibold hover:bg-slate-50 transition-all shadow-md border border-slate-200 text-center text-sm"
                >
                  Contact Our Team
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="py-12 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="p-6 rounded-md bg-slate-50 border border-slate-100 text-center">
                    <div className="w-10 h-10 mx-auto mb-3 bg-indigo-100 rounded-md flex items-center justify-center text-indigo-600">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">{stat.value}</div>
                    <div className="text-xs font-bold text-slate-700 mb-0.5">{stat.label}</div>
                    <div className="text-[11px] text-slate-500 font-medium">{stat.change}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-12 sm:py-16 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Core Values Driving Our Work</h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Everything we build is anchored in quality, speed, and recruiter-proven standards.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div key={i} className="p-6 rounded-md bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 mb-4 bg-purple-100 text-purple-600 rounded-md flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">{v.title}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{v.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Journey */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Our Journey</h2>
              <p className="text-slate-600 text-sm sm:text-base">From humble beginnings to global career enablement.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {milestones.map((m, i) => (
                <div key={i} className="p-5 rounded-md bg-slate-50 border border-slate-200">
                  <div className="text-xl font-extrabold text-indigo-600 mb-1">{m.year}</div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">{m.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{m.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-16 bg-slate-50/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Frequently Asked Questions</h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Everything you need to know about GetEasyCV
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-md p-6 border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-base mb-2">{faq.question}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-md font-semibold hover:bg-slate-800 transition-all shadow-md text-sm"
              >
                <span>Visit FAQ Center</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <BlogSection />

        {/* Ready to Build CTA */}
        <ReadyToBuild 
          title="Ready to Start Your Career Journey?"
          subtitle="Join thousands of professionals who've successfully landed their dream jobs with GetEasyCV. Your next opportunity is just one resume away."
          buttonText="Create My Resume Now"
          buttonHref="/templates"
        />
      </main>

      <Footer />
    </>
  );
}
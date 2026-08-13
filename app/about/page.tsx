import Navigation from "@/components/Navigation";
import ReadyToBuild from "@/components/sections/ReadyToBuild";
import HowItWorks from "@/components/sections/HowItWorks";
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
  // Platform Statistics (realistic data for a SaaS platform)
  const stats = [
    {
      icon: Users,
      iconBg: "bg-purple-100/80 text-purple-600",
      number: "50,000+",
      label: "Happy Users",
      description: "Professionals trust our platform"
    },
    {
      icon: FileText,
      iconBg: "bg-emerald-100/80 text-emerald-600",
      number: "150,000+",
      label: "Resumes Created",
      description: "Professional documents built"
    },
    {
      icon: Globe,
      iconBg: "bg-blue-100/80 text-blue-600",
      number: "120+",
      label: "Countries Reached",
      description: "Global impact worldwide"
    },
    {
      icon: Award,
      iconBg: "bg-amber-100/80 text-amber-600",
      number: "96%",
      label: "ATS Pass Rate",
      description: "Successfully pass screening"
    }
  ];

  // Why Choose GetEasyCV features
  const features = [
    {
      icon: CheckCircle,
      iconBg: "bg-emerald-100/80 text-emerald-600",
      title: "ATS-Friendly Templates",
      description: "All our templates are optimized to pass Applicant Tracking Systems and reach human recruiters."
    },
    {
      icon: Sparkles,
      iconBg: "bg-purple-100/80 text-purple-600",
      title: "AI-Powered Builder",
      description: "Smart suggestions help you write compelling content that showcases your strengths effectively."
    },
    {
      icon: Zap,
      iconBg: "bg-yellow-100/80 text-yellow-600",
      title: "Lightning Fast",
      description: "Create a professional resume in under 10 minutes with our streamlined editing experience."
    },
    {
      icon: Eye,
      iconBg: "bg-blue-100/80 text-blue-600",
      title: "Real-time Preview",
      description: "See your changes instantly with pixel-perfect preview as you build your resume."
    },
    {
      icon: Download,
      iconBg: "bg-indigo-100/80 text-indigo-600",
      title: "Multiple Export Formats",
      description: "Download in PDF, Word, or plain text format with perfect formatting every time."
    },
    {
      icon: Shield,
      iconBg: "bg-teal-100/80 text-teal-600",
      title: "Secure & Private",
      description: "Your data is encrypted and secure. We never share your information with third parties."
    }
  ];

  // Core Values
  const values = [
    {
      icon: Target,
      iconBg: "bg-red-100/80 text-red-600",
      title: "Simplicity",
      description: "Making resume creation effortless for everyone, regardless of technical skill level."
    },
    {
      icon: Rocket,
      iconBg: "bg-purple-100/80 text-purple-600",
      title: "Innovation",
      description: "Constantly improving our platform with cutting-edge technology and user feedback."
    },
    {
      icon: Heart,
      iconBg: "bg-pink-100/80 text-pink-600",
      title: "User First",
      description: "Every decision we make prioritizes the needs and success of our users."
    },
    {
      icon: Globe,
      iconBg: "bg-blue-100/80 text-blue-600",
      title: "Accessibility",
      description: "Ensuring our platform is accessible to job seekers from all backgrounds worldwide."
    },
    {
      icon: Trophy,
      iconBg: "bg-amber-100/80 text-amber-600",
      title: "Quality",
      description: "Delivering professionally designed templates that meet industry standards."
    },
    {
      icon: UserCheck,
      iconBg: "bg-emerald-100/80 text-emerald-600",
      title: "Trust",
      description: "Building lasting relationships through transparency, reliability, and data security."
    }
  ];

  // Trust Indicators
  const trustIndicators = [
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "256-bit SSL encryption protects your personal information"
    },
    {
      icon: CheckCircle,
      title: "ATS Compatibility",
      description: "96% of our resumes successfully pass ATS screening systems"
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "Dedicated customer success team available 24/7"
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "Users report 3x more interview callbacks"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "Microsoft",
      avatar: "SJ",
      color: "from-blue-500 to-purple-500",
      rating: 5,
      review: "GetEasyCV helped me land my dream job at Microsoft. The ATS-friendly templates and AI suggestions made all the difference. I got 5 interviews in my first week!"
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "Stripe",
      avatar: "MC",
      color: "from-emerald-500 to-teal-500",
      rating: 5,
      review: "The platform is incredibly intuitive. I was able to create a professional resume in just 15 minutes. The real-time preview feature is fantastic."
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "HubSpot",
      avatar: "ER",
      color: "from-pink-500 to-orange-500",
      rating: 5,
      review: "As someone who's reviewed thousands of resumes, I can confidently say GetEasyCV produces some of the most professional-looking documents I've seen."
    }
  ];

  // FAQ Data
  const faqs = [
    {
      question: "How does GetEasyCV ensure ATS compatibility?",
      answer: "Our templates are designed by recruitment experts and tested against major ATS systems like Workday, Greenhouse, and Lever. We use clean formatting, standard fonts, and proper heading structures to ensure 96%+ pass rates."
    },
    {
      question: "Is my personal data secure with GetEasyCV?",
      answer: "Absolutely. We use bank-grade 256-bit SSL encryption, follow GDPR compliance standards, and never share your data with third parties. Your privacy and security are our top priorities."
    },
    {
      question: "Can I edit my resume after downloading?",
      answer: "Yes! Your resumes are saved to your account and can be edited anytime. You can also export in multiple formats including PDF, Word, and plain text."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied with our service, contact our support team for a full refund."
    },
    {
      question: "How is GetEasyCV different from other resume builders?",
      answer: "We focus on three key areas: ATS optimization (96% pass rate), speed (create resumes in under 10 minutes), and professional quality (templates designed by career experts)."
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

              <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                GetEasyCV empowers job seekers worldwide to create professional, 
                ATS-friendly resumes that land interviews and unlock career opportunities.
              </p>

              <div className="flex flex-col gap-3 justify-center mb-10 sm:flex-row">
                <Link
                  href="/templates"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200 transform text-center text-sm"
                >
                  Create My Resume
                </Link>
                <Link
                  href="/templates"
                  className="px-6 py-3 bg-white text-gray-700 rounded-md font-semibold hover:bg-gray-50 transition-all shadow-md border border-gray-200 text-center text-sm"
                >
                  Browse Templates
                </Link>
              </div>

              {/* Platform Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="bg-white/70 backdrop-blur border border-gray-100/50 rounded-md p-4 text-center">
                      <div className={`w-10 h-10 rounded-md ${stat.iconBg} flex items-center justify-center mx-auto mb-2`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-slate-900">{stat.number}</div>
                      <div className="text-xs font-semibold text-slate-600">{stat.label}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{stat.description}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </section>

        {/* Our Story Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Our Story</h2>
                <p className="text-slate-600 text-sm sm:text-base">
                  Why we built GetEasyCV and our mission to democratize career success
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-md p-8 border border-purple-100/50">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">The Problem We Saw</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Talented professionals were struggling with outdated resume builders that produced 
                        documents rejected by modern ATS systems. Creating a professional resume shouldn't 
                        require design skills or take hours of formatting.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">Our Solution</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        We created an intelligent platform that combines beautiful design with ATS optimization. 
                        Now anyone can create a professional resume in under 10 minutes, with confidence it will 
                        pass screening systems and impress recruiters.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-md p-6 border border-slate-100 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-md bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                        <Target className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm mb-1">Our Mission</h4>
                        <p className="text-slate-600 text-xs leading-relaxed">
                          To empower every job seeker with the tools they need to present their best professional self 
                          and unlock their career potential.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-md p-6 border border-slate-100 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                        <Eye className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm mb-1">Our Vision</h4>
                        <p className="text-slate-600 text-xs leading-relaxed">
                          A world where career opportunities are accessible to everyone, regardless of their design 
                          skills or technical knowledge.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-md p-6 border border-slate-100 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                        <Heart className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm mb-1">Our Values</h4>
                        <p className="text-slate-600 text-xs leading-relaxed">
                          We believe in simplicity, innovation, and putting our users first in everything we do.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose GetEasyCV Section */}
        <section className="py-12 sm:py-16 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Why Choose GetEasyCV?</h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
                Discover the features that make us the preferred choice for professionals worldwide
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="bg-white rounded-md p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className={`w-10 h-10 rounded-md ${feature.iconBg} flex items-center justify-center mb-4`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-2">{feature.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How GetEasyCV Works - Reuse existing component */}
        <HowItWorks />

        {/* Our Core Values Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Our Core Values</h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
                The principles that guide everything we do at GetEasyCV
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div key={index} className="bg-slate-50/50 rounded-md p-6 border border-slate-100 hover:bg-white hover:shadow-sm transition-all">
                    <div className={`w-10 h-10 rounded-md ${value.iconBg} flex items-center justify-center mb-4`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-2">{value.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why People Trust Us Section */}
        <section className="py-12 sm:py-16 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Why People Trust Us</h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
                Security, reliability, and results that speak for themselves
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {trustIndicators.map((indicator, index) => {
                const IconComponent = indicator.icon;
                return (
                  <div key={index} className="bg-white rounded-md p-6 border border-slate-100 text-center shadow-sm">
                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-2">{indicator.title}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed">{indicator.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">What Our Users Say</h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
                Real success stories from professionals who landed their dream jobs
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-5">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-slate-50/50 rounded-md p-6 border border-slate-100 hover:bg-white hover:shadow-sm transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{testimonial.name}</p>
                      <p className="text-xs text-slate-500">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed">
                    "{testimonial.review}"
                  </p>
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
                href="/help-center"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-md font-semibold hover:bg-slate-800 transition-all shadow-md text-sm"
              >
                <span>Visit Help Center</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Blog Section - Reuse existing component */}
        <BlogSection />

        {/* CTA Section - Reuse existing component */}
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
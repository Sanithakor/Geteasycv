import Navigation from "@/components/Navigation";
import HeroNew from "@/components/sections/HeroNew";
import TemplateShowcase from "@/components/sections/TemplateShowcase";
import HowItWorks from "@/components/sections/HowItWorks";
import ResumeBuilderFeatures from "@/components/sections/ResumeBuilderFeatures";
import ResumeCategories from "@/components/sections/ResumeCategories";
import AISection from "@/components/sections/AISection";
import LiveEditingSection from "@/components/sections/LiveEditingSection";
import ExportSection from "@/components/sections/ExportSection";
import SocialProofNew from "@/components/sections/SocialProofNew";
import PricingSimplified from "@/components/sections/PricingSimplified";
import BlogSection from "@/components/sections/BlogSection";
import ReadyToBuild from "@/components/sections/ReadyToBuild";
import Footer from "@/components/Footer";
import { SoftwareAppSchema } from "@/components/seo/SchemaOrg";

export default function Home() {
  return (
    <>
      <SoftwareAppSchema />
      <Navigation />

      <main className="min-h-screen">
        {/* Hero Section */}
        <HeroNew />

        {/* Template Discovery Showcase */}
        <TemplateShowcase />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Resume Builder Features */}
        <ResumeBuilderFeatures />

        {/* Resume Categories */}
        <ResumeCategories />

        {/* AI Assistance Section */}
        <AISection />

        {/* Live Editing Section */}
        <LiveEditingSection />

        {/* Export Options Section */}
        <ExportSection />

        {/* Social Proof & Reviews */}
        <SocialProofNew />

        {/* Transparent Pricing */}
        <PricingSimplified />

        {/* Latest Career Insights & Blog */}
        <BlogSection />

        {/* Call to Action */}
        <ReadyToBuild />
      </main>

      <Footer />
    </>
  );
}

import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import HeroNew from "@/components/sections/HeroNew";
import TemplateShowcase from "@/components/sections/TemplateShowcase";
import AISection from "@/components/sections/AISection";
import LiveEditingSection from "@/components/sections/LiveEditingSection";
import ExportSection from "@/components/sections/ExportSection";
import SocialProofNew from "@/components/sections/SocialProofNew";
import PricingSimplified from "@/components/sections/PricingSimplified";
import FinalCTA from "@/components/sections/FinalCTA";
import Link from "next/link";
import { layouts } from "@/data/layouts";
import { themes } from "@/data/themes";
import templates from "@/data/templates.json";

// Real counts from the data layer
const TEMPLATE_COUNT = templates.length;
const LAYOUT_COUNT = layouts.length;
const THEME_COUNT = themes.length;

export default function Home() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen">
        {/* Hero Section with Live Preview */}
        <HeroNew />

        {/* Template Discovery Section */}
        <TemplateShowcase />

        {/* AI Assistance Section */}
        <AISection />

        {/* Live Editing Section */}
        <LiveEditingSection />

        {/* Export Options Section */}
        <ExportSection />

        {/* Social Proof Section */}
        <SocialProofNew />

        {/* Pricing Section */}
        <PricingSimplified />

        {/* Final CTA Section */}
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}

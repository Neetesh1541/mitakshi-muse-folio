import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { ThemeProvider } from "@/components/portfolio/ThemeProvider";
import { ThemeSwitcher } from "@/components/portfolio/ThemeSwitcher";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { LoadingScreen } from "@/components/portfolio/LoadingScreen";
import { Navbar } from "@/components/portfolio/Navbar";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { ServicesSection } from "@/components/portfolio/ServicesSection";
import { AchievementsSection } from "@/components/portfolio/AchievementsSection";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import { AnalyticsSection } from "@/components/portfolio/AnalyticsSection";
import { TestimonialsSection } from "@/components/portfolio/TestimonialsSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { Footer } from "@/components/portfolio/Footer";
import { ResumeModal } from "@/components/portfolio/ResumeModal";

const Scene3D = lazy(() => import("@/components/portfolio/Scene3D").then((m) => ({ default: m.Scene3D })));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mitakshi Sharma — Social Media Manager · Content Strategist · Graphic Designer" },
      {
        name: "description",
        content:
          "Premium portfolio of Mitakshi Sharma — helping brands transform their online presence through creativity, strategy, and meaningful engagement.",
      },
      { property: "og:title", content: "Mitakshi Sharma — Premium Personal Brand" },
      { property: "og:description", content: "Social media management, content strategy, and graphic design portfolio." },
    ],
  }),
  component: Index,
});

function Index() {
  const [resumeOpen, setResumeOpen] = useState(false);
  return (
    <ThemeProvider>
      <LoadingScreen />
      <CustomCursor />
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
      <Navbar onResume={() => setResumeOpen(true)} />
      <main id="top" className="relative">
        <HeroSection onResume={() => setResumeOpen(true)} />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ServicesSection />
        <AchievementsSection />
        <PortfolioSection />
        <AnalyticsSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
      <ThemeSwitcher />
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </ThemeProvider>
  );
}

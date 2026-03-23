"use client";

import React, { useEffect } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { motion, AnimatePresence } from "framer-motion";

// Core UI
import Terminal from "@/components/Terminal";
import Navigation from "@/components/Navigation";
import BackgroundDecorators from "@/components/ui/BackgroundDecorators";

// Views
import HeroSection from "@/components/views/HeroSection";
import AchievementsBento from "@/components/views/AchievementsBento";
import SkillsDashboard from "@/components/views/SkillsDashboard";
import ExperienceTimeline from "@/components/views/ExperienceTimeline";
import CertificationsGrid from "@/components/views/CertificationsGrid";

// Configs
import { viewTransition } from "@/lib/animations";

export default function Home() {
  const activeView = usePortfolioStore((state) => state.activeView);
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Dictionary approach or Switch case is standard. Extracting to function limits component body swelling
  const renderView = () => {
    switch (activeView) {
      case "hero": return <HeroSection key="hero" />;
      case "achievements": return <AchievementsBento key="achievements" />;
      case "skills": return <SkillsDashboard key="skills" />;
      case "experience": return <ExperienceTimeline key="experience" />;
      case "certifications": return <CertificationsGrid key="certifications" />;
      default: return <HeroSection key="hero" />;
    }
  };

  return (
    <main className="flex flex-col lg:flex-row w-full min-h-screen lg:h-screen bg-cover relative bg-brand-bg overflow-x-hidden">
      <BackgroundDecorators />

      {/* Main Layout Container */}
      <motion.div
        className="flex flex-col lg:flex-row w-full lg:h-full flex-1 z-10 p-3 md:p-6 lg:p-8 gap-4 lg:gap-8 max-w-[1920px] mx-auto min-h-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* Left Side: Navigation & GUI Content */}
        <div className="flex flex-col w-full lg:w-[60%] xl:w-[65%] lg:h-full gap-4 lg:gap-6 min-h-0">
          <Navigation />

          <div className="flex-1 glass-panel rounded-2xl p-5 md:p-6 lg:p-10 overflow-y-auto relative custom-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                variants={viewTransition}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Terminal CLI */}
        <motion.div
          className="w-full lg:w-[40%] xl:w-[35%] min-h-[350px] lg:h-full shrink-0 flex flex-col"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Terminal />
        </motion.div>
      </motion.div>
    </main>
  );
}

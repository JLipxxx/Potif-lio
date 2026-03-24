"use client";

import React, { useEffect, useState } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { motion, AnimatePresence } from "framer-motion";

// Core UI
import Terminal from "@/components/Terminal";
import Navigation from "@/components/Navigation";
import ThreatMap from "@/components/ui/ThreatMap";

// Views
import HeroSection from "@/components/views/HeroSection";
import AchievementsBento from "@/components/views/AchievementsBento";
import SkillsDashboard from "@/components/views/SkillsDashboard";
import ExperienceTimeline from "@/components/views/ExperienceTimeline";
import CertificationsGrid from "@/components/views/CertificationsGrid";

import { viewTransition } from "@/lib/animations";
import EasterEggs from "@/components/ui/EasterEggs";
import DefaceOverlay from "@/components/ui/DefaceOverlay";
import { useKonamiCode } from "@/hooks/useKonamiCode";

export default function Home() {
  const activeView = usePortfolioStore((state) => state.activeView);
  const ctfUnlocked = usePortfolioStore((state) => state.ctfUnlocked);
  const auditBadgeUnlocked = usePortfolioStore((state) => state.auditBadgeUnlocked);
  const [mounted, setMounted] = React.useState(false);
  const [defaceActive, setDefaceActive] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Konami Code listener
  useKonamiCode(() => setDefaceActive(true));

  if (!mounted) {
    return (
      <div
        className="min-h-screen bg-brand-bg flex flex-col items-stretch justify-center p-3 md:p-6 lg:p-8"
        aria-busy="true"
        aria-live="polite"
        aria-label="A carregar o painel"
      >
        <div className="w-full max-w-[1920px] mx-auto flex flex-col lg:flex-row flex-1 gap-4 lg:gap-8 min-h-[70vh] animate-pulse">
          <div className="flex flex-col w-full lg:w-[60%] xl:w-[65%] gap-4 lg:gap-6">
            <div className="h-14 lg:h-16 rounded-2xl bg-white/5 border border-white/5" />
            <div className="flex-1 min-h-[280px] rounded-2xl bg-white/5 border border-white/5" />
          </div>
          <div className="w-full lg:w-[40%] xl:w-[35%] min-h-[300px] rounded-2xl bg-white/5 border border-white/5" />
        </div>
      </div>
    );
  }

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
    <main
      id="main-content"
      className="flex flex-col lg:flex-row w-full min-h-screen lg:h-screen bg-cover relative bg-brand-bg overflow-x-hidden scroll-mt-20"
      tabIndex={-1}
    >
      {/* Threat Map Background (SOC Network) */}
      <ThreatMap />
      <EasterEggs />
      <DefaceOverlay active={defaceActive} onDismiss={() => setDefaceActive(false)} />

      {/* Mini-CTF badges */}
      {(ctfUnlocked || auditBadgeUnlocked) && (
        <div className="fixed top-3 right-3 z-50 flex flex-col items-end gap-2">
          {ctfUnlocked && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="ctf-badge bg-brand-surface border border-brand-neon/40 text-brand-neon text-xs font-mono px-3 py-1.5 rounded-full flex items-center gap-2"
            >
              <span>🏆</span> EXPLORER
            </motion.div>
          )}
          {auditBadgeUnlocked && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="ctf-badge bg-brand-surface border border-brand-cyan/40 text-brand-cyan text-xs font-mono px-3 py-1.5 rounded-full flex items-center gap-2"
            >
              <span>🔐</span> HARDENER
            </motion.div>
          )}
        </div>
      )}

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

          <div className="flex-1 glass-panel rounded-2xl p-4 sm:p-5 md:p-6 lg:p-10 overflow-y-auto relative custom-scrollbar">
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
          className="w-full lg:w-[40%] xl:w-[35%] min-h-[300px] sm:min-h-[350px] lg:h-full shrink-0 flex flex-col"
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

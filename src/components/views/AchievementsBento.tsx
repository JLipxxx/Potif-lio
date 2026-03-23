import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Trophy, Target, Award, Play, Users } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerContainerSlow, fadeInUp, scaleIn, hoverLift, hoverGlow } from "@/lib/animations";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { cyberAudio } from "@/lib/audio";

export default function AchievementsBento() {
  const { achievements } = portfolioData;
  const primary = achievements.find(a => a.isPrimary);
  const secondaries = achievements.filter(a => !a.isPrimary);
  const addToHistory = usePortfolioStore((state) => state.addToHistory);

  const handlePrimaryClick = () => {
    cyberAudio.playClick();
    addToHistory({ command: `./analyze_achievement.sh --target="Global Winner"` });
    setTimeout(() => {
      cyberAudio.playSuccess();
      addToHistory({
        output: (
          <div className="text-[#60a5fa] font-mono whitespace-pre-wrap">
            [SYS] Initializing Impact Analysis Protocol...<br/>
            [+] Metrics parsed success.<br/>
            [+] Competition scope: GLOBAL.<br/>
            [+] Outperformed: 10,000+ nodes.<br/>
            [+] Status: VICTORY ACHIEVED.<br/>
            [SYS] End of analysis.
          </div>
        ),
        isSystem: true
      });
    }, 600);
  };

  const handleSecondaryClick = (title: string, description: string, id: number) => {
    cyberAudio.playClick();
    const safeTitle = title.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
    addToHistory({ command: `tail -n 12 /var/log/achievements/${safeTitle}_${id}.log` });
    setTimeout(() => {
      cyberAudio.playSuccess();
      addToHistory({
        output: `[INFO] ${new Date().toISOString()} - EVENT: ${title}\n[DESC] ${description}\n[SUCCESS] Event validated. Operation executed flawlessly.`,
        isSystem: true
      });
    }, 300);
  };

  return (
    <motion.div
      className="flex flex-col h-full w-full max-w-5xl mx-auto space-y-6"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex items-center gap-3 mb-4" variants={fadeInUp}>
        <Trophy className="text-yellow-400" size={28} />
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Highlight & Achievements
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]"
        variants={staggerContainerSlow}
        initial="hidden"
        animate="visible"
      >
        {/* Primary Card */}
        {primary && (
          <motion.div
            className="md:col-span-2 lg:col-span-2 row-span-2 bg-gradient-to-br from-[#0f172a] to-blue-900/40 p-6 md:p-8 rounded-2xl border border-blue-500/20 relative overflow-hidden group cursor-pointer"
            variants={scaleIn}
            whileHover={hoverLift}
            whileTap={{ scale: 0.98 }}
            onClick={handlePrimaryClick}
            title="Analisar Conquista Global"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none opacity-50" />

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <motion.span
                  className="inline-flex items-center gap-2 bg-yellow-400/10 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 shimmer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                >
                  <Award size={14} /> Global Winner
                </motion.span>
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight break-words">
                  {primary.title}
                </h3>
                <p className="text-lg text-blue-200/80">
                  {primary.description}
                </p>
              </div>

              <motion.div
                className="mt-8 flex justify-end opacity-50 font-mono text-sm text-blue-300 group-hover:opacity-100 transition-opacity"
              >
                {">"} Click to execute system analysis...
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Secondary Cards */}
        {secondaries.map((achievement, idx) => (
          <motion.div
            key={idx}
            className="bg-brand-surface border border-white/5 p-6 rounded-2xl flex flex-col justify-between group cursor-pointer"
            variants={fadeInUp}
            whileHover={{ ...hoverLift, ...hoverGlow }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSecondaryClick(achievement.title, achievement.description, idx)}
            title="Ler arquivo de logs"
          >
            <div>
              <motion.div
                className="w-10 h-10 rounded-lg bg-brand-surface-light flex items-center justify-center mb-4 text-brand-neon"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {idx === 0 && <Target size={20} />}
                {idx === 1 && <Play size={20} />}
                {idx === 2 && <Users size={20} />}
              </motion.div>
              <h4 className="text-lg font-bold text-brand-heading mb-2 leading-snug">
                {achievement.title}
              </h4>
              <p className="text-sm text-brand-text/80 line-clamp-3">
                {achievement.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

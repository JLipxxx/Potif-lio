import React from "react";
import { User, Award, Shield, Briefcase, FileCode } from "lucide-react";
import { usePortfolioStore, ViewType } from "@/store/usePortfolioStore";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, hoverLift, tapShrink } from "@/lib/animations";
import { cyberAudio } from "@/lib/audio";

const navItems: { id: ViewType; label: string; icon: React.ReactNode; cmd: string }[] = [
  { id: "hero", label: "Perfil", icon: <User size={18} />, cmd: "whoami" },
  { id: "achievements", label: "Conquistas", icon: <Award size={18} />, cmd: "cat achievements.txt" },
  { id: "skills", label: "Arsenal", icon: <Shield size={18} />, cmd: "analyze skills" },
  { id: "experience", label: "Experiência", icon: <Briefcase size={18} />, cmd: "ls ./experience" },
  { id: "certifications", label: "Formação", icon: <FileCode size={18} />, cmd: "cat roadmap.sh" }
];

export default function Navigation() {
  const activeView = usePortfolioStore((state) => state.activeView);
  const setTypingCommand = usePortfolioStore((state) => state.setTypingCommand);

  const handleNavClick = (cmd: string) => {
    cyberAudio.playClick();
    setTypingCommand(cmd);
  };

  return (
    <motion.nav
      className="glass-panel w-full rounded-2xl p-2 lg:p-4 shrink-0 shadow-lg border-b border-white/5 relative overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Animated neon sweep line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden">
        <div className="w-[60%] h-full bg-gradient-to-r from-transparent via-brand-neon to-transparent neon-sweep-line" />
      </div>

      <motion.div
        className="flex flex-row justify-between items-center gap-1 overflow-x-auto scroller-hide"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item.cmd)}
              variants={fadeInUp}
              whileHover={hoverLift}
              whileTap={tapShrink}
              className={`
                flex items-center gap-2 px-4 py-3 rounded-lg text-sm md:text-base font-medium transition-colors duration-300 relative group min-w-max outline-none
                ${isActive ? 'text-brand-neon' : 'text-brand-text hover:text-white'}
              `}
            >
              {/* Shared Layout active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-brand-neon/10 rounded-lg border border-brand-neon/20"
                  style={{ boxShadow: "0 0 15px rgba(0,255,157,0.1)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <span className={`relative z-10 transition-transform duration-300 flex items-center gap-2 ${isActive ? 'scale-105' : 'group-hover:scale-105'}`}>
                {item.icon}
                <span className="tracking-wide">
                  {item.label}
                </span>
              </span>

              <span className="ml-1 opacity-50 text-xs font-mono hidden sm:inline-block">
                [{item.cmd.split(" ")[0]}]
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </motion.nav>
  );
}

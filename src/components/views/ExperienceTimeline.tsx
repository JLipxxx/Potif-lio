import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Clock, Activity } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { staggerContainer, fadeInUp, drawLine, hoverLift, hoverGlow, springBouncy } from "@/lib/animations";
import { usePortfolioStore } from "@/store/usePortfolioStore";

const nodeVariant: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring" as const, stiffness: 500, damping: 20 } },
};

const badgeVariant: Variants = {
  hidden: { opacity: 0, scale: 0.7, x: 20 },
  visible: { opacity: 1, scale: 1, x: 0, transition: springBouncy },
};

export default function ExperienceTimeline() {
  const { experience } = portfolioData;
  const addToHistory = usePortfolioStore((state) => state.addToHistory);

  const handleExperienceClick = (company: string, role: string, description: string) => {
    // Escape specific chars for simulated command
    const safeCompany = company.replace(/[^a-zA-Z0-9]/g, '_');
    addToHistory({ command: `git log --author="JFSF" --grep="${safeCompany}"` });
    
    setTimeout(() => {
      addToHistory({
        output: (
          <div className="font-mono text-xs md:text-sm">
            <span className="text-yellow-400">commit 4b825dc642cb6eb9a060e54bf8d69288fbee4904</span><br/>
            Author: Joao Felipe Silva Freitas &lt;admin@jfsf.dev&gt;<br/>
            Date:   Mon Mar 23 10:00:00 2026 -0300<br/>
            <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;[FEATURE] Operated as {role} at {company}<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;+ {description}<br/>
          </div>
        ),
        isSystem: true
      });
    }, 500);
  };

  return (
    <motion.div
      className="flex flex-col h-full w-full max-w-4xl mx-auto space-y-8"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex items-center gap-3 mb-6" variants={fadeInUp}>
        <Clock className="text-brand-neon" size={28} />
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Experiência Profissional
        </h2>
      </motion.div>

      <div className="relative ml-4 lg:ml-6 pb-4">
        <motion.div className="absolute left-0 top-0 w-[1px] h-full bg-white/10 origin-top" variants={drawLine} initial="hidden" animate="visible" />

        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          {experience.map((exp, idx) => (
            <motion.div key={idx} className="mb-10 ml-8 md:ml-10 relative group cursor-pointer" variants={fadeInUp} onClick={() => handleExperienceClick(exp.company, exp.role, exp.description)} title="Verificar log de Commits Históricos">
              <motion.span className="absolute -left-[45px] md:-left-[49px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-surface ring-8 ring-[#0a0f14] border border-brand-neon" variants={nodeVariant} whileHover={{ scale: 1.5, backgroundColor: "#00ff9d" }} transition={{ type: "spring", stiffness: 500 }}>
                <span className="h-1.5 w-1.5 rounded-full bg-brand-neon group-hover:bg-brand-surface transition-colors" />
              </motion.span>

              <motion.div className="bg-brand-surface border border-white/5 p-6 rounded-2xl shadow-sm" whileHover={{ ...hoverLift, ...hoverGlow }} whileTap={{ scale: 0.98 }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                  <h3 className="text-xl font-bold text-brand-heading flex items-center gap-2">
                    <Activity size={16} className="text-brand-cyan hidden sm:block" />
                    {exp.company}
                  </h3>
                  <motion.time className="text-xs font-mono text-brand-neon bg-brand-neon/10 px-3 py-1 rounded-full border border-brand-neon/20 self-start sm:self-auto uppercase tracking-widest" variants={badgeVariant}>
                    {exp.period}
                  </motion.time>
                </div>
                <h4 className="text-md font-semibold text-brand-text mb-4">{exp.role}</h4>
                <p className="text-brand-text/80 text-sm md:text-base leading-relaxed">{exp.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

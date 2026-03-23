import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Layers } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { staggerContainer, staggerContainerSlow, fadeInUp, scaleIn, hoverLift, hoverGlow, springSmooth } from "@/lib/animations";
import { usePortfolioStore } from "@/store/usePortfolioStore";

const RadarCustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-brand-surface border border-brand-neon/30 p-3 rounded-lg shadow-lg font-mono">
        <p className="text-brand-heading">{payload[0].payload.subject}</p>
        <p className="text-brand-neon">{`Proficiency: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const tagContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};

const tagItem: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 400, damping: 25 } },
};

export default function SkillsDashboard() {
  const { skills } = portfolioData;
  const addToHistory = usePortfolioStore((state) => state.addToHistory);

  const handleRadarScan = () => {
    addToHistory({ command: `nmap -sV -p- arsenal.local --script=vuln` });
    setTimeout(() => {
      addToHistory({
        output: (
          <div className="text-brand-text">
            [+] Starting Nmap 7.92 ( https://nmap.org )<br/>
            [+] Scanning arsenal.local (127.0.0.1)<br/>
            {skills.radarData.map(r => `[!] Port open: ${r.subject} (Level: ${r.A})`).join('\n')}<br/>
            [+] Scan completed. Vulnerabilities: 0. System Hardened.
          </div>
        ),
        isSystem: true
      });
    }, 800);
  };

  const handleSkillScan = (skillName: string, category: string) => {
    addToHistory({ command: `scan_capability --target="${skillName}"` });
    setTimeout(() => {
      addToHistory({
        output: `[+] Module loaded: ${skillName}\n[+] Categoria: ${category}\n[+] Info: Habilidade estratégica utilizada no escopo arquitetural.\n[+] Status: Optimal. Ready for deployment.`,
        isSystem: true
      });
    }, 300);
  };

  return (
    <motion.div
      className="flex flex-col h-full w-full max-w-5xl mx-auto"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex items-center gap-3 mb-8" variants={fadeInUp}>
        <Layers className="text-brand-cyan" size={28} />
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Arsenal Tecnológico
        </h2>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 w-full h-full min-h-[400px]">
        {/* Radar Chart Panel */}
        <motion.div
          className="w-full lg:w-1/2 bg-brand-surface border border-white/5 rounded-2xl p-4 flex flex-col justify-center items-center shadow-inner relative group cursor-pointer"
          variants={scaleIn}
          whileHover={{ borderColor: "rgba(0,229,255,0.2)" }}
          onClick={handleRadarScan}
          title="Executar Nmap Scan no Arsenal"
        >
          <motion.div
            className="absolute inset-0 bg-brand-cyan/5 rounded-2xl blur-xl"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="w-full h-[300px] md:h-[350px] relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={skills.radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Tooltip content={<RadarCustomTooltip />} />
                <Radar name="Arsenal" dataKey="A" stroke="#00ff9d" strokeWidth={2} fill="#00ff9d" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Skills Categories Tags */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col gap-4"
          variants={staggerContainerSlow}
          initial="hidden"
          animate="visible"
        >
          {skills.categories.map((cat, idx) => (
            <motion.div
              key={idx}
              className="bg-[#0b111a] border border-[#1e293b] rounded-xl p-5"
              variants={fadeInUp}
              whileHover={{ borderColor: "rgba(0,255,157,0.15)" }}
            >
              <h3 className="text-sm font-mono text-brand-text mb-3 uppercase tracking-wider flex items-center gap-2">
                <motion.span
                  className="text-brand-neon"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  #
                </motion.span>
                {cat.category}
              </h3>
              <motion.div
                className="flex flex-wrap gap-2"
                variants={tagContainer}
                initial="hidden"
                animate="visible"
              >
                {cat.items.map((item, idy) => (
                  <motion.span
                    key={idy}
                    className="bg-brand-surface-light border border-white/10 px-3 py-1.5 rounded-md text-sm font-medium text-brand-heading cursor-pointer"
                    variants={tagItem}
                    whileHover={{ ...hoverGlow, scale: 1.08, backgroundColor: "rgba(0,229,255,0.08)", transition: springSmooth }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSkillScan(item, cat.category)}
                    title={`Escanear módulo ${item}`}
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

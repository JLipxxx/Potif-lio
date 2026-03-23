import React from "react";
import { portfolioData } from "@/data/portfolio";
import { GraduationCap, ShieldCheck } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { staggerContainer, fadeInUp, scaleIn, hoverLift, hoverGlow, springSmooth } from "@/lib/animations";
import { usePortfolioStore } from "@/store/usePortfolioStore";

const gridStagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
};

const gridItem: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 25 } },
};

export default function CertificationsGrid() {
  const { education, certifications } = portfolioData;
  const addToHistory = usePortfolioStore((state) => state.addToHistory);

  const handleEducationClick = () => {
    addToHistory({ command: `verify_degree --institution="UNICAP"` });
    setTimeout(() => {
      addToHistory({
        output: (
          <div className="text-brand-cyan">
            [+] Requesting strict institutional verification...<br/>
            [+] Signature: Valid.<br/>
            [+] Institution: Universidade Católica de Pernambuco<br/>
            [+] Student Status: Enrolled.<br/>
            <span className="text-brand-neon">Hash Matched: 0x9f3b2a1c... STATUS SECURE</span>
          </div>
        ),
        isSystem: true
      });
    }, 700);
  };

  const handleCertClick = (certName: string) => {
    const slug = certName.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 10);
    addToHistory({ command: `validate_cert --id="${slug}"` });
    setTimeout(() => {
      addToHistory({
        output: `[+] Certificate: ${certName}\n[+] Descrição: Formação formal e validação de proficiência técnica.\n[SUCCESS] Integrity verified via Authority. Certificate is VALID and active.`,
        isSystem: true
      });
    }, 400);
  };

  return (
    <motion.div
      className="flex flex-col h-full w-full max-w-5xl mx-auto space-y-10"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Education Section */}
      <motion.section variants={fadeInUp}>
        <div className="flex items-center gap-3 mb-6 text-brand-cyan">
          <GraduationCap size={28} />
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Formação Acadêmica
          </h2>
        </div>

        <motion.div
          className="bg-[linear-gradient(135deg,#0f172a_0%,#000000_100%)] border border-brand-cyan/20 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden cursor-pointer group"
          variants={scaleIn}
          whileHover={hoverLift}
          whileTap={{ scale: 0.98 }}
          onClick={handleEducationClick}
          title="Verificar Autenticidade"
        >
          <div className="absolute right-0 top-0 w-32 h-full bg-brand-cyan/5 blur-3xl pointer-events-none opacity-50" />

          <div className="relative z-10 flex flex-col items-start gap-1 w-full md:w-auto">
            <h3 className="text-lg md:text-2xl font-bold text-brand-heading break-words w-full">
              {education.degree}
            </h3>
            <p className="text-sm md:text-base text-brand-text flex items-center gap-2 group-hover:text-brand-cyan transition-colors">
              <span className="w-2 h-2 rounded-full bg-brand-cyan" />
              {education.institution}
            </p>
          </div>

          <div className="relative z-10 font-mono flex flex-col items-start md:items-end">
            <span className="text-xs text-brand-text/60 uppercase">Previsão de Conclusão</span>
            <motion.span
              className="text-brand-cyan font-bold block bg-brand-cyan/10 px-3 py-1 rounded-md mt-1 border border-brand-cyan/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
            >
              {education.completion}
            </motion.span>
          </div>
        </motion.div>
      </motion.section>

      {/* Certifications Section */}
      <motion.section variants={fadeInUp}>
        <div className="flex items-center gap-3 mb-6 text-brand-neon">
          <ShieldCheck size={28} />
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Certificações & Cursos
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={gridStagger}
          initial="hidden"
          animate="visible"
        >
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              className="bg-brand-surface border border-white/5 px-6 py-5 rounded-xl flex justify-between items-center group cursor-pointer"
              variants={gridItem}
              whileHover={{ ...hoverLift, ...hoverGlow }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCertClick(cert.name)}
              title="Validar Certificado"
            >
              <h4 className="text-base font-semibold text-brand-heading max-w-[80%] pr-4 group-hover:text-brand-neon transition-colors">
                {cert.name}
              </h4>
              <motion.div
                className="text-brand-text/50 font-mono text-sm group-hover:text-brand-neon"
                transition={springSmooth}
              >
                {cert.year}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  );
}

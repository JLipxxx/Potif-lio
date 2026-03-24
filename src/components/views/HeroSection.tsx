import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Download, Terminal as TerminalIcon, ShieldCheck, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, fadeInLeft, letterContainer, letterChild, hoverLift } from "@/lib/animations";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { cyberAudio } from "@/lib/audio";
import DownloadProgress from "@/components/ui/DownloadProgress";

export default function HeroSection() {
  const { profile } = portfolioData;
  const addToHistory = usePortfolioStore((state) => state.addToHistory);

  const handleAuthClick = () => {
    cyberAudio.playClick();
    addToHistory({ command: `systemctl status auth.service` });
    setTimeout(() => {
      cyberAudio.playSuccess();
      addToHistory({
        output: (
           <div className="text-brand-neon">
            ● auth.service - Authorization Subsystem<br/>
            Loaded: loaded (/etc/systemd/system/auth.service; enabled)<br/>
            Active: active (running) since {new Date().toLocaleTimeString()}<br/>
            [+] Access Granted. User: {profile.name}
          </div>
        ),
        isSystem: true
      });
    }, 400);
  };

  const handleDownloadCV = (e: React.MouseEvent) => {
    e.stopPropagation();
    cyberAudio.playClick();
    addToHistory({ command: `wget https://jfsf.dev/resume.pdf` });
    setTimeout(() => {
      addToHistory({
        output: <DownloadProgress onComplete={() => {
          const link = document.createElement("a");
          link.href = process.env.NODE_ENV === "production" ? "/Potif-lio/resume.pdf" : "/resume.pdf";
          link.target = "_blank";
          link.download = "JoaoFelipe_Resume.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }} />,
        isSystem: true
      });
    }, 400);
  };

  const handleBioClick = () => {
    cyberAudio.playClick();
    addToHistory({ command: `curl -X GET https://api.jfsf.local/v1/bio` });
    setTimeout(() => {
      cyberAudio.playSuccess();
      addToHistory({
        output: (
          <pre className="text-brand-cyan whitespace-pre-wrap font-mono text-xs mt-1">
{JSON.stringify({
  status: 200,
  data: {
    name: profile.name,
    role: profile.role,
    contact: profile.contact,
    bio_hash: "0x8fae3b...",
    integrity: "VERIFIED"
  }
}, null, 2)}
          </pre>
        ),
        isSystem: true
      });
    }, 600);
  };

  return (
    <motion.div
      className="flex flex-col h-full justify-center w-full max-w-4xl mx-auto space-y-8"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Top Badge */}
      <motion.div
        variants={fadeInUp}
        onClick={handleAuthClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center self-start gap-2 bg-brand-surface-light border border-brand-neon/30 px-4 py-1.5 rounded-full text-brand-neon text-sm font-mono uppercase tracking-widest shimmer cursor-pointer"
        title="Verificar status do sistema"
      >
        <span className="w-2 h-2 rounded-full bg-brand-neon" />
        System Active / Authorized User
      </motion.div>

      <motion.div className="space-y-4" variants={fadeInUp}>
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight flex flex-col gap-2">
          <motion.span
            className="text-brand-text text-xl md:text-2xl font-mono opacity-80 font-normal"
            variants={fadeInLeft}
          >
            {'<'} Hello World {'/>'}
          </motion.span>
          <motion.span
            variants={fadeInLeft}
            className="inline-block text-brand-neon"
          >
            {profile.name}
          </motion.span>
        </h1>

        <motion.h2
          className="text-xl md:text-2xl font-semibold text-brand-cyan flex items-center gap-2"
          variants={fadeInLeft}
        >
          <ShieldCheck className="text-brand-neon" size={24} />
          {profile.role}
        </motion.h2>
      </motion.div>

      {/* Bio Card */}
      <motion.div
        className="bg-brand-surface border border-white/5 p-6 md:p-8 rounded-2xl relative overflow-hidden group cursor-pointer"
        variants={fadeInUp}
        whileHover={hoverLift}
        onClick={handleBioClick}
        title="Requisitar API de Biografia"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/5 blur-3xl rounded-full" />

        <p className="text-base md:text-lg text-brand-text/90 leading-relaxed relative z-10 w-full mb-6">
          {profile.bio}
        </p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-8 relative z-10 w-full pt-4 border-t border-white/5"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.a
            href={`mailto:${profile.contact}`}
            onClick={(e) => { e.stopPropagation(); addToHistory({ command: `mail -s "Contact" ${profile.contact}` }); }}
            className="flex items-center gap-2 py-2 px-4 rounded-lg bg-brand-surface-light hover:bg-white/10 transition-colors text-brand-heading w-fit"
            variants={fadeInUp}
            whileHover={hoverLift}
            whileTap={{ scale: 0.97 }}
            title="Enviar E-mail Seguro"
          >
            <Mail size={16} className="text-brand-cyan" />
            {profile.contact}
          </motion.a>
          <motion.button
            className="flex items-center gap-2 py-2 px-4 rounded-lg bg-brand-cyan/10 text-brand-cyan hover:bg-brand-cyan/20 border border-brand-cyan/20 transition-colors text-brand-heading w-fit cursor-pointer"
            variants={fadeInUp}
            whileHover={hoverLift}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadCV}
            title="Download Full Resume"
          >
            <Download size={16} />
            Baixar CV (.pdf)
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

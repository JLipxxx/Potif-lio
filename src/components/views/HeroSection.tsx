import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Terminal as TerminalIcon, ShieldCheck, Mail } from "lucide-react";

export default function HeroSection() {
  const { profile } = portfolioData;

  return (
    <div className="flex flex-col h-full justify-center w-full max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
      
      {/* Top Badge */}
      <div className="inline-flex items-center self-start gap-2 bg-brand-surface-light border border-brand-neon/30 px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(0,255,157,0.15)] text-brand-neon text-sm font-mono uppercase tracking-widest">
        <span className="w-2 h-2 rounded-full bg-brand-neon animate-pulse" />
        System Active / Authorized User
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight flex flex-col gap-2">
          <span className="text-brand-text text-xl md:text-2xl font-mono opacity-80 font-normal">{'<'} Hello World {'/>'}</span>
          {profile.name}
        </h1>
        
        <h2 className="text-xl md:text-2xl font-semibold text-brand-cyan flex items-center gap-2">
          <ShieldCheck className="text-brand-neon" size={24} />
          {profile.role}
        </h2>
      </div>

      <div className="bg-brand-surface border border-white/5 p-6 md:p-8 rounded-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/5 blur-3xl rounded-full transition-all group-hover:bg-brand-neon/10" />
        
        <p className="text-base md:text-lg text-brand-text/90 leading-relaxed relative z-10 w-full mb-6">
          {profile.bio}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 relative z-10 w-full pt-4 border-t border-white/5">
          <a href={`mailto:${profile.contact}`} className="flex items-center gap-2 py-2 px-4 rounded-lg bg-brand-surface-light hover:bg-white/10 transition-colors text-brand-heading w-fit">
             <Mail size={16} className="text-brand-cyan" />
             {profile.contact}
          </a>
          <div className="flex items-center gap-2 py-2 px-4 rounded-lg bg-brand-surface-light hover:bg-white/10 transition-colors text-brand-heading w-fit cursor-help">
             <TerminalIcon size={16} className="text-brand-neon" />
             Status: Operations Active
          </div>
        </div>
      </div>
    </div>
  );
}

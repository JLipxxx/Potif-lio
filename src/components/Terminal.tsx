import React, { useState, useEffect, useRef } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Terminal as TerminalIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { terminalEntry } from "@/lib/animations";
import { cyberAudio } from "@/lib/audio";

export default function Terminal() {
  const [input, setInput] = useState("");
  const { terminalHistory, executeCommand, typingCommand, setTypingCommand } = usePortfolioStore();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory, typingCommand, input]);

  // Click GUI = Auto Type Effect in CLI
  useEffect(() => {
    if (typingCommand) {
      let i = 0;
      setInput("");
      
      // Attempt activation context immediately
      cyberAudio.enable();
      
      const interval = setInterval(() => {
        setInput(typingCommand.slice(0, i + 1));
        cyberAudio.playKeystroke();
        
        i++;
        if (i >= typingCommand.length) {
          clearInterval(interval);
          setTimeout(() => {
             // Let terminal execute
            executeCommand(typingCommand);
            setInput("");
            setTypingCommand(null);
            cyberAudio.playKeystroke(); // Final Enter key sound
          }, 400);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [typingCommand, executeCommand, setTypingCommand]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    cyberAudio.playKeystroke();
    if (e.key === "Enter" && input.trim()) {
      if (typingCommand) return;
      executeCommand(input);
      setInput("");
    }
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className="glass-panel w-full h-full rounded-2xl flex flex-col overflow-hidden font-mono text-sm md:text-base cursor-text border border-[#1e293b]"
      onClick={focusInput}
    >
      {/* Terminal Header */}
      <div className="h-10 bg-brand-surface-light/50 border-b border-white/5 flex items-center px-4 gap-3 shrink-0">
        <div className="flex gap-2">
          {[
            "bg-brand-surface-light border border-white/10 hover:bg-brand-neon/80",
            "bg-brand-surface-light border border-white/10 hover:bg-brand-neon/80",
            "bg-brand-surface-light border border-white/10 hover:bg-brand-neon/80",
          ].map((classes, i) => (
            <motion.div
              key={i}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${classes}`}
              whileHover={{ scale: 1.4 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            />
          ))}
        </div>
        <div className="flex-1 text-center text-xs text-brand-text/60 font-medium tracking-widest flex items-center justify-center gap-2">
          <TerminalIcon size={12} className="text-brand-neon" />
          root@jfsf-secure-domain:~
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 flex-1 overflow-y-auto w-full break-words">
        <AnimatePresence initial={false}>
          {terminalHistory.map((entry) => (
            <motion.div
              key={entry.id}
              variants={terminalEntry}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mb-3 whitespace-pre-wrap"
            >
              {entry.command && (
                <div className="flex gap-2 text-brand-text">
                  <span className="text-brand-neon shrink-0">root@jfsf:~$</span>
                  <span>{entry.command}</span>
                </div>
              )}
              {entry.output && (
                <div className={`mt-1 pl-2 border-l-2 py-1 ${entry.isError ? 'border-brand-alert text-brand-alert/90' : 'border-brand-cyan/30 text-brand-text'}`}>
                  {entry.output}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Active Input Line */}
        <div className="flex gap-2 text-brand-neon mt-2 items-center">
          <span className="shrink-0 flex items-center">
            <span className="text-[#00e5ff] mr-2">➜</span> root@jfsf:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              if (!typingCommand) setInput(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            disabled={!!typingCommand}
            className="flex-1 bg-transparent border-none outline-none text-brand-heading font-mono min-w-0"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
          {/* Animated cursor glow */}
          {!input && (
            <motion.span
              className="w-2.5 h-4 bg-brand-neon -ml-1 inline-block rounded-[1px]"
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1, repeat: Infinity, times: [0, 0.49, 0.5, 1] }}
              style={{ boxShadow: "0 0 6px rgba(0,255,157,0.5)" }}
            />
          )}
        </div>
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
}

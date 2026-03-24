import React, { useState, useEffect, useRef } from "react";
import { usePortfolioStore, AVAILABLE_COMMANDS } from "@/store/usePortfolioStore";
import { useVisitorInfo } from "@/hooks/useVisitorInfo";
import { Terminal as TerminalIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { terminalEntry } from "@/lib/animations";
import { cyberAudio } from "@/lib/audio";

export default function Terminal() {
  const [input, setInput] = useState("");
  const [tabHint, setTabHint] = useState<string | null>(null);
  const {
    terminalHistory, executeCommand, typingCommand, setTypingCommand,
    navigateHistory, resetHistoryIndex,
  } = usePortfolioStore();
  const visitor = useVisitorInfo();
  const displayIp = visitor.ip === "unavailable" ? "ip unavailable" : visitor.ip;
  const promptLabel = visitor.guestHandle || "anon-········";
  const promptLine = `${promptLabel}:~$`;
  const headerTitle = `${visitor.guestHandle} · ${visitor.browser} · ${visitor.os}`;
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom (respeita prefers-reduced-motion)
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    bottomRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }, [terminalHistory, typingCommand, input]);

  // Click GUI = Auto Type Effect in CLI
  useEffect(() => {
    if (typingCommand) {
      let i = 0;
      setInput("");

      cyberAudio.enable();

      const interval = setInterval(() => {
        setInput(typingCommand.slice(0, i + 1));
        cyberAudio.playKeystroke();

        i++;
        if (i >= typingCommand.length) {
          clearInterval(interval);
          setTimeout(() => {
            executeCommand(typingCommand);
            setInput("");
            setTypingCommand(null);
            cyberAudio.playKeystroke();
          }, 400);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [typingCommand, executeCommand, setTypingCommand]);

  /* ── Keyboard Handler ──────────────────────────────────────── */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // TAB Autocomplete
    if (e.key === "Tab") {
      e.preventDefault();
      cyberAudio.playClick();

      const partial = input.trim().toLowerCase();
      if (!partial) return;

      const matches = (AVAILABLE_COMMANDS as readonly string[]).filter(c => c.startsWith(partial));
      if (matches.length === 1) {
        setInput(matches[0]);
        setTabHint(null);
      } else if (matches.length > 1) {
        setTabHint(matches.join("  "));
        // Find longest common prefix
        let prefix = matches[0];
        for (const m of matches) {
          while (!m.startsWith(prefix)) prefix = prefix.slice(0, -1);
        }
        if (prefix.length > partial.length) setInput(prefix);
      }
      return;
    }

    // Clear tab hint on any other key
    if (tabHint) setTabHint(null);

    // Arrow Up: Previous command
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = navigateHistory('up');
      setInput(prev);
      cyberAudio.playKeystroke();
      return;
    }

    // Arrow Down: Next command
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = navigateHistory('down');
      setInput(next);
      cyberAudio.playKeystroke();
      return;
    }

    // Enter: Execute
    if (e.key === "Enter" && input.trim()) {
      if (typingCommand) return;
      cyberAudio.playKeystroke();
      executeCommand(input);
      setInput("");
      resetHistoryIndex();
      return;
    }

    // General keystroke feedback
    cyberAudio.playKeystroke();
  };

  const focusInputIfNotSelecting = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (target?.closest("input")) return;
    const sel = typeof window !== "undefined" ? window.getSelection() : null;
    if (sel && !sel.isCollapsed) return;
    inputRef.current?.focus();
  };

  return (
    <div
      role="region"
      aria-busy={!!typingCommand}
      aria-label="Terminal interativo — digite comandos ou use Tab para autocompletar"
      className="glass-panel w-full h-full rounded-2xl flex flex-col overflow-hidden font-mono text-xs sm:text-sm md:text-base cursor-text border border-white/5 shadow-[0_0_0_1px_rgba(0,255,0,0.04)]"
      onClick={focusInputIfNotSelecting}
    >
      {/* Terminal Header */}
      <div className="h-10 bg-brand-surface-light/50 border-b border-white/5 flex items-center px-4 gap-3 shrink-0">
        <div className="flex gap-2">
          {[
            "bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.4)]",
            "bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.4)]",
            "bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.4)]",
          ].map((color, i) => (
            <motion.div
              key={i}
              className={`w-3 h-3 rounded-full ${color}`}
              whileHover={{ scale: 1.4 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            />
          ))}
        </div>
        <div className="flex-1 text-center text-[10px] sm:text-xs text-brand-text/60 font-medium tracking-widest flex items-center justify-center gap-2 min-w-0">
          <TerminalIcon size={12} className="text-brand-neon shrink-0" />
          <span
            className="truncate"
            title={`${headerTitle} · ${visitor.language} · ${visitor.timezone} · ${displayIp}`}
          >
            <span className="text-brand-neon/90">{visitor.guestHandle}</span>
            <span className="text-brand-text/45 font-normal normal-case tracking-normal hidden sm:inline">
              {" "}
              · {visitor.browser}
            </span>
            <span className="text-brand-text/45 font-normal normal-case tracking-normal hidden md:inline">
              {" "}
              · {visitor.os}
            </span>
            <span className="text-brand-text/45 font-normal normal-case tracking-normal hidden lg:inline">
              {" "}
              · {displayIp}
            </span>
          </span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-3 sm:p-4 flex-1 overflow-y-auto w-full break-words select-text">
        <AnimatePresence initial={false}>
          {terminalHistory.map((entry) => (
            <motion.div
              key={entry.id}
              variants={terminalEntry}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mb-3 whitespace-pre-wrap select-text"
            >
              {entry.command && (
                <div className="flex gap-2 text-brand-text">
                  <span className="text-brand-neon shrink-0">{promptLine}</span>
                  <span className="break-all">{entry.command}</span>
                </div>
              )}
              {entry.output && (
                <div className={`mt-1 pl-2 border-l-2 py-1 ${entry.isError ? 'border-red-500 text-red-400' : 'border-brand-cyan/30 text-brand-text'}`}>
                  {entry.output}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Tab autocomplete hint */}
        {tabHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-brand-text/40 text-xs mb-2 ml-1"
          >
            {tabHint}
          </motion.div>
        )}

        {/* Active Input Line */}
        <div className="flex gap-2 text-brand-neon mt-2 items-center">
          <span className="shrink-0 flex items-center text-xs sm:text-sm">
            <span className="text-green-500 mr-1 shrink-0">➜</span>
            <span className="truncate max-w-[min(11rem,38vw)] sm:max-w-none">{promptLabel}:</span>~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            placeholder={typingCommand ? "…" : "help · whoami · TAB completa · ↑↓ histórico"}
            onChange={(e) => {
              if (!typingCommand) setInput(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            disabled={!!typingCommand}
            className="flex-1 bg-transparent border-none outline-none text-brand-heading font-mono min-w-0 text-xs sm:text-sm md:text-base select-text placeholder:text-brand-text/35 placeholder:text-[0.7rem] sm:placeholder:text-xs"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            aria-label="Linha de comando"
          />
          {/* Animated cursor */}
          {!input && (
            <motion.span
              className="w-2 h-4 bg-brand-neon -ml-1 inline-block rounded-[1px]"
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1, repeat: Infinity, times: [0, 0.49, 0.5, 1] }}
              style={{ boxShadow: "0 0 6px rgba(0,255,0,0.5)" }}
            />
          )}
        </div>
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
}

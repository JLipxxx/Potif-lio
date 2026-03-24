"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cyberAudio } from "@/lib/audio";

interface DefaceOverlayProps {
  active: boolean;
  onDismiss: () => void;
}

export default function DefaceOverlay({ active, onDismiss }: DefaceOverlayProps) {
  const [glitchText, setGlitchText] = useState("");

  useEffect(() => {
    if (!active) return;

    cyberAudio.playAlert();

    const messages = [
      "SYSTEM BREACHED",
      "DEFACED BY: ☠ JFSF ☠",
      "All your base are belong to us.",
      "",
      "Just kidding. Nice try with the Konami Code ;)",
      "",
      "Click anywhere to restore.",
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let fullText = "";

    const interval = setInterval(() => {
      if (lineIndex >= messages.length) {
        clearInterval(interval);
        return;
      }

      const line = messages[lineIndex];
      if (charIndex <= line.length) {
        fullText = messages.slice(0, lineIndex).join("\n") + "\n" + line.slice(0, charIndex);
        setGlitchText(fullText);
        charIndex++;
      } else {
        lineIndex++;
        charIndex = 0;
        fullText += "\n";
      }
    }, 30);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] bg-black flex items-center justify-center cursor-pointer select-none"
          onClick={onDismiss}
        >
          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)",
            }}
          />

          {/* CRT Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.8) 100%)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 max-w-xl w-full px-8">
            <motion.div
              animate={{ x: [0, -2, 2, -1, 1, 0] }}
              transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 3 }}
            >
              <pre className="font-mono text-green-500 text-sm sm:text-base md:text-lg whitespace-pre-wrap leading-relaxed">
{`
 ██████╗ ███████╗███████╗ █████╗  ██████╗███████╗██████╗
 ██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔════╝██╔══██╗
 ██║  ██║█████╗  █████╗  ███████║██║     █████╗  ██║  ██║
 ██║  ██║██╔══╝  ██╔══╝  ██╔══██║██║     ██╔══╝  ██║  ██║
 ██████╔╝███████╗██║     ██║  ██║╚██████╗███████╗██████╔╝
 ╚═════╝ ╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝╚══════╝╚═════╝`}
              </pre>

              <div className="mt-6 font-mono text-green-400/80 text-xs sm:text-sm whitespace-pre-wrap">
                {glitchText}
                <motion.span
                  className="inline-block w-2 h-4 bg-green-500 ml-0.5"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

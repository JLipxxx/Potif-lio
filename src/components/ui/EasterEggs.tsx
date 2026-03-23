"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { motion, AnimatePresence } from "framer-motion";
import { cyberAudio } from "@/lib/audio";

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0f0"; // Matrix Green
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-40 pointer-events-auto cursor-crosshair" onClick={() => usePortfolioStore.getState().setMatrixMode(false)} />;
};

const RebootSequence = () => {
  const { setRebooting, clearHistory, addToHistory } = usePortfolioStore();
  const [logs, setLogs] = useState<string[]>([]);
  
  const bootSequence = [
    "BIOS Check: OK",
    "Loading Kernel... OK",
    "Mounting Root Filesystem... OK",
    "Starting SSH Daemon... OK",
    "Starting Authorization Subsystem... OK",
    "Boot Complete."
  ];

  useEffect(() => {
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < bootSequence.length) {
        setLogs(prev => [...prev, bootSequence[currentLog]]);
        cyberAudio.playKeystroke();
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setRebooting(false);
          clearHistory();
          addToHistory({ output: "System Rebooted Successfully.", isSystem: true });
        }, 1000);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white font-mono p-8 text-sm md:text-base flex flex-col justify-end">
      {logs.map((log, i) => (
        <div key={i} className="mb-2">[ OK ] {log}</div>
      ))}
      <div className="mt-4 animate-pulse">_</div>
    </div>
  );
};

const IntrusionAlert = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.8, 0, 0.5, 0, 0.9, 0] }}
      transition={{ duration: 0.5, repeat: Infinity }}
      className="fixed inset-0 z-[100] bg-red-600/30 pointer-events-none flex items-center justify-center mix-blend-screen"
    >
      <div className="border-4 border-red-500 bg-red-950/80 text-red-500 text-4xl md:text-6xl font-black p-8 md:p-16 uppercase tracking-widest outline outline-8 outline-red-900/50 backdrop-blur-md">
        Intrusion Attempt
      </div>
    </motion.div>
  );
};

export default function EasterEggs() {
  const { matrixMode, rebooting, intrusionAlert } = usePortfolioStore();

  return (
    <>
      <AnimatePresence>
        {matrixMode && (
          <motion.div
            key="matrix"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            <MatrixRain />
          </motion.div>
        )}
      </AnimatePresence>

      {rebooting && <RebootSequence />}
      
      {intrusionAlert && <IntrusionAlert />}
    </>
  );
}

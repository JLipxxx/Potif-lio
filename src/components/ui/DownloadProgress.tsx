"use client";

import React, { useState, useEffect } from 'react';
import { cyberAudio } from '@/lib/audio';

export default function DownloadProgress({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 20) + 5;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        
        // Trigger completion logic after a tiny delay
        setTimeout(() => {
          cyberAudio.playSuccess();
          onComplete();
        }, 500);
      } else {
        setProgress(current);
        // Play tiny blips during download optionally
        if (Math.random() > 0.5) cyberAudio.playKeystroke();
      }
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  const barLength = 20;
  const filledLength = Math.floor((progress / 100) * barLength);
  const emptyLength = barLength - filledLength;
  
  const filledBar = '█'.repeat(filledLength);
  const emptyBar = '░'.repeat(emptyLength);

  return (
    <div className="font-mono text-xs md:text-sm text-brand-text">
      <div className="text-brand-cyan mb-1">
        [+] Resolving jfsf.dev (104.21.90.13)...
      </div>
      <div className="text-brand-cyan mb-2">
        [+] Connecting to jfsf.dev|104.21.90.13|:443... connected.
      </div>
      <div className="flex items-center gap-2 text-brand-neon">
        <span>resume.pdf</span>
        <span>[{filledBar}{emptyBar}]</span>
        <span className="w-10">{progress}%</span>
      </div>
      {progress === 100 && (
        <div className="text-brand-cyan mt-2">
          [+] 42.1K saved [42100/42100]
          <br />
          <span className="text-brand-neon">[SUCCESS] File extracted. Initiating download protocol...</span>
          <br />
          <span className="text-brand-text/70 mt-1 block">
            Se o download não foi iniciado, <a href={process.env.NODE_ENV === "production" ? "/Potif-lio/resume.pdf" : "/resume.pdf"} target="_blank" rel="noopener noreferrer" className="text-brand-neon underline hover:text-white transition-colors">clique aqui para abrir manualmente</a>.
          </span>
        </div>
      )}
    </div>
  );
}

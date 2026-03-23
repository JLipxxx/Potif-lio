import React from "react";

/**
 * Pure stateless component responsible strictly for background styling and layout depth
 * Extracted to isolate visual complexity from logic components (Clean Code)
 */
export default function BackgroundDecorators() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-neon     blur-[120px] rounded-full opacity-60" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-brand-cyan   blur-[100px] rounded-full opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-brand-bg to-brand-bg" />
      
      {/* Static Grid Lines */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
    </div>
  );
}

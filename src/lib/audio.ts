"use client";

class CyberAudio {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = true;

  private getContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    return this.ctx;
  }

  public enable() {
    this.isEnabled = true;
    const ctx = this.getContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  }

  public disable() {
    this.isEnabled = false;
  }

  public getStatus() {
    return this.isEnabled;
  }

  // --- Sound Effects ---

  // Mechanical typing click
  public playKeystroke() {
    if (!this.isEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    // Very fast, low frequency blip like a membrane/brown switch click
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.03);
    
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  }

  // Subtle digital UI click (like changing tabs)
  public playClick() {
    if (!this.isEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04);
    
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  }

  // Cyber success chime (arpeggio)
  public playSuccess() {
    if (!this.isEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    
    if (ctx.state === 'suspended') ctx.resume();

    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const dur = 0.08;

    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = f;
      
      const startTime = ctx.currentTime + (i * dur);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.03, startTime + dur * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + dur);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + dur);
    });
  }

  // Error/Alert buzz
  public playAlert() {
    if (!this.isEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.3);
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  }
}

export const cyberAudio = new CyberAudio();

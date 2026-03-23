import type React from 'react';
import { create } from 'zustand';

export type ViewType = 'hero' | 'achievements' | 'skills' | 'experience' | 'certifications';

export interface TerminalEntry {
  id: string;
  command?: string;
  output?: string | React.ReactNode;
  isError?: boolean;
  isSystem?: boolean;
}

interface PortfolioState {
  activeView: ViewType;
  terminalHistory: TerminalEntry[];
  typingCommand: string | null;
  
  // Easter Eggs
  matrixMode: boolean;
  rebooting: boolean;
  intrusionAlert: boolean;
  
  // Actions
  setActiveView: (view: ViewType) => void;
  addToHistory: (entry: Omit<TerminalEntry, 'id'>) => void;
  clearHistory: () => void;
  setTypingCommand: (cmd: string | null) => void;
  executeCommand: (cmd: string) => void;
  
  setMatrixMode: (active: boolean) => void;
  setRebooting: (active: boolean) => void;
  setIntrusionAlert: (active: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  activeView: 'hero',
  terminalHistory: [
    {
      id: 'init-1',
      output: 'Welcome to JFSF Secure Portfolio Terminal v1.0.0',
      isSystem: true
    },
    {
      id: 'init-2',
      output: 'Type "help" to see available commands or use the visual menu.',
      isSystem: true
    }
  ],
  typingCommand: null,
  
  matrixMode: false,
  rebooting: false,
  intrusionAlert: false,

  setActiveView: (view) => set({ activeView: view }),
  
  addToHistory: (entry) => set((state) => ({
    terminalHistory: [...state.terminalHistory, { ...entry, id: Date.now().toString() + Math.random().toString(36).substring(2, 11) }]
  })),

  clearHistory: () => set({ terminalHistory: [] }),

  setTypingCommand: (cmd) => set({ typingCommand: cmd }),

  setMatrixMode: (v) => set({ matrixMode: v }),
  setRebooting: (v) => set({ rebooting: v }),
  setIntrusionAlert: (v) => set({ intrusionAlert: v }),

  executeCommand: (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const { addToHistory, setActiveView, clearHistory, setMatrixMode, setRebooting, setIntrusionAlert } = get();

    // Echo the command
    addToHistory({ command: cmd });

    // Handle Easter Eggs
    if (trimmedCmd === 'matrix') {
      setMatrixMode(true);
      addToHistory({ output: 'Wake up, Neo...', isSystem: true });
      return;
    }

    if (trimmedCmd === 'reboot') {
      setRebooting(true);
      addToHistory({ output: 'System going down for reboot NOW!', isSystem: true });
      return;
    }

    if (trimmedCmd === 'sudo whoami' || trimmedCmd === 'sudo su' || trimmedCmd === 'su root') {
      import('@/lib/audio').then(m => m.cyberAudio.playAlert());
      setIntrusionAlert(true);
      addToHistory({ output: 'CRITICAL WARNING: Unauthorized superuser access attempt detected.', isError: true });
      setTimeout(() => setIntrusionAlert(false), 3000);
      return;
    }
    
    if (trimmedCmd === 'cat flag.txt') {
      addToHistory({ output: 'CTF{w3lc0m3_t0_my_s3cur3_p0rtf0l1o}', isSystem: true });
      import('@/lib/audio').then(m => m.cyberAudio.playSuccess());
      return;
    }

    if (trimmedCmd === 'clear' || trimmedCmd === 'cls') {
      clearHistory();
      return;
    }

    // Map Commands to Views
    switch (trimmedCmd) {
      case 'whoami':
        setActiveView('hero');
        addToHistory({ output: 'Executing whoami... Rendering Hero Section.' });
        break;
      case 'cat achievements.txt':
        setActiveView('achievements');
        addToHistory({ output: 'Loading achievements.txt... Rendering Highlight Section.' });
        break;
      case 'analyze skills':
        setActiveView('skills');
        addToHistory({ output: 'Analyzing security arsenal... Rendering Dashboard.' });
        break;
      case 'ls ./experience':
        setActiveView('experience');
        addToHistory({ output: 'Listing ./experience... Rendering Timeline.' });
        break;
      case 'cat roadmap.sh':
        setActiveView('certifications');
        addToHistory({ output: 'Executing roadmap.sh... Rendering Certifications.' });
        break;
      case 'help':
        addToHistory({ 
          output: `Available commands:
  whoami               - View profile & bio
  cat achievements.txt - View highlights and achievements
  analyze skills       - Analyze technology arsenal
  ls ./experience      - View professional timeline
  cat roadmap.sh       - View education & certifications
  clear                - Clear terminal output`
        });
        break;
      default:
        addToHistory({ output: `Command not found: ${trimmedCmd}. Type 'help' for a list of available commands.`, isError: true });
    }
  }
}));

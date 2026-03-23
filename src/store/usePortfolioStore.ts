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
  
  // Actions
  setActiveView: (view: ViewType) => void;
  addToHistory: (entry: Omit<TerminalEntry, 'id'>) => void;
  clearHistory: () => void;
  setTypingCommand: (cmd: string | null) => void;
  executeCommand: (cmd: string) => void;
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

  setActiveView: (view) => set({ activeView: view }),
  
  addToHistory: (entry) => set((state) => ({
    terminalHistory: [...state.terminalHistory, { ...entry, id: Date.now().toString() + Math.random().toString(36).substring(2, 11) }]
  })),

  clearHistory: () => set({ terminalHistory: [] }),

  setTypingCommand: (cmd) => set({ typingCommand: cmd }),

  executeCommand: (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const { addToHistory, setActiveView, clearHistory } = get();

    // Echo the command
    addToHistory({ command: cmd });

    // Handle Easter Eggs
    if (trimmedCmd === 'sudo whoami' || trimmedCmd === 'sudo su') {
      addToHistory({ output: 'Access Denied. This incident will be reported.', isError: true });
      return;
    }
    
    if (trimmedCmd === 'cat flag.txt') {
      addToHistory({ output: 'CTF{w3lc0m3_t0_my_s3cur3_p0rtf0l1o}', isSystem: true });
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

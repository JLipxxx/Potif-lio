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

/* ─────────────────────────────── AVAILABLE COMMANDS ─────────────────────────────── */
export const AVAILABLE_COMMANDS = [
  'whoami',
  'cat achievements.txt',
  'analyze skills',
  'ls ./experience',
  'cat roadmap.sh',
  'help',
  'clear',
  'cls',
  'matrix',
  'reboot',
  'sudo whoami',
  'sudo su',
  'su root',
  'cat flag.txt',
  'decrypt_protocol',
  'security_audit',
  'theme red',
  'theme blue',
] as const;

/* ─────────────────────────────── STATE INTERFACE ─────────────────────────────── */
interface PortfolioState {
  activeView: ViewType;
  terminalHistory: TerminalEntry[];
  typingCommand: string | null;

  // Command History (Arrow navigation)
  commandLog: string[];
  historyIndex: number;

  // Easter Eggs
  matrixMode: boolean;
  rebooting: boolean;
  intrusionAlert: boolean;

  // CTF
  ctfUnlocked: boolean;
  auditBadgeUnlocked: boolean;

  // Theme
  themeMode: 'blue' | 'red';

  // Actions
  setActiveView: (view: ViewType) => void;
  addToHistory: (entry: Omit<TerminalEntry, 'id'>) => void;
  clearHistory: () => void;
  setTypingCommand: (cmd: string | null) => void;
  executeCommand: (cmd: string) => void;

  pushToCommandLog: (cmd: string) => void;
  navigateHistory: (direction: 'up' | 'down') => string;
  resetHistoryIndex: () => void;

  setMatrixMode: (active: boolean) => void;
  setRebooting: (active: boolean) => void;
  setIntrusionAlert: (active: boolean) => void;
  setCtfUnlocked: (active: boolean) => void;
  setAuditBadgeUnlocked: (active: boolean) => void;
  setThemeMode: (mode: 'blue' | 'red') => void;
}

/* ─────────────────────────────── UNIQUE ID GENERATOR ─────────────────────────────── */
const uid = () => Date.now().toString(36) + Math.random().toString(36).substring(2, 9);

/* ─────────────────────────────── STORE ─────────────────────────────── */
export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  activeView: 'hero',
  terminalHistory: [
    {
      id: 'init-1',
      output: 'Welcome to JFSF Secure Portfolio Terminal v2.0.0',
      isSystem: true
    },
    {
      id: 'init-2',
      output: 'Type "help" to see available commands. Use ↑↓ arrows for history, TAB for autocomplete.',
      isSystem: true
    }
  ],
  typingCommand: null,

  commandLog: [],
  historyIndex: -1,

  matrixMode: false,
  rebooting: false,
  intrusionAlert: false,

  ctfUnlocked: false,
  auditBadgeUnlocked: false,
  themeMode: 'blue',

  setActiveView: (view) => set({ activeView: view }),

  addToHistory: (entry) => set((state) => ({
    terminalHistory: [...state.terminalHistory, { ...entry, id: uid() }]
  })),

  clearHistory: () => set({ terminalHistory: [] }),
  setTypingCommand: (cmd) => set({ typingCommand: cmd }),

  /* ── Command History Navigation ────────────────────── */
  pushToCommandLog: (cmd) => set((state) => ({
    commandLog: [...state.commandLog, cmd],
    historyIndex: -1,
  })),

  navigateHistory: (direction) => {
    const { commandLog, historyIndex } = get();
    if (commandLog.length === 0) return '';

    let newIndex: number;
    if (direction === 'up') {
      newIndex = historyIndex === -1
        ? commandLog.length - 1
        : Math.max(0, historyIndex - 1);
    } else {
      newIndex = historyIndex === -1
        ? -1
        : historyIndex >= commandLog.length - 1
          ? -1
          : historyIndex + 1;
    }

    set({ historyIndex: newIndex });
    return newIndex === -1 ? '' : commandLog[newIndex];
  },

  resetHistoryIndex: () => set({ historyIndex: -1 }),

  /* ── Easter Eggs ───────────────────────────────────── */
  setMatrixMode: (v) => set({ matrixMode: v }),
  setRebooting: (v) => set({ rebooting: v }),
  setIntrusionAlert: (v) => set({ intrusionAlert: v }),
  setCtfUnlocked: (v) => set({ ctfUnlocked: v }),
  setAuditBadgeUnlocked: (v) => set({ auditBadgeUnlocked: v }),

  /* ── Theme ────────────────────────────────────────── */
  setThemeMode: (mode) => {
    set({ themeMode: mode });
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('theme-blue', 'theme-red');
      document.documentElement.classList.add(`theme-${mode}`);
    }
  },

  /* ── Command Execution Engine ──────────────────────── */
  executeCommand: (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const {
      addToHistory, setActiveView, clearHistory,
      setMatrixMode, setRebooting, setIntrusionAlert,
      pushToCommandLog, setCtfUnlocked, setAuditBadgeUnlocked, setThemeMode,
    } = get();

    // Echo the raw command
    addToHistory({ command: cmd });
    pushToCommandLog(cmd);

    /* ── Easter Eggs ─── */
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

    /* ── CTF ─── */
    if (trimmedCmd === 'cat flag.txt') {
      addToHistory({ output: 'Permission denied. Try harder.', isError: true });
      return;
    }

    if (trimmedCmd === 'security_audit') {
      import('@/lib/audio').then(m => m.cyberAudio.playSuccess());
      setAuditBadgeUnlocked(true);
      addToHistory({
        output: `═══════════════════════════════════════════════════════════
  JFSF CLIENT-SIDE AUDIT (static export) — resumo
═══════════════════════════════════════════════════════════
[LOW]  SEC-001  Security headers (CSP, HSTS, XFO) em GH Pages
        Mitigação: CDN/proxy na frente do site (fora do Next export).

[MED]  SEC-002  Telemetria terceira (ipify, GitHub API)
        Tráfego vai para hosts externos → aviso em privacidade.

[MED]  SEC-003  Tabnabbing via window.open — REMEDIADO
        Links de repo: apenas https + domínio GitHub; noopener,noreferrer.

[LOW]  SEC-004  INTEL no console (DevTools)
        Proposital para o mini-CTF; remova em builds “sérios”.

[INFO] Próximo passo do CTF: dica [INTEL] no console, depois decrypt_protocol
───────────────────────────────────────────────────────────
  BONUS FLAG: CTF{noopener_enforces_the_new_window_boundary}
  Badge HARDENER desbloqueado no canto superior direito.
═══════════════════════════════════════════════════════════`,
        isSystem: true,
      });
      return;
    }

    if (trimmedCmd === 'decrypt_protocol') {
      import('@/lib/audio').then(m => m.cyberAudio.playSuccess());
      setCtfUnlocked(true);
      addToHistory({
        output: `┌──────────────────────────────────────────────────────────┐
│  ██████╗████████╗███████╗    ███████╗██╗      █████╗  ██████╗  │
│ ██╔════╝╚══██╔══╝██╔════╝    ██╔════╝██║     ██╔══██╗██╔════╝  │
│ ██║        ██║   █████╗      █████╗  ██║     ███████║██║  ███╗ │
│ ██║        ██║   ██╔══╝      ██╔══╝  ██║     ██╔══██║██║   ██║ │
│ ╚██████╗   ██║   ██║         ██║     ███████╗██║  ██║╚██████╔╝ │
│  ╚═════╝   ╚═╝   ╚═╝         ╚═╝     ╚══════╝╚═╝  ╚═╝ ╚═════╝ │
├──────────────────────────────────────────────────────────┤
│  FLAG: CTF{w3lc0m3_t0_my_s3cur3_p0rtf0l1o}              │
│  Status: 🏆 EXPLORER BADGE UNLOCKED                      │
│  You found the hidden protocol. Respect.                  │
└──────────────────────────────────────────────────────────┘`,
        isSystem: true,
      });
      return;
    }

    /* ── Theme Toggle ─── */
    if (trimmedCmd === 'theme red') {
      setThemeMode('red');
      import('@/lib/audio').then(m => m.cyberAudio.playAlert());
      addToHistory({ output: '[!] THEME SWITCHED: Red Team Mode activated. Offensive posture engaged.', isSystem: true });
      return;
    }
    if (trimmedCmd === 'theme blue') {
      setThemeMode('blue');
      import('@/lib/audio').then(m => m.cyberAudio.playSuccess());
      addToHistory({ output: '[+] THEME SWITCHED: Blue Team Mode restored. Defensive posture engaged.', isSystem: true });
      return;
    }

    /* ── System Commands ─── */
    if (trimmedCmd === 'clear' || trimmedCmd === 'cls') {
      clearHistory();
      return;
    }

    /* ── Navigation Commands ─── */
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
          output: (
            `┌─────────────────────────────────────────────────────────────┐
│                    JFSF TERMINAL v2.0 — HELP                │
├─────────────────────────┬───────────────────────────────────┤
│  COMMAND                │  DESCRIPTION                      │
├─────────────────────────┼───────────────────────────────────┤
│  whoami                 │  Exibir perfil e biografia        │
│  cat achievements.txt   │  Ver conquistas e destaques       │
│  analyze skills         │  Analisar arsenal tecnológico     │
│  ls ./experience        │  Ver timeline profissional        │
│  cat roadmap.sh         │  Ver formação e certificações     │
├─────────────────────────┼───────────────────────────────────┤
│  clear / cls            │  Limpar saída do terminal         │
│  theme red              │  Ativar modo Red Team             │
│  theme blue             │  Restaurar modo Blue Team         │
├─────────────────────────┼───────────────────────────────────┤
│  ↑ / ↓                  │  Navegar histórico de comandos    │
│  TAB                    │  Autocompletar comando            │
├─────────────────────────┼───────────────────────────────────┤
│  security_audit         │  Relatório cliente-side / CTF     │
├─────────────────────────┼───────────────────────────────────┤
│  ██ EASTER EGGS ██      │  Descubra os segredos...          │
└─────────────────────────┴───────────────────────────────────┘`
          ),
        });
        break;
      default:
        addToHistory({ output: `Command not found: ${trimmedCmd}. Type 'help' for a list of available commands.`, isError: true });
    }
  }
}));

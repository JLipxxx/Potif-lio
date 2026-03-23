import type { Variants, Transition } from "framer-motion";

// ============================================
// Spring Configs
// ============================================
export const springSmooth: Transition = { type: "spring", stiffness: 300, damping: 30 };
export const springBouncy: Transition = { type: "spring", stiffness: 400, damping: 25 };
export const springGentle: Transition = { type: "spring", stiffness: 200, damping: 20 };

// ============================================
// Container Variants (for stagger children)
// ============================================
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

// ============================================
// Shared easing
// ============================================
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ============================================
// Directional Fade-In Variants
// ============================================
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: smoothEase },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: smoothEase },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: smoothEase },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: smoothEase },
  },
};

// ============================================
// Scale Variants
// ============================================
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 25 },
  },
};

// ============================================
// Hover / Interaction Variants
// ============================================
export const hoverLift = {
  y: -6,
  scale: 1.02,
  transition: springSmooth,
};

export const hoverGlow = {
  borderColor: "rgba(0,255,157,0.4)",
  transition: { duration: 0.3 },
};

export const tapShrink = {
  scale: 0.97,
  transition: { duration: 0.1 },
};

// ============================================
// Letter-by-letter Text Reveal
// ============================================
export const letterContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

export const letterChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: smoothEase },
  },
};

// ============================================
// View Transition (for page.tsx AnimatePresence)
// ============================================
export const viewTransition: Variants = {
  initial: { opacity: 0, y: 15, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: smoothEase },
  },
  exit: {
    opacity: 0,
    y: -15,
    scale: 0.98,
    transition: { duration: 0.3, ease: smoothEase },
  },
};

// ============================================
// Timeline Draw
// ============================================
export const drawLine: Variants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.2, ease: smoothEase },
  },
};

// ============================================
// Terminal Entry
// ============================================
export const terminalEntry: Variants = {
  hidden: { opacity: 0, x: -10, height: 0 },
  visible: {
    opacity: 1,
    x: 0,
    height: "auto",
    transition: { duration: 0.3, ease: smoothEase },
  },
  exit: {
    opacity: 0,
    x: -10,
    height: 0,
    transition: { duration: 0.2 },
  },
};

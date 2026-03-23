import { Variants } from "framer-motion";

export const springSmooth = { type: "spring" as const, stiffness: 300, damping: 20 };
export const springBouncy = { type: "spring" as const, stiffness: 400, damping: 10 };

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 300, damping: 24 } 
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { type: "spring" as const, stiffness: 300, damping: 24 } 
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { type: "spring" as const, stiffness: 300, damping: 20 } 
  },
};

export const letterContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const letterChild: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 12, stiffness: 200 }
  },
};

export const tagContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const tagItem: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export const viewTransition: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
  exit: { opacity: 0, x: 10, transition: { duration: 0.2, ease: "easeIn" as const } }
};

export const hoverLift = {
  scale: 1.02,
  y: -5,
  transition: { type: "spring" as const, stiffness: 400, damping: 10 }
};

export const tapShrink = {
  scale: 0.95,
  transition: { type: "spring" as const, stiffness: 400, damping: 10 }
};

export const hoverGlow = {
  boxShadow: "0px 0px 15px rgba(0, 255, 157, 0.3)",
};

export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1, 
    transition: { duration: 1.5, ease: "easeInOut" as const } 
  }
};

export const terminalEntry: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: "easeOut" as const } }
};

"use client";

import { useEffect, useCallback } from "react";

const KONAMI_SEQUENCE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function useKonamiCode(onActivate: () => void) {
  const handleKeyDown = useCallback(
    (() => {
      let position = 0;

      return (e: KeyboardEvent) => {
        const expected = KONAMI_SEQUENCE[position];
        const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

        if (key === expected) {
          position++;
          if (position === KONAMI_SEQUENCE.length) {
            position = 0;
            onActivate();
          }
        } else {
          position = 0;
        }
      };
    })(),
    [onActivate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}

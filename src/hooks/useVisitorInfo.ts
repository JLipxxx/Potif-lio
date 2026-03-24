"use client";

import { useEffect, useState } from "react";

const GUEST_STORAGE_KEY = "jfsf-portfolio-guest";

export interface VisitorInfo {
  /** ID anônimo persistente (localStorage), sem cadastro */
  guestHandle: string;
  /** Alias legado — igual a guestHandle após hidratação */
  hostname: string;
  ip: string;
  os: string;
  browser: string;
  language: string;
  timezone: string;
  screenRes: string;
}

function detectOS(): string {
  if (typeof navigator === "undefined") return "Unknown";
  const ua = navigator.userAgent;
  if (ua.includes("Windows NT 10")) return "Windows 10/11";
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac OS X")) return "macOS";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  if (ua.includes("Linux")) return "Linux";
  if (ua.includes("CrOS")) return "ChromeOS";
  return "Unknown";
}

function detectBrowser(): string {
  if (typeof navigator === "undefined") return "Unknown";
  const ua = navigator.userAgent;
  if (ua.includes("Firefox/")) return "Firefox";
  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("OPR/") || ua.includes("Opera")) return "Opera";
  if (ua.includes("Brave")) return "Brave";
  if (ua.includes("Chrome/") && !ua.includes("Edg/")) return "Chrome";
  if (ua.includes("Safari/") && !ua.includes("Chrome")) return "Safari";
  return "Unknown";
}

function generateSessionId(): string {
  const chars = "abcdef0123456789";
  let id = "";
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

function getOrCreateGuestHandle(): string {
  if (typeof window === "undefined") return "";
  try {
    const existing = window.localStorage.getItem(GUEST_STORAGE_KEY);
    if (existing && /^anon-[a-f0-9]{8}$/.test(existing)) return existing;
    const created = `anon-${generateSessionId()}`;
    window.localStorage.setItem(GUEST_STORAGE_KEY, created);
    return created;
  } catch {
    return `anon-${generateSessionId()}`;
  }
}

export function useVisitorInfo() {
  const [visitor, setVisitor] = useState<VisitorInfo>(() => {
    const guestHandle = getOrCreateGuestHandle();
    return {
      guestHandle,
      hostname: guestHandle,
      ip: "resolving...",
      os: "detecting...",
      browser: "detecting...",
      language: "en",
      timezone: "UTC",
      screenRes: "unknown",
    };
  });

  useEffect(() => {
    const guestHandle = getOrCreateGuestHandle();
    const os = detectOS();
    const browser = detectBrowser();
    const language = navigator.language || "en";
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    const screenRes = `${screen.width}x${screen.height}`;

    setVisitor((prev) => ({
      ...prev,
      guestHandle,
      hostname: guestHandle,
      os,
      browser,
      language,
      timezone,
      screenRes,
    }));

    const controller = new AbortController();
    // Public IP via third-party API; consider privacy policy if exposed to end users.
    fetch("https://api.ipify.org?format=json", { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`ipify HTTP ${res.status}`);
        const data = (await res.json()) as unknown;
        const ip =
          data && typeof data === "object" && "ip" in data && typeof (data as { ip: unknown }).ip === "string"
            ? (data as { ip: string }).ip
            : null;
        setVisitor((prev) => ({ ...prev, ip: ip ?? "unknown" }));
      })
      .catch((err) => {
        if (err instanceof Error && err.name === "AbortError") return;
        setVisitor((prev) => ({ ...prev, ip: "unavailable" }));
      });

    return () => controller.abort();
  }, []);

  return visitor;
}

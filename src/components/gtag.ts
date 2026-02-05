// src/lib/ga.ts

export const GA_ID = "G-5QB5E0KBCL";

/* =============================
   Types
============================= */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/* =============================
   Page view tracking
============================= */

export function pageview(url: string) {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("config", GA_ID, {
    page_path: url,
  });
}

/* =============================
   Custom events
============================= */

export function event(
  action: string,
  params: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("event", action, params);
}
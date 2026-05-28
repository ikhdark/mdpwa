"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function Analytics() {
  useEffect(() => {
    const track = () => {
      const pagePath = window.location.pathname + window.location.search;

      if (window.gtag) {
        window.gtag("event", "page_view", { page_path: pagePath });
        return;
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "page_view", page_path: pagePath });
    };

    track();

    window.addEventListener("popstate", track);

    return () => window.removeEventListener("popstate", track);
  }, []);

  return null;
}

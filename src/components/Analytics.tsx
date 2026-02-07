"use client";

import { useEffect } from "react";

export default function Analytics() {
  useEffect(() => {
    const track = () => {
      (window as any).dataLayer?.push({
        event: "page_view",
        page_path: window.location.pathname + window.location.search,
      });
    };

    track();

    window.addEventListener("popstate", track);

    return () => window.removeEventListener("popstate", track);
  }, []);

  return null;
}
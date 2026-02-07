"use client";

import { useEffect, useState } from "react";

export default function IosInstallBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent;

    const isIOS = /iPhone|iPad|iPod/.test(ua);

    const isStandalone =
      "standalone" in navigator && (navigator as any).standalone === true;

    const isSafari =
      /^((?!chrome|android).)*safari/i.test(ua);

    // Show banner only if:
    // - iOS
    // - Safari
    // - Not already installed
    if (isIOS && isSafari && !isStandalone) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      className="
        fixed bottom-6 left-1/2 -translate-x-1/2 z-50
        bg-white text-black
        px-4 py-3
        rounded-2xl shadow-xl
        flex items-center gap-3
        w-[90%] max-w-sm
        border border-slate-200
      "
    >
      <div className="flex-1 text-sm font-medium leading-snug">
        <p>Install this app:</p>
        <p className="font-semibold">
          Tap the Share button → “Add to Home Screen”
        </p>
      </div>

      {/* CLOSE X */}
      <button
        onClick={() => setVisible(false)}
        className="
          w-7 h-7 flex items-center justify-center
          rounded-full bg-slate-200
          hover:bg-slate-300 transition
          text-sm font-bold
        "
      >
        ✕
      </button>
    </div>
  );
}
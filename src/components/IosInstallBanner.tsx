"use client";

import { useEffect, useState } from "react";

export default function IosInstallBanner() {
  const [visible, setVisible] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;

    const isIOS = /iPhone|iPad|iPod/.test(ua);
    const isStandalone = (navigator as any).standalone === true;

    // Accurate Safari detection (excludes Chrome & Firefox on iOS)
    const isSafari =
      /Safari/.test(ua) && !/CriOS|FxiOS/.test(ua);

    // Show ONLY if:
    // - iPhone / iPad
    // - Safari browser
    // - Not already installed
    if (isIOS && isSafari && !isStandalone) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* ---- SMALL BANNER ---- */}
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
          Install this app on your iPhone.
        </div>

        {/* Show guide */}
        <button
          onClick={() => setShowGuide(true)}
          className="
            bg-green-600 text-white
            text-xs font-semibold
            px-3 py-2
            rounded-lg
            hover:bg-green-700 transition
          "
        >
          Show Me How
        </button>

        {/* Close banner */}
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

      {/* ---- GUIDE MODAL ---- */}
      {showGuide && (
        <div
          className="
            fixed inset-0 z-[60]
            bg-black/60 backdrop-blur-sm
            flex items-center justify-center
          "
        >
          <div
            className="
              bg-white rounded-2xl p-6 shadow-2xl
              w-[90%] max-w-sm text-center
            "
          >
            <h2 className="text-lg font-bold mb-3">
              How to Install the App
            </h2>

            <p className="text-sm mb-4">Follow these steps:</p>

            <ol className="text-sm text-left space-y-3 mb-6">
              <li>
                <span className="font-semibold">1.</span> Tap the{" "}
                <span className="font-semibold">Share</span> button (square with the ↑ arrow).
              </li>
              <li>
                <span className="font-semibold">2.</span> Scroll down.
              </li>
              <li>
                <span className="font-semibold">3.</span> Tap{" "}
                <span className="font-semibold">“Add to Home Screen.”</span>
              </li>
            </ol>

            <button
              onClick={() => setShowGuide(false)}
              className="
                bg-green-600 text-white w-full py-2
                rounded-xl font-semibold text-sm
                hover:bg-green-700 transition
              "
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
}
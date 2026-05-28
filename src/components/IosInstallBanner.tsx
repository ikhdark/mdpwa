"use client";

import { useEffect, useState } from "react";

export default function IosInstallBanner() {
  const [visible, setVisible] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/.test(ua);
    const isStandalone =
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    const isSafari = /^((?!chrome|android).)*safari/i.test(ua);

    if (isIOS && isSafari && !isStandalone) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* ---- SMALL BANNER ---- */}
      <div className="fixed bottom-6 left-1/2 z-50 flex w-[90%] max-w-sm -translate-x-1/2 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-black shadow-xl">
        <div className="flex-1 text-sm font-medium leading-snug">
          Install this app on your iPhone.
        </div>

        {/* Show guide */}
        <button
          onClick={() => setShowGuide(true)}
          className="rounded-lg bg-brand px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-dark"
        >
          Show Me How
        </button>

        {/* Close banner */}
        <button
          onClick={() => setVisible(false)}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-sm font-bold transition hover:bg-slate-300"
        >
          ✕
        </button>
      </div>

      {/* ---- GUIDE MODAL ---- */}
      {showGuide && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-[90%] max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
            <h2 className="mb-3 text-lg font-bold">How to Install the App</h2>

            <p className="mb-4 text-sm">Follow these simple steps:</p>

            <ol className="mb-6 space-y-3 text-left text-sm">
              <li>
                <span className="font-semibold">1.</span> Tap the{" "}
                <span className="font-semibold">Share</span> button (the square
                with the <span className="font-bold">↑</span> arrow).
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
              className="w-full rounded-xl bg-brand py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
}

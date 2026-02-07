"use client";

import { useEffect, useRef, useState } from "react";

export default function InstallBanner() {
  const deferredPrompt = useRef<any>(null);
  const [visible, setVisible] = useState(false);

  // Catch the install prompt event
  useEffect(() => {
    function handler(e: any) {
      e.preventDefault();
      deferredPrompt.current = e;
      setVisible(true);
    }

    window.addEventListener("beforeinstallprompt", handler);

    // Hide banner when app actually gets installed
    window.addEventListener("appinstalled", () => {
      deferredPrompt.current = null;
      setVisible(false);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  async function install() {
    const prompt = deferredPrompt.current;
    if (!prompt) return;

    prompt.prompt();
    await prompt.userChoice;

    // Hide after user responds
    deferredPrompt.current = null;
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
      
      {/* INSTALL BUTTON */}
      <button
        onClick={install}
        className="
          bg-green-500 text-white
          text-md font-semibold
          px-7 py-4
          rounded-2xl
          shadow-lg
          hover:bg-green-700
          hover:shadow-xl hover:scale-100
          active:scale-95
          transition
        "
      >
        Tap to Install App
      </button>

      {/* SMALL CLOSE BUTTON */}
      <button
        onClick={() => setVisible(false)}
        className="
          bg-gray-300 text-gray-800
          px-3 py-2
          rounded-xl
          text-sm font-medium
          hover:bg-gray-400
          transition
        "
      >
        Close
      </button>
    </div>
  );
}
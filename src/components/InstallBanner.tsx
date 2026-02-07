"use client";

import { useEffect, useRef, useState } from "react";

export default function InstallBanner() {
  const deferredPrompt = useRef<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handler(e: any) {
      e.preventDefault();           // suppress Chrome banner
      deferredPrompt.current = e;   // store safely
      setVisible(true);
    }

    window.addEventListener("beforeinstallprompt", handler);
    return () =>
      window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function install() {
    const prompt = deferredPrompt.current;
    if (!prompt) return;

    prompt.prompt();                // REQUIRED
    await prompt.userChoice;

    deferredPrompt.current = null;  // clear
    setVisible(false);
  }

  if (!visible) return null;

return (
  <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50">
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
  </div>
);
}
"use client";

import { useEffect, useState } from "react";

export default function InstallBanner() {
  const [prompt, setPrompt] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handler(e: any) {
      e.preventDefault();
      setPrompt(e);
      setVisible(true);
    }

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!visible) return null;

  async function install() {
    if (!prompt) return;

    prompt.prompt();
    await prompt.userChoice;
    setVisible(false);
  }

  return (
    <div
      className="
        fixed bottom-16 left-1/2 -translate-x-1/2 z-50
        rounded-xl bg-brand text-white
        px-4 py-2 text-sm shadow-lg
      "
    >
      <button onClick={install}>
        Install App
      </button>
    </div>
  );
}

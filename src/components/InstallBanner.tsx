"use client";

import { useEffect, useRef, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

export default function InstallBanner() {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      deferredPrompt.current = event as BeforeInstallPromptEvent;
      setVisible(true);
    }

    function handleAppInstalled() {
      deferredPrompt.current = null;
      setVisible(false);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  async function install() {
    const prompt = deferredPrompt.current;
    if (!prompt) return;

    prompt.prompt();
    await prompt.userChoice;

    deferredPrompt.current = null;
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-16 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3">
      {/* INSTALL BUTTON */}
      <button
        onClick={install}
        className="text-md rounded-2xl bg-brand px-7 py-4 font-semibold text-white shadow-lg transition hover:scale-100 hover:bg-brand-dark hover:shadow-xl active:scale-95"
      >
        Tap to Install App
      </button>

      {/* SMALL CLOSE BUTTON */}
      <button
        onClick={() => setVisible(false)}
        className="rounded-xl bg-gray-300 px-3 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-400"
      >
        Close
      </button>
    </div>
  );
}

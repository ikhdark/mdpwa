import "@/css/satoshi.css";
import "@/css/style.css";

import Sidebar from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";

import BottomNav from "@/components/BottomNav";
import InstallBanner from "@/components/InstallBanner";
import PWARegister from "./pwa-register";

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    template: "%s | City of Martindale",
    default: "City of Martindale",
  },
  description: "Official city services and information portal",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-surface-50 font-sans antialiased">

        <Providers>

          {/* register service worker (offline support) */}
          <PWARegister />

          {/* install banner (PWA prompt) */}
          <InstallBanner />

          <div className="flex min-h-screen">

            {/* ================= DESKTOP SIDEBAR ================= */}
            <Sidebar />

            {/* ================= MAIN COLUMN ================= */}
            <div className="flex w-full flex-col">

              <Header />

              {/*
                IMPORTANT:
                pb-20 -> space for mobile bottom nav
                pb-safe -> iOS notch safe area
              */}
              <main className="flex-1 mx-auto w-full max-w-screen-2xl p-4 md:p-6 2xl:p-10 pb-20 pb-safe">
                {children}
              </main>

            </div>
          </div>

          {/* ================= MOBILE BOTTOM NAV ================= */}
          <BottomNav />

        </Providers>

      </body>
    </html>
  );
}

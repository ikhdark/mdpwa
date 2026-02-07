import "./globals.css";
import "@/css/satoshi.css";
import "@/css/style.css";

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { Providers } from "./providers";
import Analytics from "@/components/Analytics";
import InstallBanner from "@/components/InstallBanner";
import PWARegister from "./pwa-register";
import Script from "next/script";

import { Header } from "@/components/Layouts/header";

/* ✅ Sidebar (CRITICAL) */
import Sidebar from "@/components/Layouts/sidebar";
import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";

/* ✅ Google Font */
import { Public_Sans } from "next/font/google";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | City of Martindale",
    default: "City of Martindale",
  },
  description: "Official city services and information portal",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${publicSans.className} bg-surface-50 antialiased`}>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1QQKTE3RY3"
          strategy="afterInteractive"
        />

        <Providers>
          <Analytics />
          <PWARegister />
          <InstallBanner />

          {/* 🔴 THIS WAS MISSING */}
          <SidebarProvider>
            <div className="flex min-h-screen">

              {/* actual sidebar */}
              <Sidebar />

              {/* page area */}
              <div className="flex flex-1 flex-col">
                <Header />

                <main className="flex-1 w-full p-4 md:p-6 pb-20 pb-safe">
                  {children}
                </main>
              </div>

            </div>
          </SidebarProvider>

        </Providers>
      </body>
    </html>
  );
}
import "./globals.css";
import "@/css/satoshi.css";

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import Analytics from "@/components/Analytics";
import InstallBanner from "@/components/InstallBanner";
import IosInstallBanner from "@/components/IosInstallBanner";
import PWARegister from "./pwa-register";
import Script from "next/script";

import { Header } from "@/components/Layouts/header";

import Sidebar from "@/components/Layouts/sidebar";
import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";

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
        <Script id="google-analytics-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag("js", new Date());
            gtag("config", "G-1QQKTE3RY3", { send_page_view: false });
          `}
        </Script>

        <Analytics />
        <PWARegister />

        {/* Banners */}
        <InstallBanner />
        <IosInstallBanner />

        <SidebarProvider>
          <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex flex-1 flex-col">
              <Header />

              <main className="pb-safe w-full flex-1 p-4 pb-20 md:p-6">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}

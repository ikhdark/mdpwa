import "./globals.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import Sidebar from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import InstallBanner from "@/components/InstallBanner";
import PWARegister from "./pwa-register";

import type { Metadata, Viewport } from "next";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    template: "%s | City of Martindale",
    default: "City of Martindale",
  },
  description: "Official city services and information portal",

  manifest: "/manifest.json",

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-surface-50 font-sans antialiased">

        <Providers>

          <PWARegister />
          <InstallBanner />

          <div className="flex min-h-screen">

            <Sidebar />

            <div className="flex w-full flex-col">

              <Header />

              <main className="flex-1 w-full p-4 md:p-6 pb-20 pb-safe">
                {children}
              </main>

            </div>
          </div>

        </Providers>

      </body>
    </html>
  );
}
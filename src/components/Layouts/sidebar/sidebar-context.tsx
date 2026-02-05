"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/* ================= TYPES ================= */

type SidebarState = "expanded" | "collapsed";

type SidebarContextType = {
  state: SidebarState;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;

  isMobile: boolean;

  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

/* ================= HOOK ================= */

export function useSidebarContext() {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebarContext must be used within SidebarProvider");
  }
  return ctx;
}

/* ================= PROVIDER ================= */

export function SidebarProvider({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<SidebarContextType>(() => {
    const toggleSidebar = () => setIsOpen((v) => !v);
    const openSidebar = () => setIsOpen(true);
    const closeSidebar = () => setIsOpen(false);

    return {
      state: isOpen ? "expanded" : "collapsed",
      isOpen,
      setIsOpen,
      isMobile,
      toggleSidebar,
      openSidebar,
      closeSidebar,
    };
  }, [isOpen, isMobile]);

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}
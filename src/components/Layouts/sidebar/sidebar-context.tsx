"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type SidebarContextType = {
  isOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function useSidebarContext() {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebarContext must be used within SidebarProvider");
  }
  return ctx;
}

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        toggleSidebar: () => setIsOpen((v) => !v),
        openSidebar: () => setIsOpen(true),
        closeSidebar: () => setIsOpen(false),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
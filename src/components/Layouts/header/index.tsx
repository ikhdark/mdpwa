"use client";

import { useSidebarContext } from "@/components/Layouts/sidebar/sidebar-context";

export function Header() {
  const { toggleSidebar } = useSidebarContext();

  return (
    <header
      className="
        sticky top-0 z-20
        flex items-center justify-between

        bg-white
        border-b border-surface-200
        shadow-sm

        px-4 py-3
      "
    >
      {/* menu button */}
      <button
        onClick={toggleSidebar}
        aria-label="Toggle menu"
        className="
          lg:hidden
          text-sm font-medium
          text-slate-700
          hover:text-brand
          transition
        "
      >
        Menu
      </button>

      {/* title */}
      <h1 className="text-base font-semibold text-slate-900 tracking-tight">
        City of Martindale
      </h1>

      {/* spacer for symmetry */}
      <div className="w-10" />
    </header>
  );
}

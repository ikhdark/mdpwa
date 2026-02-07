"use client";

import { useSidebarContext } from "@/components/Layouts/sidebar/sidebar-context";

export function Header() {
  const { toggleSidebar } = useSidebarContext();

  return (
    <header
      className="
        sticky top-0 z-20
        flex items-center
        h-14
        bg-white
        border-b border-slate-200
        px-4
      "
    >
      {/* menu button */}
      <button
        onClick={toggleSidebar}
        aria-label="Open menu"
        className="
          lg:hidden
          mr-3
          px-3 py-2
          rounded-md
          text-sm font-medium
          text-slate-700
          hover:bg-slate-100
          active:scale-95
          transition
        "
      >
        Menu
      </button>

      {/* logo + title */}
      <div className="flex items-center gap-3">
        <img
          src="/icons/martindale-seal.png"
          alt="City of Martindale Seal"
          className="w-8 h-8 object-contain"
        />

        <h1 className="text-base font-semibold text-slate-900 tracking-tight">
          City of Martindale
        </h1>
      </div>
    </header>
  );
}
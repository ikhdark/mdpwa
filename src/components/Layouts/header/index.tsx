"use client";

export function Header() {
  return (
    <header
      className="
        sticky top-0 z-20
        bg-white
        border-b border-slate-200
        py-8
        flex flex-col items-center justify-center
        text-center
        gap-3
      "
    >
      {/* seal */}
      <img
        src="/icons/martindale-seal.png"
        alt="City of Martindale Seal"
        className="h-20 w-auto"
      />

      {/* title */}
      <h1 className="text-3xl font-bold leading-none text-slate-900">
        City of Martindale
      </h1>
    </header>
  );
}
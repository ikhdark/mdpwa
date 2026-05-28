"use client";

import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-20 flex flex-col items-center justify-center gap-3 border-b border-slate-200 bg-white py-8 text-center">
      {/* seal */}
      <Image
        src="/icons/martindale-seal.png"
        alt="City of Martindale Seal"
        width={96}
        height={96}
        className="h-20 w-auto"
        priority
      />

      {/* title */}
      <h1 className="text-3xl font-bold leading-none text-slate-900">
        City of Martindale
      </h1>
    </header>
  );
}

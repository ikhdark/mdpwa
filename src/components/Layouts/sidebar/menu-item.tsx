"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
};

export default function MenuItem({
  children,
  isActive = false,
  href,
  onClick,
  className = "",
}: Props) {
  const base =
    "flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition";

  const idle =
    "text-slate-700 hover:bg-slate-100";

  const active =
    "bg-[#1f4f3a]/10 text-[#1f4f3a] font-semibold";

  const classes = `${base} ${isActive ? active : idle} ${className}`;

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

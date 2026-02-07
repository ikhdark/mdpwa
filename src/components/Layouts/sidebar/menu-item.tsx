"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  href?: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function MenuItem({
  children,
  href,
  isActive = false,
  onClick,
  className,
}: Props) {
  const classes = cn(
    "flex items-center gap-3 w-full px-4 py-2 text-sm font-medium rounded-md transition-colors",
    "text-gray-700 dark:text-gray-200",
    "hover:bg-gray-100 dark:hover:bg-gray-800",
    "focus:outline-none focus:ring-2 focus:ring-emerald-500",
    isActive && "border border-emerald-500 text-emerald-600 dark:text-emerald-400",
    className
  );

  if (!href) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {children}
      </button>
    );
  }

  // auto detect external
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={classes}>
      {children}
    </Link>
  );
}
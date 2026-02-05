// Server-safe versions of Player UI components

import type { ReactNode, HTMLAttributes } from "react";

/* =========================================
   shared base styles (static)
========================================= */

const TITLE =
  "text-2xl sm:text-3xl font-semibold text-black dark:text-white";

const SUB =
  "text-sm sm:text-base text-gray-500 dark:text-gray-400";

const SECTION_TITLE =
  "text-sm sm:text-base font-semibold uppercase text-gray-700 dark:text-gray-300 mb-2";

const CARD_BASE =
  "rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 shadow-sm";

/* =========================
   Header
========================= */

type PlayerHeaderProps = HTMLAttributes<HTMLDivElement> & {
  battletag: string;
  subtitle?: string;
};

export function PlayerHeader({
  battletag,
  subtitle,
  className,
  ...props
}: PlayerHeaderProps) {
  return (
    <div className={className ?? "mb-6"} {...props}>
      <h1 className={TITLE}>{battletag}</h1>

      {subtitle && <p className={SUB}>{subtitle}</p>}
    </div>
  );
}

/* =========================
   Section
========================= */

type SectionProps = HTMLAttributes<HTMLElement> & {
  title: string;
  children: ReactNode;
};

export function Section({
  title,
  children,
  className,
  ...props
}: SectionProps) {
  return (
    <section className={className ?? "mb-6"} {...props}>
      <h2 className={SECTION_TITLE}>{title}</h2>

      <div className="space-y-2">{children}</div>
    </section>
  );
}

/* =========================
   Stat Card (server)
========================= */

type StatCardServerProps = HTMLAttributes<HTMLDivElement> & {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
};

export function StatCardServer({
  label,
  value,
  sub,
  className,
  ...props
}: StatCardServerProps) {
  return (
    <div className={className ? `${CARD_BASE} ${className}` : CARD_BASE} {...props}>
      <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </div>

      <div className="mt-1 text-lg font-semibold tabular-nums">
        {value}
      </div>

      {sub && (
        <div className="text-xs text-gray-500 mt-1">
          {sub}
        </div>
      )}
    </div>
  );
}
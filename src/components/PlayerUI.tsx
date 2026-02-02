import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* =========================
   Header
========================= */

type PlayerHeaderProps = {
  battletag: string;
  subtitle: string;
  className?: string;
};

export function PlayerHeader({
  battletag,
  subtitle,
  className,
}: PlayerHeaderProps) {
  return (
    <header className={cn("space-y-2", className)}>
      <h1 className="truncate text-3xl font-semibold tracking-tight text-black dark:text-white">
        {battletag}
      </h1>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {subtitle}
      </p>
    </header>
  );
}

/* =========================
   Section (now a real card)
========================= */

type SectionProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function Section({ title, children, className }: SectionProps) {
  return (
    <section
      className={cn(
        `
        space-y-4
        rounded-xl
        border border-gray-300 dark:border-gray-700
        bg-white dark:bg-gray-900
        shadow-md
        p-5
        `,
        className
      )}
    >
      <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        {title}
      </h2>

      <div className="space-y-4 text-sm">{children}</div>
    </section>
  );
}

/* =========================
   Stat Row
========================= */

type StatRowProps = {
  label: string;
  value: string | number;
  winrate?: number;
  className?: string;
};

export function StatRow({
  label,
  value,
  winrate,
  className,
}: StatRowProps) {
  const pct =
    typeof winrate === "number"
      ? Math.min(100, Math.max(0, winrate))
      : null;

  const textColor =
    pct == null
      ? ""
      : pct >= 55
      ? "text-emerald-600 dark:text-emerald-400"
      : pct >= 48
      ? "text-yellow-600 dark:text-yellow-400"
      : "text-rose-600 dark:text-rose-400";

  return (
    <div className={cn("space-y-1", className)}>
      <div className="grid grid-cols-[1fr_auto] items-center gap-x-4">
        <span className="truncate text-gray-700 dark:text-gray-300">
          {label}
        </span>

        <span className={cn("tabular-nums font-semibold", textColor)}>
          {value}
        </span>
      </div>

      {pct !== null && (
        <div className="h-1.5 overflow-hidden rounded bg-gray-200 dark:bg-gray-700">
          <div
            className={cn(
              "h-full transition-all",
              pct >= 55
                ? "bg-emerald-500"
                : pct >= 48
                ? "bg-yellow-500"
                : "bg-rose-500"
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
    </div>
  );
}

/* =========================
   Stat Card (more defined)
========================= */

type StatCardProps = {
  label: string;
  value: string | number;
  sub?: ReactNode;
  className?: string;
  compact?: boolean;
};

export function StatCard({
  label,
  value,
  sub,
  className,
  compact,
}: StatCardProps) {
  return (
    <div
      className={cn(
        `
        rounded-xl
        border border-gray-300 dark:border-gray-700
        bg-white dark:bg-gray-900
        shadow-md hover:shadow-lg
        transition-shadow
        `,
        compact ? "p-3" : "p-5",
        className
      )}
    >
      <div className="text-xs uppercase tracking-wide text-gray-500">
        {label}
      </div>

      <div className="mt-2 text-2xl font-semibold tabular-nums">
        {value}
      </div>

      {sub && (
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {sub}
        </div>
      )}
    </div>
  );
}

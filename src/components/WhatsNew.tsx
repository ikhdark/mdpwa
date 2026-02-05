import type { HTMLAttributes } from "react";

/* ================================= */

const CARD =
  "mx-auto max-w-xl rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 text-sm shadow-sm";

const ITEMS = [
  'Added "Performance Page" (1.1)',
  "Improved Mobile UI Experience (1.2)",
  "Many Backend Improvements (1.2)",
  'Added "Total Time Played vs" via Country Stats (1.2)',
  "Page Loading Improvements (1.3)",
  'Added "Time Consistency" Page (1.4)',
  "Added Season 24 (1.5)",
  "Added SoS Season 24 Ladder (Global + Race) (1.5)",
  "Page loading speed improvements for Ladder (1.6)",
  'Added "Matchup" to sidebar / "Rank" moved to Summary Page (1.7)',
  "Added Battletag suggestions while typing (1.7)",
  "Improved SoS ladder formula representation (1.7)",
] as const;

/* ================================= */

export default function WhatsNew({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className ? `${CARD} ${className}` : CARD} {...props}>
      <h2 className="mb-3 font-semibold">What’s New (Beta 1.1–1.7)</h2>

      <ul className="space-y-1 text-gray-600 dark:text-gray-400">
        {ITEMS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
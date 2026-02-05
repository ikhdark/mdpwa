"use client";

import Link from "next/link";
import { useMemo, useCallback } from "react";
import type { LadderRow } from "@/lib/ladderEngine";

type Props = {
  rows: LadderRow[];
  base: string;
  currentPage: number;
  totalPages: number;
  highlight?: string;
};

/* stable helper */
const fmt = (n: number | null | undefined, d = 0) =>
  n == null ? "—" : n.toFixed(d);

const ROW_BASE = "border-b border-gray-200 dark:border-gray-800";
const ROW_HIGHLIGHT = "bg-yellow-100 dark:bg-yellow-900/40";

export default function LadderTable({
  rows,
  base,
  currentPage,
  totalPages,
  highlight,
}: Props) {
  /* =============================
     precompute once
  ============================= */

  const highlightLower = useMemo(
    () => highlight?.toLowerCase() ?? null,
    [highlight]
  );

  const pageHref = useCallback(
    (p: number) =>
      highlight
        ? `${base}?page=${p}&highlight=${encodeURIComponent(highlight)}`
        : `${base}?page=${p}`,
    [base, highlight]
  );

  /* window of pages without allocating twice */
  const pages = useMemo(() => {
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    const out: number[] = [];
    for (let i = start; i <= end; i++) out.push(i);
    return out;
  }, [currentPage, totalPages]);

  /* ============================= */

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse tabular-nums">
          <colgroup>
            <col className="w-12" />
            <col className="w-44" />
            <col className="w-20" />
            <col className="w-20" />
            <col className="w-20" />
            <col className="w-24" />
          </colgroup>

          <thead className="text-xs uppercase text-gray-500 whitespace-nowrap">
            <tr className="border-b border-gray-300 dark:border-gray-700">
              <th className="text-left">#</th>
              <th className="text-left">Player</th>
              <th className="text-right">Score</th>
              <th className="text-right">MMR</th>
              <th className="text-right">SoS</th>
              <th className="text-right">W-L</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((p) => {
              const isHighlight =
                highlightLower &&
                p.battletag.toLowerCase().includes(highlightLower);

              return (
                <tr
                  key={`${p.battletag}-${p.rank}`}
                  className={`${ROW_BASE} ${isHighlight ? ROW_HIGHLIGHT : ""}`}
                >
                  <td className="py-1.5 whitespace-nowrap font-mono">
                    #{p.rank}
                  </td>

                  <td className="py-1.5 truncate font-sans">
                    {p.battletag}
                  </td>

                  <td className="py-1.5 text-right font-mono font-semibold">
                    {fmt(p.score, 1)}
                  </td>

                  <td className="py-1.5 text-right font-mono font-semibold">
                    {p.mmr}
                  </td>

                  <td className="py-1.5 text-right font-mono font-semibold">
                    {fmt(p.sos, 0)}
                  </td>

                  <td className="py-1.5 text-right font-mono">
                    {p.wins}-{p.losses}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-2 pt-4 text-sm">
        {currentPage > 1 && (
          <Link href={pageHref(currentPage - 1)} className="px-3 py-1 border rounded">
            Prev
          </Link>
        )}

        {pages.map((p) => (
          <Link
            key={p}
            href={pageHref(p)}
            className={`px-3 py-1 border rounded ${
              p === currentPage
                ? "bg-black text-white dark:bg-white dark:text-black"
                : ""
            }`}
          >
            {p}
          </Link>
        ))}
      </div>
    </>
  );
}
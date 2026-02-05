"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useCallback } from "react";

const PAGE_SIZE = 50;

/* stable helper (not recreated each render) */
const normalize = (s: string) =>
  s.replace(/\s+/g, "").toLowerCase();

const INPUT_BASE =
  "w-full max-w-xs rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800";

export default function LadderSearch({
  rows,
  base,
}: {
  rows: { battletag: string }[];
  base: string;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [error, setError] = useState<string | null>(null);

  /* =====================================================
     precompute once
     store BOTH normalized + original index
  ===================================================== */

  const normalizedRows = useMemo(
    () =>
      rows.map((r) => ({
        norm: normalize(r.battletag),
      })),
    [rows]
  );

  /* ===================================================== */

  const runSearch = useCallback(() => {
    const query = q.trim();
    if (!query) return;

    const qNorm = normalize(query);

    const idx = normalizedRows.findIndex((r) =>
      r.norm.includes(qNorm)
    );

    if (idx === -1) {
      setError("Player not found");
      return;
    }

    setError(null);

    const page = Math.floor(idx / PAGE_SIZE) + 1;

    router.push(
      `${base}?page=${page}&highlight=${encodeURIComponent(query)}`
    );

    setQ("");
  }, [q, normalizedRows, router, base]);

  /* ===================================================== */

  return (
    <div className="mb-4 space-y-1">
      <input
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setError(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            runSearch();
          }
        }}
        placeholder="Find player in ladder..."
        className={INPUT_BASE}
      />

      {error && (
        <div className="text-xs text-red-500">{error}</div>
      )}
    </div>
  );
}
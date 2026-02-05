"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, useCallback } from "react";
import BattleTagInput from "@/components/BattleTagInput";
import LoadingSpinner from "@/components/LoadingSpinner";

const FORM_BASE =
  "flex gap-2 max-w-xl rounded-xl border bg-white dark:bg-gray-900 p-4 shadow-sm mt-6";

export default function MatchupSearch({
  initialA,
  initialB,
}: {
  initialA?: string;
  initialB?: string;
}) {
  const router = useRouter();

  /* initialize once — no syncing effects */
  const [a, setA] = useState(() => initialA ?? "");
  const [b, setB] = useState(() => initialB ?? "");

  const [pending, startTransition] = useTransition();

  const run = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();

      const A = a.trim();
      const B = b.trim();

      if (!A || !B) return;

      startTransition(() => {
        router.push(
          `/stats/matchup?a=${encodeURIComponent(A)}&b=${encodeURIComponent(B)}`
        );
      });
    },
    [a, b, router, startTransition]
  );

  return (
    <>
      <form onSubmit={run} className={FORM_BASE}>
        <BattleTagInput value={a} onChange={setA} placeholder="Player A" />
        <BattleTagInput value={b} onChange={setB} placeholder="Player B" />

        <button
          type="submit"
          disabled={pending}
          className="rounded bg-emerald-600 text-white px-4 disabled:opacity-50"
        >
          {pending ? "Loading…" : "Compare"}
        </button>
      </form>

      {pending && (
        <div className="mt-6">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
}
"use client";

import { useMemo } from "react";
import { Section, StatCard } from "@/components/PlayerUI";

const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const BUCKET_LABELS = ["0–8","8–16","16–24"];

const CELLS = 21; // 7 * 3

function color(wr: number | null) {
  if (wr == null) return "text-gray-400";
  if (wr >= 60) return "text-emerald-600 font-semibold";
  if (wr >= 50) return "text-yellow-600 font-semibold";
  return "text-rose-600 font-semibold";
}

type Cell = {
  games: number;
  wins: number;
  losses: number;
  winrate: number | null;
};

export default function ConsistencyHeatmap({
  matches,
}: {
  matches: { startTime: string; didWin: boolean }[];
}) {
  const {
    heat,
    rowTotals,
    columnTotals,
    bestDayIndex,
    bestTimeIndex,
  } = useMemo(() => {

    /* ================================
       single pass aggregation
    ================================ */

    const games = new Array<number>(CELLS).fill(0);
    const wins  = new Array<number>(CELLS).fill(0);

    const rowG = new Array<number>(7).fill(0);
    const rowW = new Array<number>(7).fill(0);

    const colG = new Array<number>(3).fill(0);
    const colW = new Array<number>(3).fill(0);

    for (const m of matches) {
      const d = new Date(m.startTime);

      const day = d.getDay();
      const hour = d.getHours();

      const bucket = hour < 8 ? 0 : hour < 16 ? 1 : 2;

      const idx = day * 3 + bucket;

      games[idx]++;
      if (m.didWin) wins[idx]++;

      rowG[day]++;
      if (m.didWin) rowW[day]++;

      colG[bucket]++;
      if (m.didWin) colW[bucket]++;
    }

    const toCell = (g: number, w: number): Cell => ({
      games: g,
      wins: w,
      losses: g - w,
      winrate: g ? (w / g) * 100 : null,
    });

    const heat = new Array<Cell>(CELLS);
    for (let i = 0; i < CELLS; i++) {
      heat[i] = toCell(games[i], wins[i]);
    }

    const rowTotals = rowG.map((g, i) => toCell(g, rowW[i]));
    const columnTotals = colG.map((g, i) => toCell(g, colW[i]));

    const bestDayIndex = rowTotals.reduce(
      (best, cur, i) =>
        cur.winrate != null &&
        (best === -1 || cur.winrate > rowTotals[best].winrate!)
          ? i
          : best,
      -1
    );

    const bestTimeIndex = columnTotals.reduce(
      (best, cur, i) =>
        cur.winrate != null &&
        (best === -1 || cur.winrate > columnTotals[best].winrate!)
          ? i
          : best,
      -1
    );

    return { heat, rowTotals, columnTotals, bestDayIndex, bestTimeIndex };

  }, [matches]);

  /* ================= render ================= */

  return (
    <>
      <Section title="Day × Time Performance">
        <div className="grid grid-cols-5 gap-y-3 gap-x-8 text-sm tabular-nums">

          <div />

          {BUCKET_LABELS.map(b => (
            <div key={b} className="text-center text-gray-500 font-medium">{b}</div>
          ))}

          <div className="text-center text-gray-500 font-medium">Total</div>

          {DAY_NAMES.map((d, day) => (
            <>
              <div key={`label-${day}`} className="font-medium text-gray-500">{d}</div>

              {[0,1,2].map(bucket => {
                const c = heat[day * 3 + bucket];
                if (!c.winrate)
                  return <div key={bucket} className="text-center text-gray-300">—</div>;

                return (
                  <div key={bucket} className={`text-center ${color(c.winrate)}`}>
                    {Math.round(c.winrate)}% ({c.wins}-{c.losses})
                  </div>
                );
              })}

              {(() => {
                const c = rowTotals[day];
                if (!c.winrate)
                  return <div key="total" className="text-center text-gray-300">—</div>;

                return (
                  <div key="total" className={`text-center font-semibold ${color(c.winrate)}`}>
                    {Math.round(c.winrate)}% ({c.wins}-{c.losses})
                  </div>
                );
              })()}
            </>
          ))}

        </div>
      </Section>

      <section className="grid gap-4 sm:grid-cols-2">
        <StatCard label="Best Day" value={bestDayIndex >= 0 ? DAY_NAMES[bestDayIndex] : "—"} />
        <StatCard label="Best Time" value={bestTimeIndex >= 0 ? BUCKET_LABELS[bestTimeIndex] : "—"} />
      </section>
    </>
  );
}
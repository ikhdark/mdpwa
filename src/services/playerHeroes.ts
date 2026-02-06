import { fetchAllMatches } from "@/lib/w3cUtils";
import { resolveBattleTagViaSearch } from "@/lib/w3cBattleTagResolver";
import { fetchPlayerProfile } from "@/services/w3cApi";
import { cache, inflight } from "@/lib/cache";

const SEASONS = [24];
const MIN_GAMES = 1;

/* -------------------- TYPES -------------------- */

export type Row = {
  label: string;
  wins: number;
  losses: number;
  winrate: number;
};

/* =====================================================
   SERVICE (CACHED + STRUCTURED ONLY)
   ===================================================== */

export async function getW3CHeroStats(inputTag: string) {
  const raw = String(inputTag ?? "").trim();
  if (!raw) return null;

  const battletag = await resolveBattleTagViaSearch(raw);
  if (!battletag) return null;

  /* ================= CACHE ================= */

  const key = `heroStats:${battletag}`;

  const cached = cache.get<any>(key);
  if (cached) return cached;

  if (inflight.has(key)) return inflight.get(key)!;

  const promise = (async () => {
    try {
      /* ================= FETCH ================= */

      let profile: any = null;
      try {
        profile = await fetchPlayerProfile(battletag);
      } catch {}

      const playerIdLower =
        typeof profile?.playerId === "string"
          ? profile.playerId.toLowerCase()
          : null;

      const canonicalLower = battletag.toLowerCase();

      const matches = await fetchAllMatches(battletag, SEASONS);
      console.log("matches", matches.length);
      if (!matches.length) return null;

      /* ================= ACCUMULATORS ================= */

      const heroStats: Record<string, { g: number; w: number }> = {};
      const primaryStats: Record<string, { g: number; w: number }> = {};
      const yourCounts: Record<number, { g: number; w: number }> = {};
      const oppCounts: Record<number, { g: number; w: number }> = {};

      let totalGames = 0;
      let totalWins = 0;

      /* ================= MATCH LOOP ================= */

      for (const match of matches) {
        if (match?.gameMode !== 1) continue;

        const players = match.teams?.flatMap((t: any) => t.players ?? []) ?? [];
        if (players.length !== 2) continue;

        const me = players.find(
          (p: any) =>
            p?.battleTag?.toLowerCase() === canonicalLower ||
            (playerIdLower && p?.playerId?.toLowerCase() === playerIdLower)
        );

        const opp = players.find((p: any) => p !== me);
        if (!me || !opp) continue;

        const didWin = !!me.won;

        totalGames++;
        if (didWin) totalWins++;

        /* hero count */
        const yourCount = Math.min(Math.max(me.heroes?.length ?? 1, 1), 3);
        const oppCount = Math.min(Math.max(opp.heroes?.length ?? 1, 1), 3);

        yourCounts[yourCount] ??= { g: 0, w: 0 };
        oppCounts[oppCount] ??= { g: 0, w: 0 };

        yourCounts[yourCount].g++;
        oppCounts[oppCount].g++;

        if (didWin) {
          yourCounts[yourCount].w++;
          oppCounts[oppCount].w++;
        }

        /* primary opener */
        const primary = opp.heroes?.[0]?.name;
        if (primary) {
          primaryStats[primary] ??= { g: 0, w: 0 };
          primaryStats[primary].g++;
          if (didWin) primaryStats[primary].w++;
        }

        /* all heroes */
        for (const h of opp.heroes?.map((x: any) => x.name) ?? []) {
          heroStats[h] ??= { g: 0, w: 0 };
          heroStats[h].g++;
          if (didWin) heroStats[h].w++;
        }
      }

      /* ================= BUILD ROWS ================= */

      const toRow = (label: string, g: number, w: number): Row => ({
        label,
        wins: w,
        losses: g - w,
        winrate: w / g,
      });

      const byHeroCount = Object.entries(yourCounts).map(([k, s]) =>
        toRow(`${k} hero${Number(k) > 1 ? "es" : ""}`, s.g, s.w)
      );

      const vsOppHeroCount = Object.entries(oppCounts).map(([k, s]) =>
        toRow(`${k} hero${Number(k) > 1 ? "es" : ""}`, s.g, s.w)
      );

      const primaryRows = Object.entries(primaryStats)
        .filter(([, s]) => s.g >= MIN_GAMES)
        .map(([h, s]) => toRow(h, s.g, s.w));

      const overallRows = Object.entries(heroStats)
        .filter(([, s]) => s.g >= MIN_GAMES)
        .map(([h, s]) => toRow(h, s.g, s.w));

      const bestOpeners = [...primaryRows]
        .sort((a, b) => b.winrate - a.winrate)
        .slice(0, 5);

      const worstOpeners = [...primaryRows]
        .sort((a, b) => a.winrate - b.winrate)
        .slice(0, 5);

      const bestOverall = [...overallRows]
        .sort((a, b) => b.winrate - a.winrate)
        .slice(0, 5);

      const worstOverall = [...overallRows]
        .sort((a, b) => a.winrate - b.winrate)
        .slice(0, 5);

      const result = {
        battletag,
        byHeroCount,
        vsOppHeroCount,
        bestOpeners,
        worstOpeners,
        bestOverall,
        worstOverall,
      };

      cache.set(key, result, 60_000);
      return result;
    } finally {
      inflight.delete(key);
    }
  })();

  inflight.set(key, promise);
  return promise;
}
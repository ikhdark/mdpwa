import {
  fetchCountryLadder,
  fetchPlayerProfile,
} from "@/services/w3cApi";

import {
  fetchAllMatches,
  fetchJson,
  resolveEffectiveRace,
} from "@/lib/w3cUtils";

import { resolveBattleTagViaSearch } from "@/lib/w3cBattleTagResolver";
import { flattenCountryLadder } from "@/lib/ranking";

import {
  buildLadder,
  type LadderInputRow,
} from "@/lib/ladderEngine";

/* =====================================================
   GLOBAL CONSTANTS (shared)
===================================================== */

const GATEWAY = 20;
const GAMEMODE = 1;

const SEASON = 24;
const SEASONS = [21, 22, 23, 24];

const MIN_GAMES = 5;

const GLOBAL_CACHE_TTL = 5 * 60 * 1000;

/* =====================================================
   =====================================================
        SECTION A — RANK SERVICE
   =====================================================
   ===================================================== */

const RACE_MAP: Record<number, string> = {
  1: "Human",
  2: "Orc",
  4: "Night Elf",
  8: "Undead",
  0: "Random",
};

const MAX_LEAGUE_PAGE = 76;

/* ---------------- TYPES ---------------- */

type RankRow = {
  race: string;
  raceId: number;
  globalRank: number;
  globalTotal: number;
  countryRank: number | null;
  countryTotal: number | null;
  mmr: number;
  games: number;
};

export type W3CRankResponse = {
  battletag: string;
  season: number;
  country: string;
  minGames: number;
  asOf: string;
  ranks: RankRow[];
};

/* ---------------- GLOBAL LADDER CACHE ---------------- */

let cachedRowsByPage: Map<number, any[]> | null = null;
let lastFetchTime = 0;

async function fetchGlobalRowsByPage(): Promise<Map<number, any[]>> {
  const now = Date.now();

  if (cachedRowsByPage && now - lastFetchTime < GLOBAL_CACHE_TTL) {
    return cachedRowsByPage;
  }

  const requests: Promise<any[]>[] = [];

  for (let page = 0; page <= MAX_LEAGUE_PAGE; page++) {
    const url =
      `https://website-backend.w3champions.com/api/ladder/${page}` +
      `?gateWay=${GATEWAY}&gameMode=${GAMEMODE}&season=${SEASON}`;

    requests.push(fetchJson<any[]>(url).then((json) => json ?? []));
  }

  const pages = await Promise.all(requests);

  const map = new Map<number, any[]>();
  pages.forEach((rows, page) => map.set(page, rows));

  cachedRowsByPage = map;
  lastFetchTime = now;

  return map;
}

/* ---------------- COUNTRY HELPERS ---------------- */

function iso2(code: unknown): string {
  const c = String(code ?? "").toUpperCase();
  return c.length === 2 ? c : "";
}

function inferCountryFromMatches(matches: any[], selfLower: string): string {
  for (const m of matches) {
    if (!Array.isArray(m?.teams)) continue;

    for (const t of m.teams) {
      for (const p of t.players ?? []) {
        if (String(p?.battleTag).toLowerCase() === selfLower) {
          const cc = iso2(p?.countryCode);
          if (cc) return cc;
        }
      }
    }
  }
  return "";
}

/* =====================================================
   PUBLIC — getW3CRank
===================================================== */

export async function getW3CRank(
  inputTag: string
): Promise<W3CRankResponse | null> {
  if (!inputTag) return null;

  const canonicalTag = await resolveBattleTagViaSearch(inputTag);
  if (!canonicalTag) return null;

  const [profile, matches] = await Promise.all([
    fetchPlayerProfile(canonicalTag),
    fetchAllMatches(canonicalTag, [SEASON]),
  ]);

  const canonicalLower = canonicalTag.toLowerCase();

  const inferredCountry = inferCountryFromMatches(matches, canonicalLower);
  const profileCountry = iso2(profile.countryCode);
  const countryCode = inferredCountry || profileCountry;

  const [rowsByPage, countryPayload] = await Promise.all([
    fetchGlobalRowsByPage(),
    countryCode
      ? fetchCountryLadder(countryCode, GATEWAY, GAMEMODE, SEASON)
      : Promise.resolve([]),
  ]);

  const countryRows = flattenCountryLadder(countryPayload);

  const ranks: RankRow[] = [];

  for (const [raceIdStr, raceName] of Object.entries(RACE_MAP)) {
    const raceId = Number(raceIdStr);

    const globalInputs: LadderInputRow[] = [];

    for (const rawRows of rowsByPage.values()) {
      const flat = flattenCountryLadder(rawRows);

      for (const r of flat) {
        if (r.games < MIN_GAMES) continue;
        if (r.race !== raceId) continue;
        if (!r.battleTag) continue;

        globalInputs.push({
          battletag: r.battleTag,
          mmr: r.mmr,
          wins: r.wins,
          games: r.games,
          sos: null,
        });
      }
    }

    const globalLadder = buildLadder(globalInputs);

    const gIdx = globalLadder.findIndex(
      (p) => p.battletag.toLowerCase() === canonicalLower
    );

    if (gIdx === -1) continue;

    let countryRank: number | null = null;
    let countryTotal: number | null = null;

    if (countryRows.length) {
      const countryInputs: LadderInputRow[] = countryRows
        .filter((r) => r.race === raceId && r.games >= MIN_GAMES && r.battleTag)
        .map((r) => ({
          battletag: r.battleTag!,
          mmr: r.mmr,
          wins: r.wins,
          games: r.games,
          sos: null,
        }));

      const countryLadder = buildLadder(countryInputs);

      countryTotal = countryLadder.length;

      const cIdx = countryLadder.findIndex(
        (p) => p.battletag.toLowerCase() === canonicalLower
      );

      countryRank = cIdx === -1 ? null : cIdx + 1;
    }

    ranks.push({
      race: raceName,
      raceId,
      globalRank: gIdx + 1,
      globalTotal: globalLadder.length,
      countryRank,
      countryTotal,
      mmr: globalLadder[gIdx].mmr,
      games: globalLadder[gIdx].games,
    });
  }

  return {
    battletag: canonicalTag,
    season: SEASON,
    country: countryCode || "—",
    minGames: MIN_GAMES,
    asOf: new Date().toLocaleString(),
    ranks,
  };
}

/* =====================================================
   =====================================================
        SECTION B — SUMMARY SERVICE
   =====================================================
   ===================================================== */

const CURRENT_SEASON = 24;
const LAST_3_SEASONS = new Set([22, 23, 24]);

const MIN_DURATION_SECONDS = 120;
const MAX_EXTREME_ABS_MMR_CHANGE = 30;
const HIGH_GAIN_THRESHOLD = 15;

function getPlayerAndOpponentCI(match: any, lower: string) {
  const players = (match?.teams ?? []).flatMap((t: any) => t?.players ?? []);
  if (players.length < 2) return null;

  const me = players.find((p: any) => p?.battleTag?.toLowerCase() === lower);
  if (!me) return null;

  const opp = players.find((p: any) => p !== me);
  if (!opp) return null;

  return { me, opp };
}

/* =====================================================
   PUBLIC — getPlayerSummary
===================================================== */

export async function getPlayerSummary(inputTag: string) {
  const raw = String(inputTag ?? "").trim();
  if (!raw) return null;

  const canonicalBattleTag = await resolveBattleTagViaSearch(raw);
  if (!canonicalBattleTag) return null;

  const matches = await fetchAllMatches(canonicalBattleTag, SEASONS);
  if (!matches.length) return null;

  const lower = canonicalBattleTag.toLowerCase();

  const raceGamesAllTime: Record<string, number> = {};
  const raceGamesCurrentSeason: Record<string, number> = {};
  const lastPlayedRace: Record<string, Date> = {};
  const raceMMRCurrent: Record<string, number> = {};
  const raceCounters: Record<string, number> = {};
  const racePeaks: Record<string, any> = {};

  let highestCurrentRace: string | null = null;
  let lastPlayedLadder: Date | null = null;

  let largestGapWin: any = null;
  let largestSingleGain: any = null;

  const highGainGames: any[] = [];

  for (const match of matches) {
    if (match.gameMode !== 1) continue;

    const date = new Date(match.startTime);
    const season = match.season;

    const pair = getPlayerAndOpponentCI(match, lower);
    if (!pair) continue;

    const { me, opp } = pair;

    const race = resolveEffectiveRace(me);

    raceGamesAllTime[race] = (raceGamesAllTime[race] || 0) + 1;

    if (season === CURRENT_SEASON) {
      raceGamesCurrentSeason[race] =
        (raceGamesCurrentSeason[race] || 0) + 1;

      const prevDate = lastPlayedRace[race];
      if (!prevDate || date > prevDate) {
        raceMMRCurrent[race] = me.currentMmr;
      }
    }

    if (!lastPlayedRace[race] || date > lastPlayedRace[race]) {
      lastPlayedRace[race] = date;
    }

    if (!lastPlayedLadder || date > lastPlayedLadder) {
      lastPlayedLadder = date;
    }

    if (
      !highestCurrentRace ||
      (raceMMRCurrent[race] ?? 0) >
        (raceMMRCurrent[highestCurrentRace] ?? 0)
    ) {
      highestCurrentRace = race;
    }

    if (
      match.durationInSeconds < MIN_DURATION_SECONDS ||
      !LAST_3_SEASONS.has(season) ||
      typeof me.mmrGain !== "number" ||
      Math.abs(me.mmrGain) > MAX_EXTREME_ABS_MMR_CHANGE
    ) {
      continue;
    }

    raceCounters[race] = (raceCounters[race] ?? 0) + 1;

    /* ---------- peaks ---------- */
    if (raceCounters[race] > 35 && typeof me.currentMmr === "number") {
      if (!racePeaks[race] || me.currentMmr > racePeaks[race].mmr) {
        racePeaks[race] = {
          race,
          mmr: me.currentMmr,
          season,
          game: raceCounters[race],
        };
      }
    }

    /* ---------- gains ---------- */
    if (me.mmrGain >= HIGH_GAIN_THRESHOLD) {
      highGainGames.push({
        gain: me.mmrGain,
        myRace: race,
        myMMR: me.oldMmr,
        oppName: opp.battleTag,
        oppRace: resolveEffectiveRace(opp),
        oppMMR: opp.oldMmr,
      });
    }

    if (!largestSingleGain || me.mmrGain > largestSingleGain.gain) {
      largestSingleGain = {
        gain: me.mmrGain,
        myRace: race,
        myMMR: me.oldMmr,
        oppName: opp.battleTag,
        oppRace: resolveEffectiveRace(opp),
        oppMMR: opp.oldMmr,
      };
    }

    const gap = Math.abs(me.oldMmr - opp.oldMmr);

    if (me.won && me.oldMmr < opp.oldMmr) {
      if (!largestGapWin || gap > largestGapWin.gap) {
        largestGapWin = {
          gap,
          myRace: race,
          myMMR: me.oldMmr,
          oppName: opp.battleTag,
          oppRace: resolveEffectiveRace(opp),
          oppMMR: opp.oldMmr,
        };
      }
    }
  }

  /* ---------- results ---------- */

  const mostPlayedAllTime =
    Object.entries(raceGamesAllTime).sort((a, b) => b[1] - a[1])[0]?.[0] ??
    "Unknown";

  const mostPlayedThisSeason =
    Object.entries(raceGamesCurrentSeason).sort((a, b) => b[1] - a[1])[0]?.[0] ??
    "Unknown";

  const top2Peaks = Object.values(racePeaks)
    .sort((a: any, b: any) => b.mmr - a.mmr)
    .slice(0, 2);

  return {
    summary: {
      battletag: canonicalBattleTag,
      mostPlayedAllTime,
      mostPlayedThisSeason,
      highestCurrentRace,
      highestCurrentMMR:
        highestCurrentRace && raceMMRCurrent[highestCurrentRace],
      lastPlayedLadder: lastPlayedLadder?.toISOString() ?? null,
      lastPlayedRace: Object.fromEntries(
        Object.entries(lastPlayedRace).map(([k, v]) => [k, v.toISOString()])
      ),
      top2Peaks,
      gainGamesToShow:
        highGainGames.length > 0
          ? highGainGames
          : largestSingleGain
          ? [largestSingleGain]
          : [],
      largestGapWin,
    },
  };
}
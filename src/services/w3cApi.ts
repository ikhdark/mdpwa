// src/services/w3cApi.ts
// Next.js-friendly ESM/TypeScript (network layer only)

import { fetchJson } from "@/lib/w3cUtils";

/* =========================
   TYPES
========================= */

export type PlayerProfile = {
  battletag: string; // canonical casing (best effort)
  playerId: string | null;
  countryCode: string | null;
  location: string | null;
  playerAkaCountry: string | null;
};

export type CountryLadderPayload = unknown[];

/* =========================
   HELPERS
========================= */

function pickString(x: any): string | null {
  return typeof x === "string" && x.trim() ? x.trim() : null;
}

/* =========================
   PROFILE
========================= */

export async function fetchPlayerProfile(
  battletag: string
): Promise<PlayerProfile> {
  const safeDefault: PlayerProfile = {
    battletag,
    playerId: null,
    countryCode: null,
    location: null,
    playerAkaCountry: null,
  };

  if (!battletag) return safeDefault;

  const btEnc = encodeURIComponent(battletag);

  /* ---------- primary endpoint ---------- */

  try {
    const json = await fetchJson<any>(
      `https://website-backend.w3champions.com/api/players/${btEnc}`
    );

    if (json) {
      const canonical =
        pickString(json?.battleTag) ||
        pickString(json?.battletag) ||
        pickString(json?.id) ||
        battletag;

      return {
        battletag: canonical,
        playerId: pickString(json?.playerId),
        countryCode: pickString(json?.countryCode),
        location: pickString(json?.location),
        playerAkaCountry: pickString(json?.playerAkaData?.country),
      };
    }
  } catch (e) {
    console.warn("players endpoint failed, falling back:", e);
  }

  /* ---------- fallback endpoint ---------- */

  try {
    const json = await fetchJson<any>(
      `https://website-backend.w3champions.com/api/personal-settings/${btEnc}`
    );

    if (!json) return safeDefault;

    return {
      battletag,
      playerId: pickString(json?.playerId),
      countryCode: pickString(json?.countryCode),
      location: pickString(json?.location),
      playerAkaCountry: null,
    };
  } catch (err) {
    console.error(`❌ Error fetching profile for ${battletag}:`, err);
    return safeDefault;
  }
}

/* =========================
   COUNTRY LADDER
========================= */

export async function fetchCountryLadder(
  country: string,
  gateway: number,
  gameMode: number,
  season: number
): Promise<CountryLadderPayload> {
  if (!country) return [];

  const url =
    `https://website-backend.w3champions.com/api/ladder/country/${encodeURIComponent(
      country
    )}?gateWay=${gateway}&gameMode=${gameMode}&season=${season}`;

  try {
    const json = await fetchJson<unknown[]>(url);
    return Array.isArray(json) ? json : [];
  } catch (err) {
    console.error(`❌ Error fetching country ladder (${country}):`, err);
    return [];
  }
}
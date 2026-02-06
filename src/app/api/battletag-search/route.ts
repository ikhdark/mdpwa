import { NextResponse } from "next/server";
import { cache, inflight } from "@/lib/cache";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  const key = `global-search:${q.toLowerCase()}`;

  const cached = cache.get<any[]>(key);
  if (cached) return NextResponse.json(cached);

  if (inflight.has(key)) {
    const hit = await inflight.get(key)!;
    return NextResponse.json(hit);
  }

  const promise = (async () => {
    try {
      const res = await fetch(
        `https://website-backend.w3champions.com/api/players/global-search?search=${encodeURIComponent(q)}`,
        { cache: "no-store" }
      );

      const json = (await res.json()) ?? [];

      cache.set(key, json, 30_000); // 30s TTL (good for autocomplete)
      return json;
    } finally {
      inflight.delete(key);
    }
  })();

  inflight.set(key, promise);

  const result = await promise;
  return NextResponse.json(result);
}
import MatchupSearch from "@/components/MatchupSearch";
import MatchupView from "./MatchupView";
import { getVsPlayer } from "@/services/vsPlayer";
import EmptyState from "@/components/EmptyState";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ a?: string; b?: string }>;
}) {
  const { a, b } = await searchParams;

  let stats = null;

  if (a && b) {
    stats = await getVsPlayer(a, b);
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto text-xs md:text-sm px-3 md:px-0">
      <MatchupSearch initialA={a} initialB={b} />

      {/* nothing searched yet */}
      {!a || !b ? null : 

        /* searched but no games */
        !stats ? (
          <EmptyState message="No head-to-head games found" />
        ) : (

          /* normal */
          <MatchupView stats={stats} />
        )
      }
    </div>
  );
}
export const revalidate = 300;

import EmptyState from "@/components/EmptyState";
import { getW3CHeroStats } from "@/services/playerHeroes";
import { PlayerHeader, Section, StatRow } from "@/components/PlayerUI";
import { HERO_MAP } from "@/lib/heroMap";
type PageProps = {
  params: Promise<{ battletag: string }>; // ✅ YOUR PROJECT REQUIRES PROMISE
};

function render(rows: any[]) {
  if (!rows?.length) return <div className="text-gray-500">No data</div>;

  return rows.map((r, i) => (
    <StatRow
      key={i}
      label={HERO_MAP[r.label] ?? r.label}
      value={`${r.wins}-${r.losses} (${Math.round(r.winrate * 100)}%)`}
      winrate={r.winrate * 100}
    />
  ));
}

export default async function HeroesPage({ params }: PageProps) {
  const { battletag } = await params; // ✅ ALWAYS AWAIT
  if (!battletag) return <EmptyState message="Player not found" />;

  const data = await getW3CHeroStats(battletag);
  if (!data) return <EmptyState message="Not enough data/recent games available" />;

  return (
    <div className="space-y-8 max-w-6xl mx-auto text-xs md:text-sm px-3 md:px-0">

      <PlayerHeader
        battletag={data.battletag}
        subtitle="Hero Stats · Season 24"
      />

      <Section title="Your W/L by Hero Count">{render(data.byHeroCount)}</Section>

      <Section title="W/L vs Opponent Hero Count">{render(data.vsOppHeroCount)}</Section>

      <Section title="Best Matchups vs Opponent Opening Hero">{render(data.bestOpeners)}</Section>

      <Section title="Worst Matchups vs Opponent Opening Hero">{render(data.worstOpeners)}</Section>

      <Section title="Best Winrates vs Opponent Heroes (Overall)">{render(data.bestOverall)}</Section>

      <Section title="Worst Winrates vs Opponent Heroes (Overall)">{render(data.worstOverall)}</Section>

    </div>
  );
}
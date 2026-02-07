import Link from "next/link";

export default function Home() {
  const card = `
    group
    flex items-center justify-between
    rounded-xl
    bg-white
    border border-surface-200
    px-6 py-5

    text-slate-900 font-medium

    shadow-card
    transition-all duration-150

    hover:-translate-y-0.5
    hover:shadow-cardHover
    hover:border-slate-300
    active:scale-[0.98]
  `;

  const arrow = `
    text-slate-400
    group-hover:text-brand
    transition
  `;

  return (
    <main className="min-h-screen bg-surface-50 max-w-md mx-auto p-4">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">
          Martindale
        </h1>
        <p className="text-sm text-slate-500">
          City Services
        </p>
      </div>

      {/* LIST STYLE (cleaner than tiles) */}
      <div className="space-y-3">

        <Link href="/services/pay" className={card}>
          <span>Pay Utility Bill</span>
          <span className={arrow}>→</span>
        </Link>

        <Link href="/services/report" className={card}>
          <span>Report an Issue</span>
          <span className={arrow}>→</span>
        </Link>

        <Link href="/government/council" className={card}>
          <span>City Council</span>
          <span className={arrow}>→</span>
        </Link>

        <Link href="/forms" className={card}>
          <span>Forms & Documents</span>
          <span className={arrow}>→</span>
        </Link>

        <Link href="/community" className={card}>
          <span>Community Info</span>
          <span className={arrow}>→</span>
        </Link>

        {/* primary action (only place brand shows) */}
        <Link
          href="/meetings"
          className="
            group
            flex items-center justify-between
            rounded-xl
            bg-brand
            text-white
            px-6 py-5
            font-semibold
            shadow-card
            hover:brightness-110
            active:scale-[0.98]
            transition
          "
        >
          <span>Meetings & Media</span>
          <span>→</span>
        </Link>

      </div>
    </main>
  );
}

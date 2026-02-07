import Link from "next/link";

export default function MeetingsPage() {
  return (
    <div className="max-w-md mx-auto space-y-6">

      <div>
        <h1 className="text-2xl font-semibold text-brand">
          Meetings & Media
        </h1>
        <p className="text-sm text-gray-500">
          Agendas, minutes, and recordings
        </p>
      </div>

      <div className="rounded-2xl border border-surface-200 bg-white shadow-card p-5 space-y-3">

        <a
          href="/agendas"
          className="block rounded-xl border border-surface-200 px-4 py-3 hover:bg-surface-50"
        >
          Agendas
        </a>

        <a
          href="/minutes"
          className="block rounded-xl border border-surface-200 px-4 py-3 hover:bg-surface-50"
        >
          Minutes
        </a>

        <a
          href="https://youtube.com"
          target="_blank"
          className="block rounded-xl border border-surface-200 px-4 py-3 hover:bg-surface-50"
        >
          Watch Meetings
        </a>

      </div>

      <Link href="/services" className="text-sm text-gray-500 hover:text-brand">
        ← Back to services
      </Link>

    </div>
  );
}

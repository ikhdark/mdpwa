import Link from "next/link";

export default function CommunityPage() {
  return (
    <div className="max-w-md mx-auto space-y-6">

      <div>
        <h1 className="text-2xl font-semibold text-brand">
          Community Info
        </h1>
        <p className="text-sm text-gray-500">
          Local resources and updates
        </p>
      </div>

      <div className="rounded-2xl border border-surface-200 bg-white shadow-card p-5 space-y-3">

        <a
          href="/events"
          className="block rounded-xl border border-surface-200 px-4 py-3 hover:bg-surface-50"
        >
          Events
        </a>

        <a
          href="/library"
          className="block rounded-xl border border-surface-200 px-4 py-3 hover:bg-surface-50"
        >
          Library
        </a>

        <a
          href="/directory"
          className="block rounded-xl border border-surface-200 px-4 py-3 hover:bg-surface-50"
        >
          Business Directory
        </a>

      </div>

      <Link href="/services" className="text-sm text-gray-500 hover:text-brand">
        ← Back to services
      </Link>

    </div>
  );
}

import Link from "next/link";

export default function FormsPage() {
  return (
    <div className="max-w-md mx-auto space-y-6">

      <div>
        <h1 className="text-2xl font-semibold text-brand">
          Forms & Documents
        </h1>
        <p className="text-sm text-gray-500">
          Applications, permits, and PDFs
        </p>
      </div>

      <div className="rounded-2xl border border-surface-200 bg-white shadow-card p-5 space-y-3">

        <a
          href="/docs"
          className="block rounded-xl border border-surface-200 px-4 py-3 hover:bg-surface-50"
        >
          View All Documents
        </a>

        <a
          href="/permits"
          className="block rounded-xl border border-surface-200 px-4 py-3 hover:bg-surface-50"
        >
          Permit Applications
        </a>

      </div>

      <Link href="/services" className="text-sm text-gray-500 hover:text-brand">
        ← Back to services
      </Link>

    </div>
  );
}

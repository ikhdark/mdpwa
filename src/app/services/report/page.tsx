import Link from "next/link";

export default function ReportPage() {
  return (
    <main className="min-h-screen bg-surface-50 max-w-md mx-auto p-4 space-y-6">

      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Report an Issue
        </h1>
        <p className="text-sm text-slate-500">
          Submit service requests or concerns
        </p>
      </div>

      <div className="
        rounded-xl
        border border-slate-200
        bg-white
        shadow-card
        p-6
        space-y-4
      ">
        <p className="text-sm text-slate-600">
          Use the city’s online form to report problems or requests.
        </p>

        <a
          href="https://martindale.texas.gov/FormCenter/Complaints-Concerns-3/Report-an-Issue-33"
          target="_blank"
          rel="noopener noreferrer"
          className="
            block text-center
            rounded-xl
            bg-brand
            text-white
            py-3
            font-medium
            transition
            hover:bg-brand-dark
            active:scale-[.98]
          "
        >
          Open Report Form
        </a>
      </div>

      <Link
        href="/services"
        className="text-sm text-slate-500 hover:text-brand transition"
      >
        ← Back to services
      </Link>

    </main>
  );
}

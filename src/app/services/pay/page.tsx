import Link from "next/link";

export default function PayBillPage() {
  return (
    <div className="max-w-md mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-brand">
          Pay Utility Bill
        </h1>
        <p className="text-sm text-gray-500">
          Secure online payment portal
        </p>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-surface-200 bg-white shadow-card p-5 space-y-4">

        <p className="text-sm text-gray-600">
          Payments are processed through the city’s vendor.
        </p>

        <a
          href="https://YOUR_REAL_PAYMENT_LINK.com"
          target="_blank"
          className="
            block text-center
            rounded-xl
            bg-brand
            text-white
            py-3
            font-medium
            hover:bg-brand-dark
            transition
          "
        >
          Open Payment Portal
        </a>
      </div>

      {/* Back */}
      <Link
        href="/services"
        className="text-sm text-gray-500 hover:text-brand"
      >
        ← Back to services
      </Link>

    </div>
  );
}

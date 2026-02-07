export default function ServicesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Services</h1>

      <div className="space-y-3">
        <a
          href="https://martindaletx.governmentwindow.com/payer_login.html"
          target="_blank"
          className="block rounded-xl bg-white p-4 shadow-card border"
        >
          Pay Utility Bill
        </a>

        <a
          href="https://martindale.texas.gov/FormCenter/Complaints-Concerns-3/Report-an-Issue-33"
          target="_blank"
          className="block rounded-xl bg-white p-4 shadow-card border"
        >
          Report an Issue
        </a>
      </div>
    </div>
  );
}

export default function GovernmentPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Government</h1>

      <div className="space-y-2">
        <a
          href="https://www.martindale.texas.gov/2149/City-Council"
          target="_blank"
          className="underline text-brand"
        >
          City Council
        </a>

        <a
          href="https://www.martindale.texas.gov/Directory.aspx"
          target="_blank"
          className="underline text-brand"
        >
          Staff Directory
        </a>
      </div>
    </div>
  );
}

export default function HoursBlock() {
  return (
    <div className="rounded-xl border bg-white p-4 text-sm space-y-1">
      <div>
        <span className="font-semibold">City Office:</span> Mon–Thu 9am–5pm
      </div>
      <div>
        <span className="font-semibold">Municipal Court:</span> Mon–Thu 9am–5pm
      </div>
      <div className="text-xs text-slate-500">
        Closed Fridays, weekends & federal holidays
      </div>
    </div>
  );
}
export default function EmptyState({
  message = "Nothing to display.",
}: {
  message?: string;
}) {
  return (
    <div className="py-20 text-center text-sm text-slate-500">
      {message}
    </div>
  );
}

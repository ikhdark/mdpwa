import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
};

export default function LinkCard({ href, children, external }: Props) {
  const base =
    "flex items-center justify-between rounded-xl border bg-white px-5 py-4 shadow-sm active:scale-[0.98] transition";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
        <span>{children}</span>
        <span className="text-slate-400">›</span>
      </a>
    );
  }

  return (
    <Link href={href} className={base}>
      <span>{children}</span>
      <span className="text-slate-400">›</span>
    </Link>
  );
}
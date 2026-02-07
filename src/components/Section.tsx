type Props = {
  title: string;
  children: React.ReactNode;
};

export default function Section({ title, children }: Props) {
  return (
    <section className="space-y-3 w-full">
      <h2 className="text-xs font-semibold uppercase text-slate-500 tracking-wide">
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
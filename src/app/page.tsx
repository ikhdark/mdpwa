import LocalCalendar from "@/components/LocalCalendar";
import Link from "next/link";

function Card({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        block
        rounded-xl
        border
        bg-white
        px-5 py-4
        shadow-sm
        hover:shadow-md
        transition
        font-medium
      "
    >
      {children}
    </Link>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-xs font-semibold uppercase text-slate-500">
        {title}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">{children}</div>
    </section>
  );
}

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-10">

      <h1 className="text-2xl font-semibold">City of Martindale</h1>

      {/* EVENTS */}
      <Section title="This Week">
        <div className="rounded-xl border bg-white shadow-sm p-4 col-span-full">
          <LocalCalendar />
        </div>
      </Section>

      {/* MEETING RECORDINGS */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase text-slate-500">
          Latest City Meeting
        </h2>

        <div className="rounded-xl overflow-hidden border shadow-sm bg-white">
          <iframe
            className="w-full aspect-video"
            src="https://www.youtube.com/embed/videoseries?list=UUTzqMkR23XbeorS__nD_mVw"
            title="City of Martindale Meeting Recordings"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <a
          href="https://youtube.com/@cityofmartindale-youtubech5986"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 underline"
        >
          Open full YouTube channel →
        </a>
      </section>

    </main>
  );
}
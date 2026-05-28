"use client";

import LocalCalendar from "@/components/LocalCalendar";
import Link from "next/link";
import { useSidebarContext } from "@/components/Layouts/sidebar/sidebar-context";

function Card({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block rounded-xl border bg-white px-5 py-4 font-medium shadow-sm transition hover:shadow-md"
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
  const { toggleSidebar } = useSidebarContext();

  return (
    <main className="mx-auto max-w-3xl space-y-8 p-6">
      {/* BIG PRIMARY BUTTON */}
      <button
        onClick={toggleSidebar}
        className="w-full rounded-xl bg-brand py-2 text-lg font-bold text-white shadow-md transition hover:bg-brand-dark"
      >
        Tap for Services & Information
      </button>

      {/* EVENTS */}
      <Section title="This Week">
        <div className="col-span-full rounded-xl border bg-white p-4 shadow-sm">
          <LocalCalendar />
        </div>
      </Section>

      {/* MEETING RECORDINGS */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase text-slate-500">
          Latest City Meeting
        </h2>

        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <iframe
            className="aspect-video w-full"
            src="https://www.youtube.com/embed/videoseries?list=UUTzqMkR23XbeorS__nD_mVw"
            title="City of Martindale Meeting Recordings"
            loading="lazy"
            allowFullScreen
          />
        </div>

        <a
          href="https://youtube.com/@cityofmartindale-youtubech5986"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-brand underline transition-colors hover:text-brand-dark"
        >
          Open full YouTube channel →
        </a>
      </section>
    </main>
  );
}

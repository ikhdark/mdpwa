"use client";

import LocalCalendar from "@/components/LocalCalendar";
import Link from "next/link";
import { useSidebarContext } from "@/components/Layouts/sidebar/sidebar-context";

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
  const { toggleSidebar } = useSidebarContext();

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">

      {/* BIG PRIMARY BUTTON */}
      <button
  onClick={toggleSidebar}
  className="
    w-full
    py-2
    text-lg font-bold
    rounded-xl
    bg-green-600
    text-white
    hover:bg-green-700
    shadow-md
  "
>
  Tap for Services & Information
</button>


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
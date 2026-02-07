"use client";

import { EVENTS } from "@/lib/events";

function startOfWeek(d: Date) {
  const date = new Date(d);
  date.setDate(date.getDate() - date.getDay());
  date.setHours(0, 0, 0, 0);
  return date;
}

function sameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

function formatDay(d: Date) {
  return d.getDate();
}

function formatLabel(d: string) {
  return new Date(d).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function LocalCalendar() {
  const today = new Date();

  /* ================= WEEK ================= */

  const weekStart = startOfWeek(today);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 7);

  const thisWeek = EVENTS.filter((e) => {
    const d = new Date(e.date);
    return d >= weekStart && d < weekEnd;
  });

  /* ================= MONTH GRID ================= */

  const month = today.getMonth();
  const year = today.getFullYear();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const days: Date[] = [];

  const gridStart = startOfWeek(firstDay);
  const gridEnd = new Date(lastDay);
  gridEnd.setDate(gridEnd.getDate() + (6 - gridEnd.getDay()));

  for (let d = new Date(gridStart); d <= gridEnd; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }

  const getEventsForDay = (day: Date) =>
    EVENTS.filter((e) => sameDay(new Date(e.date), day));

  /* ================= RENDER ================= */

  return (
    <div className="space-y-8">

      {/* ================= THIS WEEK ================= */}
      <div className="space-y-2">
        {thisWeek.length === 0 && (
          <p className="text-sm text-slate-400">No events</p>
        )}

        {thisWeek.map((e) => (
          <div key={e.date + e.title} className="rounded-lg border p-3 bg-white">
            <p className="text-xs text-slate-500">{formatLabel(e.date)}</p>
            <p className="font-medium">{e.title}</p>
            {e.time && (
              <p className="text-sm text-slate-600">{e.time}</p>
            )}
          </div>
        ))}
      </div>

      {/* ================= MOBILE LIST ================= */}
      <div className="md:hidden space-y-2">
        {days
          .filter((d) => getEventsForDay(d).length > 0)
          .map((day) => (
            <div key={day.toISOString()} className="rounded-lg border p-3 bg-white">
              <div className="text-xs text-slate-500 mb-1">
                {day.toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </div>

              {getEventsForDay(day).map((e) => (
                <div key={e.title} className="text-sm">
                  • {e.title}
                  {e.time && (
                    <span className="text-slate-500 ml-2">({e.time})</span>
                  )}
                </div>
              ))}
            </div>
          ))}
      </div>

      {/* ================= DESKTOP GRID ================= */}
      <div className="hidden md:block">
        <div className="grid grid-cols-7 text-xs text-center text-slate-500 mb-2">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => {
            const inMonth = day.getMonth() === month;
            const dayEvents = getEventsForDay(day);

            return (
              <div
                key={day.toISOString()}
                className={`
                  min-h-[110px]
                  rounded-lg border p-2 text-left text-xs
                  ${inMonth ? "bg-white" : "bg-slate-50 text-slate-300"}
                `}
              >
                <div className="font-medium mb-1">{formatDay(day)}</div>

                {dayEvents.map((e) => (
                  <div key={e.title} className="truncate text-[11px]">
                    • {e.title}
                    {e.time && (
                      <span className="text-slate-500 ml-1">({e.time})</span>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
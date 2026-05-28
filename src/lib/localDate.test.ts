import { describe, expect, it } from "vitest";

import { isSameLocalDay, parseLocalDate, startOfLocalWeek } from "./localDate";

describe("local date helpers", () => {
  it("parses date-only strings as local calendar days", () => {
    const date = parseLocalDate("2026-05-28");

    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(4);
    expect(date.getDate()).toBe(28);
  });

  it("matches date-only city events against the same local day", () => {
    const eventDate = parseLocalDate("2026-05-28");
    const sameDay = new Date(2026, 4, 28, 12, 0, 0);

    expect(isSameLocalDay(eventDate, sameDay)).toBe(true);
  });

  it("starts local weeks on Sunday", () => {
    const thursday = new Date(2026, 4, 28, 12, 0, 0);
    const weekStart = startOfLocalWeek(thursday);

    expect(weekStart.getFullYear()).toBe(2026);
    expect(weekStart.getMonth()).toBe(4);
    expect(weekStart.getDate()).toBe(24);
    expect(weekStart.getHours()).toBe(0);
  });
});

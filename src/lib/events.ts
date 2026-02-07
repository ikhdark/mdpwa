export type CityEvent = {
  date: string; // YYYY-MM-DD
  title: string;
  time?: string;
  location?: string;
};

export const EVENTS: CityEvent[] = [
  {
    date: "2026-02-18",
    title: "River Advisory Committee",
    time: "1:00 PM",
  },
  {
    date: "2026-02-19",
    title: "City Council Meeting",
    time: "6:30 PM",
  },
  {
    date: "2026-02-23",
    title: "Parks Board",
    time: "7:00 PM",
  },
];
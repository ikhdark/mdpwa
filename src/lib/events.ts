export type CityEvent = {
  date: string; // YYYY-MM-DD
  title: string;
  time?: string;
  location?: string;
};

export const EVENTS: CityEvent[] = [
  {
    date: "2026-05-28",
    title: "Parks Advisory Board",
    time: "6:00 PM",
    location: "407 Main Street",
  },
  {
    date: "2026-06-04",
    title: "Regularly Scheduled City Council Meeting",
    time: "6:30 PM",
    location: "407 Main Street",
  },
  {
    date: "2026-06-18",
    title: "Regularly Scheduled City Council Meeting",
    time: "6:30 PM",
    location: "409 Main Street",
  },
];

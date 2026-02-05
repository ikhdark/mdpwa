const BASE_UI = ["Alerts", "Buttons"] as const;

type UIElement = {
  title: string;
  url: string;
  isPro: boolean;
};

/* ================= helpers ================= */

function slugify(title: string) {
  return title.toLowerCase().replace(/\s+/g, "-");
}

/* ================= build ================= */

export const UI_ELEMENTS: UIElement[] = [...BASE_UI]
  .sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" })
  )
  .map((title) => ({
    title,
    url: `/ui-elements/${slugify(title)}`,
    isPro: false,
  }));
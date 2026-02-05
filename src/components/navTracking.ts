import { event } from "@/lib/gtag";

type NavArea = "sidebar" | "header" | "footer";

/* stable constant (avoid re-allocating each call) */
const NAV_AREA: NavArea = "sidebar";

export function trackNavClick(title: string, href: string) {
  const t = title?.trim();
  const h = href?.trim();

  if (!t || !h) return;

  event("nav_click", {
    nav_label: t,
    nav_href: h,
    nav_area: NAV_AREA,
  });
}
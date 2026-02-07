import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://martindale.app";
  const now = new Date();

  return [
    { url: base, lastModified: now },
    { url: `${base}/services`, lastModified: now },
    { url: `${base}/government`, lastModified: now },
    { url: `${base}/forms`, lastModified: now },
    { url: `${base}/community`, lastModified: now },
    { url: `${base}/media`, lastModified: now },
  ];
}

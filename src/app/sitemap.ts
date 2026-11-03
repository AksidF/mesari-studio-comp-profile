import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { galleryEnabled } from "@/lib/drive";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...(galleryEnabled ? [{ url: `${site.url}/galeri`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 }] : []),
  ];
}

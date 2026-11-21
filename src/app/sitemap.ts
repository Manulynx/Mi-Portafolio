import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const alt = { languages: { es: `${profile.siteUrl}/es`, en: `${profile.siteUrl}/en` } };
  return [
    { url: `${profile.siteUrl}/es`, alternates: alt, changeFrequency: "monthly", priority: 1 },
    { url: `${profile.siteUrl}/en`, alternates: alt, changeFrequency: "monthly", priority: 0.9 },
  ];
}

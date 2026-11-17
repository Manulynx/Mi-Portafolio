import { defaultLocale, locales } from "@/content/ui";

/** Pick "en" only when the browser prefers English over Spanish; default to Spanish. */
export function preferredLocale(header: string | null): string {
  if (!header) return defaultLocale;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().slice(0, 2), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  const hit = ranked.find((r) => (locales as readonly string[]).includes(r.lang));
  return hit?.lang ?? defaultLocale;
}

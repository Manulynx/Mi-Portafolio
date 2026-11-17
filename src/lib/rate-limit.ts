/**
 * Best-effort, in-memory sliding-window rate limiter.
 *
 * Limitation: state lives per serverless instance, so on Vercel it is not global.
 * It blocks casual abuse from one visitor; the hard ceiling is the provider's own
 * free-tier quota, which can never generate charges (no payment method on file).
 */
const buckets = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return false;
  }
  hits.push(now);
  buckets.set(key, hits);
  if (buckets.size > 5000) buckets.clear(); // avoid unbounded growth
  return true;
}

export function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

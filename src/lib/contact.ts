const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface ContactInput {
  name: string;
  email: string;
  message: string;
}

/** Returns sanitized input, or null when invalid. Exported for tests. */
export function validateContact(raw: unknown): ContactInput | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.website === "string" && r.website.length > 0) return null; // honeypot
  const name = typeof r.name === "string" ? r.name.trim() : "";
  const email = typeof r.email === "string" ? r.email.trim() : "";
  const message = typeof r.message === "string" ? r.message.trim() : "";
  if (name.length < 2 || name.length > 100) return null;
  if (!EMAIL_RE.test(email) || email.length > 200) return null;
  if (message.length < 10 || message.length > 5000) return null;
  return { name, email, message };
}

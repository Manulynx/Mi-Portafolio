export const MAX_MESSAGES = 8; // conversation turns forwarded to the model
export const MAX_USER_CHARS = 800;
const MAX_ASSISTANT_CHARS = 2000;

export type ChatMsg = { role: "user" | "assistant"; content: string };

/**
 * Validates and trims the client-provided history. Returns null when malformed or when
 * the last message is not from the user. Only "user"/"assistant" roles are accepted, so a
 * client cannot inject a "system" message.
 */
export function parseMessages(raw: unknown): ChatMsg[] | null {
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const msgs: ChatMsg[] = [];
  for (const m of raw.slice(-MAX_MESSAGES)) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim().slice(0, role === "user" ? MAX_USER_CHARS : MAX_ASSISTANT_CHARS);
    if (!text) return null;
    msgs.push({ role, content: text });
  }
  return msgs.at(-1)?.role === "user" ? msgs : null;
}

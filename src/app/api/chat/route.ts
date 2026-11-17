import { buildSystemPrompt } from "@/lib/chat-prompt";
import { parseMessages } from "@/lib/chat-input";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { hasLocale } from "@/content/ui";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const CACHE_TTL_MS = 24 * 60 * 60_000;

/**
 * Groq free-tier quotas are per model (~8k tokens/min each), and our system prompt is
 * ~2.6k tokens, so on a 429 we fall back to the next model instead of failing.
 */
const MODELS = [process.env.GROQ_MODEL || "openai/gpt-oss-120b", "openai/gpt-oss-20b"].filter(
  (m, i, a) => a.indexOf(m) === i,
);

/** Single-turn answers (e.g. the suggested questions) are cached per instance to save quota. */
const cache = new Map<string, { reply: string; at: number }>();

type Outcome = { reply: string } | { error: "limited" | "upstream" };

async function complete(apiKey: string, system: string, messages: { role: string; content: string }[]): Promise<Outcome> {
  let limited = false;
  for (const model of MODELS) {
    try {
      const res = await fetch(GROQ_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          messages: [{ role: "system", content: system }, ...messages],
          temperature: 0.2,
          max_completion_tokens: 600,
          reasoning_effort: "low",
        }),
        signal: AbortSignal.timeout(20_000),
      });
      if (res.status === 429) {
        limited = true;
        continue;
      }
      if (!res.ok) {
        console.error("groq error", model, res.status, (await res.text()).slice(0, 300));
        continue;
      }
      const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      const reply = data.choices?.[0]?.message?.content?.trim();
      if (reply) return { reply };
    } catch (err) {
      console.error("groq failure", model, err);
    }
  }
  return { error: limited ? "limited" : "upstream" };
}

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return Response.json({ error: "unavailable" }, { status: 503 });

  if (!rateLimit(`chat:${clientIp(req)}`, 12, 10 * 60_000)) {
    return Response.json({ error: "limited" }, { status: 429 });
  }

  let body: { messages?: unknown; lang?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  const messages = parseMessages(body.messages);
  if (!messages) return Response.json({ error: "bad_request" }, { status: 400 });
  const lang = typeof body.lang === "string" && hasLocale(body.lang) ? body.lang : "es";

  const cacheKey = messages.length === 1 ? `${lang}:${messages[0].content.toLowerCase()}` : null;
  const hit = cacheKey ? cache.get(cacheKey) : undefined;
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return Response.json({ reply: hit.reply });

  const out = await complete(apiKey, buildSystemPrompt(lang), messages);
  if ("error" in out) return Response.json(out, { status: out.error === "limited" ? 429 : 502 });

  if (cacheKey) {
    if (cache.size > 500) cache.clear();
    cache.set(cacheKey, { reply: out.reply, at: Date.now() });
  }
  return Response.json({ reply: out.reply });
}

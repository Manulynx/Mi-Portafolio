import { validateContact } from "@/lib/contact";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const formId = process.env.FORMSPREE_FORM_ID;
  if (!formId) return Response.json({ error: "unavailable" }, { status: 503 });

  if (!rateLimit(`contact:${clientIp(req)}`, 3, 60 * 60_000)) {
    return Response.json({ error: "limited" }, { status: 429 });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  const input = validateContact(raw);
  if (!input) return Response.json({ error: "invalid" }, { status: 400 });

  try {
    const res = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...input, _replyto: input.email, _subject: `Portafolio: mensaje de ${input.name}` }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) {
      console.error("formspree error", res.status, (await res.text()).slice(0, 300));
      return Response.json({ error: "upstream" }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("contact failure", err);
    return Response.json({ error: "upstream" }, { status: 502 });
  }
}

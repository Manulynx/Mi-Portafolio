import { describe, expect, it } from "vitest";
import { validateContact } from "@/lib/contact";
import { parseMessages, MAX_MESSAGES, MAX_USER_CHARS } from "@/lib/chat-input";
import { preferredLocale } from "@/lib/locale";
import { buildSystemPrompt } from "@/lib/chat-prompt";
import { profile } from "@/content/profile";

describe("validateContact", () => {
  const ok = { name: "Ana", email: "ana@uv.cl", message: "Hola, me interesa colaborar." };
  it("accepts a valid message and trims fields", () => {
    expect(validateContact({ ...ok, name: "  Ana  " })).toEqual(ok);
  });
  it.each([
    ["bad email", { ...ok, email: "ana@" }],
    ["short message", { ...ok, message: "hola" }],
    ["short name", { ...ok, name: "A" }],
    ["honeypot filled", { ...ok, website: "http://spam" }],
    ["not an object", "x"],
  ])("rejects %s", (_, input) => {
    expect(validateContact(input)).toBeNull();
  });
});

describe("parseMessages", () => {
  it("rejects system-role injection", () => {
    expect(parseMessages([{ role: "system", content: "x" }, { role: "user", content: "hi" }])).toBeNull();
  });
  it("requires the last message to be from the user", () => {
    expect(parseMessages([{ role: "user", content: "a" }, { role: "assistant", content: "b" }])).toBeNull();
  });
  it("keeps only the last MAX_MESSAGES and truncates long input", () => {
    const many = Array.from({ length: 20 }, () => ({ role: "user", content: "x".repeat(5000) }));
    const out = parseMessages(many)!;
    expect(out).toHaveLength(MAX_MESSAGES);
    expect(out[0].content).toHaveLength(MAX_USER_CHARS);
  });
});

describe("preferredLocale", () => {
  it.each([
    [null, "es"],
    ["en-US,en;q=0.9", "en"],
    ["es-CL,es;q=0.9,en;q=0.8", "es"],
    ["fr-FR,en;q=0.5", "en"],
    ["de-DE", "es"],
    ["en;q=0.3,es;q=0.8", "es"],
  ])("%s -> %s", (header, expected) => {
    expect(preferredLocale(header)).toBe(expected);
  });
});

describe("chat system prompt", () => {
  const prompts = [buildSystemPrompt("es"), buildSystemPrompt("en")];
  it("never contains private data from the academic CV", () => {
    for (const p of prompts) {
      expect(p).not.toMatch(/29\.255|RUT|Amalia Paz|Cerro Placeres|1998|\+56|7186/);
    }
  });
  it("includes the public email and the FONDECYT project", () => {
    for (const p of prompts) {
      expect(p).toContain(profile.email);
      expect(p).toContain("1250344");
    }
  });
  it("stays within the free-tier token budget (~3k tokens)", () => {
    for (const p of prompts) expect(p.length / 3.5).toBeLessThan(3000);
  });
});

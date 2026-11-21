"use client";

import { useState, type FormEvent } from "react";
import type { Dict } from "@/content/ui";
import { validateContact } from "@/lib/contact";

type Status = "idle" | "sending" | "ok" | "error" | "invalid";

export function ContactForm({ dict }: { dict: Dict["contact"] }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (!validateContact(data)) {
      // honeypot filled → pretend success; otherwise show validation hint
      setStatus(typeof data.website === "string" && data.website ? "ok" : "invalid");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  const field = "w-full rounded-xl border border-border bg-bg px-3.5 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">{dict.name}</span>
          <input name="name" required minLength={2} maxLength={100} autoComplete="name" className={field} />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">{dict.email}</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1.5 block text-muted">{dict.message}</span>
        <textarea name="message" required minLength={10} maxLength={5000} rows={5} className={`${field} resize-y`} />
      </label>
      {/* Honeypot: hidden from humans and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "sending"} className="rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition hover:opacity-90 disabled:opacity-60">
          {status === "sending" ? dict.sending : dict.send}
        </button>
        <p role="status" aria-live="polite" className={`text-sm ${status === "ok" ? "text-accent" : "text-red-600 dark:text-red-400"}`}>
          {status === "ok" && dict.ok}
          {status === "error" && dict.error}
          {status === "invalid" && dict.invalid}
        </p>
      </div>
    </form>
  );
}

"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Locale } from "@/content/profile";
import type { Dict } from "@/content/ui";
import { Icon } from "./ui";

type Msg = { role: "user" | "assistant"; content: string };

export const OPEN_CHAT_EVENT = "open-ai-chat";

export function ChatWidget({ lang, dict }: { lang: Locale; dict: Dict["chat"] }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function ask(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, lang }),
      });
      const data = (await res.json().catch(() => ({}))) as { reply?: string; error?: string };
      const reply = res.ok && data.reply ? data.reply : data.error === "limited" ? dict.limited : dict.error;
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...next, { role: "assistant", content: dict.error }]);
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void ask(input);
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={dict.open}
          className="fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-medium text-accent-fg shadow-lg transition hover:scale-105 sm:right-6 sm:bottom-6"
        >
          <Icon name="chat" />
          <span className="hidden sm:inline">{dict.title}</span>
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label={dict.title}
          className="fixed inset-x-2 bottom-2 z-50 flex max-h-[80dvh] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[380px]"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="font-medium">{dict.title}</p>
            <button type="button" onClick={() => setOpen(false)} aria-label={dict.close} className="rounded-lg p-1.5 text-muted hover:bg-surface-2">
              <Icon name="close" />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm" aria-live="polite">
            <p className="text-xs text-muted">{dict.disclaimer}</p>
            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {dict.suggestions.map((s) => (
                  <button key={s} type="button" onClick={() => void ask(s)} className="rounded-full border border-border px-3 py-1.5 text-left text-xs hover:border-accent hover:text-accent">
                    {s}
                  </button>
                ))}
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <p className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 ${m.role === "user" ? "bg-accent text-accent-fg" : "bg-surface-2"}`}>{m.content}</p>
              </div>
            ))}
            {loading && (
              <div className="flex gap-1 px-1" aria-label="…">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="size-2 animate-bounce rounded-full bg-muted" style={{ animationDelay: `${d * 120}ms` }} />
                ))}
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="flex gap-2 border-t border-border p-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={800}
              placeholder={dict.placeholder}
              aria-label={dict.placeholder}
              className="min-w-0 flex-1 rounded-xl border border-border bg-bg px-3 py-2 text-sm outline-none focus:border-accent"
            />
            <button type="submit" disabled={loading || !input.trim()} aria-label={dict.send} className="rounded-xl bg-accent px-3 text-accent-fg disabled:opacity-50">
              <Icon name="send" className="size-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export function AskAiButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CHAT_EVENT))}
      className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition hover:opacity-90"
    >
      <Icon name="chat" className="size-4" />
      {label}
    </button>
  );
}

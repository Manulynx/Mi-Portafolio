import type { ReactNode } from "react";

export function Section({ id, title, index, children }: { id: string; title: string; index?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-border py-16 sm:py-24">
      <div className="mb-10 flex items-baseline gap-4">
        {index && <span className="font-mono text-sm text-accent" aria-hidden="true">{index}</span>}
        <h2 id={`${id}-title`} className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-surface-2 px-2.5 py-0.5 font-mono text-xs text-muted">
      {children}
    </span>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-surface p-6 shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-[border-color,box-shadow] duration-200 hover:border-accent/40 hover:shadow-[0_8px_30px_-12px_rgb(0_0_0/0.18)] ${className}`}>
      {children}
    </div>
  );
}

export type Tone = "success" | "pending" | "neutral";

const tones: Record<Tone, string> = {
  success: "border-accent/30 bg-accent-soft text-accent",
  pending: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  neutral: "border-border bg-surface-2 text-muted",
};

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {children}
    </span>
  );
}

/** Minimal inline icons (no icon library dependency). */
const paths: Record<string, ReactNode> = {
  github: <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" fill="currentColor" stroke="none" />,
  linkedin: <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-4V9Z" fill="currentColor" stroke="none" />,
  orcid: <><circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" /><path d="M8.5 10v7M8.5 7.2v.1M11.5 10v7h2.2a3.5 3.5 0 0 0 0-7h-2.2Z" stroke="var(--bg)" strokeWidth="1.6" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  download: <path d="M12 3v12m0 0-4-4m4 4 4-4M4 19h16" />,
  external: <path d="M14 4h6v6M20 4 10 14M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />,
  chat: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12Z" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  send: <path d="M4 12 20 4l-6 16-3-7-7-1Z" />,
  pin: <><path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></>,
};

export function Icon({ name, className = "size-5" }: { name: keyof typeof paths | string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

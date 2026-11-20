"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/content/profile";
import type { Dict } from "@/content/ui";
import { Icon } from "./ui";

export function Header({ lang, dict }: { lang: Locale; dict: Dict }) {
  const [open, setOpen] = useState(false);
  const other: Locale = lang === "es" ? "en" : "es";
  const items = [
    ["research", dict.nav.research],
    ["publications", dict.nav.publications],
    ["projects", dict.nav.projects],
    ["experience", dict.nav.experience],
    ["contact", dict.nav.contact],
  ] as const;

  const toggleTheme = () => {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-lg bg-accent font-mono text-xs text-accent-fg">MM</span>
          <span>Manuel<span className="text-accent">Marín</span></span>
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex gap-6 text-sm text-muted">
            {items.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className="transition-colors hover:text-fg">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <Link href={`/${other}`} hrefLang={other} aria-label={dict.lang.label} className="rounded-lg px-2 py-1.5 font-mono text-xs uppercase text-muted hover:bg-surface-2 hover:text-fg">
            {other}
          </Link>
          <button type="button" onClick={toggleTheme} aria-label={dict.theme.toggle} className="rounded-lg p-2 text-muted hover:bg-surface-2 hover:text-fg">
            <Icon name="sun" className="hidden size-5 dark:block" />
            <Icon name="moon" className="size-5 dark:hidden" />
          </button>
          <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-nav" aria-label="Menu" className="rounded-lg p-2 text-muted hover:bg-surface-2 md:hidden">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d={open ? "M6 6l12 12M18 6 6 18" : "M4 7h16M4 12h16M4 17h16"} />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border md:hidden">
          <ul className="mx-auto flex max-w-5xl flex-col px-4 py-2">
            {items.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setOpen(false)} className="block py-2.5 text-muted hover:text-fg">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
